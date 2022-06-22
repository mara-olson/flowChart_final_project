from flask import Flask, render_template,json, jsonify, request, flash, session, redirect;

from sqlalchemy.sql import func

from model import connect_to_db, db, User, StravaUser, StravaActivity, ActivityLog, MenseLog, SleepLog;

import datetime;
import requests
import os
from jinja2 import StrictUndefined


app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route("/exchange_token")
def authorize():
    """Authorizing user."""
    code = request.args.get("code")
    scope = request.args.get("scope")

    if "activity:read_all" not in scope:
        error = "Wrong access" 
        success = False
    else: 
        error = None
        success = True
    
    response = requests.post(url="https://www.strava.com/oauth/token", 
        data={
            "client_id": "80271",
            "client_secret": "4f11f3b1b0190187e7b51ca4a1e8a5ab4b5519c6", "code": code,
            "grant_type": "authorization_code"
        })

    strava_token = response.json()
    with open("strava_token.json", "w") as file:
        json.dump(strava_token, file)

    session["refresh_token"] = strava_token['refresh_token']

    session["access_token"] = strava_token['access_token']



    user_id = session["user_id"]

    # print(session["access_token"])
    return redirect(f"/home")
    # return redirect("/")
    # return jsonify({'error':error, 'success': success})


# @app.route("/api/strava-activities")
# def get_strava_activities():
#     """Retrieve strava activities from API to display on user's activities page."""
    
#     url = "https://www.strava.com/api/v3/athlete/activities"

#     access_token = session["access_token"]
#     # print(access_token)
    
#     headers = {
#         "Authorization": f"Bearer {access_token}"
#     }

#     page = str(1)

#     r = requests.get(f"{url}?before=1653447977&after=959223977&page={page}&per_page=20", headers=headers)

#     # for activity in r.json():

    
#     return jsonify(r.json())

# session["access_token"] and put in "headers"
# before and after epochs in params
# I can either store the activities I get in my database, or simply send to the frontend

@app.route("/")
def landing_page():
    """View homepage."""
    
    return render_template("index.html", error=None)


@app.route('/<path>')
def route(path):

    return render_template('index.html')


@app.route('/<path>/<code>')
def nested_route(path, code):

    return render_template('index.html')


@app.route("/login")
def login():
    """Display login page."""

    return render_template("index.html", error=None)


@app.route("/api/login", methods=['POST'])
def login_process():
    """Process the user's login."""

    email = request.json.get("email")
    password = request.json.get("password")
    user = User.get_user_by_email(email)

    if not user:
        error = f"We could not find an account for {email}. Please sign up!"

        return jsonify({"success": False, "error": error})

    elif password != user.password:
        error = "The password you entered is incorrect. Please re-enter."
        # return redirect("/login")
        return jsonify({"success": False, "error": error})

    else:
        session["user_id"] = user.user_id
        return jsonify({"success": True, "user_id":user.user_id, "email":user.email, "password": user.password, "error": None})
    
    


@app.route("/sign-up")
def sign_up():
    """Display registration page & create user with entered credentials."""

    return render_template("index.html")


@app.route("/api/sign-up", methods=['POST'])
def save_new_user():
    """Display registration page & create user with entered credentials."""
    data = request.json
    new_fname = data.get("first_name")
    new_lname = data.get("last_name")
    new_team = data.get("team_name")
    new_email = data.get("email")
    new_bio = data.get("bio")
    new_password = data.get("password")
    created_at = datetime.datetime.now()

    all_users = [x.email for x in db.session.query(User.email).distinct()]

    if new_email not in all_users and "@" in new_email: 
        new_user = User.create_user(new_fname, new_lname, new_team, new_email, new_password, new_bio, created_at)

        session["user_id"] = new_user.user_id

        return jsonify({"success": True,"user_id":new_user.user_id, "first_name": new_user.first_name, "last_name": new_user.last_name, "team_name": new_user.team_name, "email": new_user.email, "password": new_user.password, "bio": new_user.bio, "created_at": new_user.created_at, "error_msg": None})
    
    elif "@" not in new_email:
        error = "Please enter a valid email."
        return jsonify({"success": False, "error_msg": error})

    elif new_email in all_users:
        error = "We found an existing account, please log in."
        return jsonify({"success": False, "error_msg": error})
        
    else:
        error = "Please complete all required fields."
        return jsonify({"success": False, "error_msg": error})



    
    
@app.route('/api/<user_id>/activities')
def activity_data(user_id):
    """All activities."""
    user_id = session["user_id"]

    def get_strava_activity_data():
        url = "https://www.strava.com/api/v3/athlete/activities"

        access_token = session["access_token"]
        # print(access_token)

        headers = {
            "Authorization": f"Bearer {access_token}"
        }

        page = str(1)

        r = requests.get(f"{url}?before=1653447977&after=959223977&page={page}&per_page=20", headers=headers)
        
        return r.json()

    strava_activities = get_strava_activity_data()
    
    def km_to_miles(kilometers):
        return round((kilometers * 0.000621371), 2)

    def sec_to_min(seconds):
        return (seconds/60)

    activity_objs = []

    for activity in strava_activities:
        new_strava_act = {
            "id": activity["id"],
            "activity_name": activity["name"], 
            "activity_date": activity["start_date_local"][:10], 
            "duration": sec_to_min(activity["moving_time"]), 
            "distance": km_to_miles(activity["distance"]), 
            "activity_type": activity["type"], 
            "suffer_score": None, 
            "activity_notes": activity["location_city"], 
            "created_at": datetime.datetime.now()}
        
        strava_add_to_db = ActivityLog.create_activity(user_id, new_strava_act["activity_date"], new_strava_act["activity_type"], new_strava_act["activity_name"], new_strava_act["duration"], new_strava_act["distance"], new_strava_act["suffer_score"], new_strava_act["activity_notes"], new_strava_act["created_at"])
        

    all_activities = ActivityLog.query.filter(ActivityLog.user_id == user_id).all()

    
    currentTime= datetime.datetime.now()

    mileage_this_month = db.session.query(func.round(func.sum(ActivityLog.distance))).filter(ActivityLog.activity_date > (currentTime - datetime.timedelta(30))).one()[0]

    # print("*"*20, type(mileage_this_month))    

    for activity in all_activities:
        new_act = {
            "user_id": activity.user_id, "activity_id": activity.activity_id, "name": activity.activity_name, "type": activity.workout_type, "date": activity.activity_date.strftime("%Y-%m-%d"),
            "distance": activity.distance, "duration": activity.duration, "suffer_score": activity.suffer_score, "notes": activity.activity_notes
            }
        # activity = activity.to_dict()
        activity_objs.append(new_act)
        
    activity_objs.sort(key=lambda x: datetime.datetime.strptime(x['date'], "%Y-%m-%d"))


    return jsonify({"activities": activity_objs, "monthlyMileage": mileage_this_month})


@app.route("/<user_id>/home")
def user_homepage(user_id):
    """Display user's homepage after logging in."""
    user_id = session["user_id"]
    user = User.get_user_by_id(user_id)

    fname = user.first_name
    lname = user.last_name
    
    all_activities = ActivityLog.query.filter(ActivityLog.user_id == user_id).all()

    activities = []

    for activity in all_activities:
        activity = activity.to_dict()
        # for i in range(len(all_activities)):
        #     activities[i] = activity
        activities.append(activity)

    return jsonify({'activities': activities})
   



@app.route("/api/profile")
def profile():
    """User profile page."""
    user_id = session["user_id"]
    user = User.get_user_by_id(user_id)
    # dt = user.created_at
    # trunc_date = datetime.date( dt.day, dt.month, dt.year)

    return jsonify({"success":True, "first_name": user.first_name, "last_name": user.last_name, "team_name": user.team_name, "email": user.email, "password": user.password, "bio": user.bio, "member_since": user.created_at.strftime("%b %d, %Y")})


@app.route("/api/profile", methods=["PUT"])
def update_profile():
    """Update user info based on profile card edit."""
    user_id = session["user_id"]

    data = request.json

    first_name = data.get("first_name")
    last_name = data.get("last_name")
    team_name = data.get("team_name")
    email = data.get("email")
    password = data.get("password")
    bio = data.get("bio")


    user = User.get_user_by_id(user_id)
    
    user.first_name = first_name
    user.last_name = last_name
    user.team_name = team_name
    user.email = email
    user.password = password
    user.bio = bio

    db.session.commit()
    print("***********THIS IS THE BIO"*3, user.bio)

    return jsonify({"success":True, "first_name": user.first_name, "last_name": user.last_name, "team_name": user.team_name, "email": user.email, "password": user.password, "bio": user.bio})


@app.route("/api/<user_id>/activities/<activity_id>", methods=["DELETE"])
def delete_user_activity(user_id, activity_id):
    """Delete activity."""
    user_id = session["user_id"]
    
    data = request.json

    activity_id = data.get("activity_id")

    print("*"*40, data.get("activity_id"))
    
    ActivityLog.delete_activity(activity_id)

    print(f"Activity {activity_id} deleted")

    response = "deleted"
    return response 






@app.route("/api/<user_id>/activities/<activity_id>")
def get_selected_activity(user_id, activity_id):
    """Retrieve an existing activity."""

    user_id = session["user_id"]

    activity = ActivityLog.get_activity_by_id(activity_id)

    return jsonify({
        "success": True, 
        "error": None, 
        "activityId": activity.activity_id,        
        "activityName": activity.activity_name,
        "activityDate": activity.activity_date.strftime("%Y-%m-%d"),
        "activityType": activity.workout_type,
        "duration": activity.duration,
        "distance": activity.distance,
        "sufferScore": activity.suffer_score,
        "activityNotes": activity.activity_notes
        })


@app.route("/api/<user_id>/activities/<activity_id>", methods=["PUT"])
def update_activity(user_id, activity_id):
    """Update an existing activity."""
    data = request.json

    user_id = session["user_id"]

    edited_act_id = data.get("activity_id")
    
    edited_act_date = data.get("activity_date")
    edited_act_type = data.get("activity_type")
    edited_act_name = data.get("activity_name")
    edited_act_duration = data.get("duration")
    edited_act_distance = data.get("distance")
    edited_act_suffer_score = data.get("suffer_score")
    edited_act_notes = data.get("activity_notes")

    currentTime= datetime.datetime.now()

    edited_activity = ActivityLog.get_activity_by_id(edited_act_id)

    edited_activity.user_id = user_id
    edited_activity.activity_date = edited_act_date
    edited_activity.workout_type = edited_act_type
    edited_activity.activity_name = edited_act_name
    edited_activity.duration = edited_act_duration
    edited_activity.distance = edited_act_distance
    edited_activity.suffer_score = edited_act_suffer_score
    edited_activity.activity_notes = edited_act_notes

    db.session.commit()

    print(edited_activity)

    all_activities = ActivityLog.query.filter(ActivityLog.user_id == user_id).all()

    # print("*"*20, type(mileage_this_month))    
    activity_objs = []
    for activity in all_activities:
        new_act = {
            "user_id": activity.user_id, "activity_id": activity.activity_id, "name": activity.activity_name, "type": activity.workout_type, "date": activity.activity_date.strftime("%Y-%m-%d"),
            "distance": activity.distance, "duration": activity.duration, "suffer_score": activity.suffer_score, "notes": activity.activity_notes
            }
        # activity = activity.to_dict()
        activity_objs.append(new_act)
    activity_objs.sort(key=lambda x: datetime.datetime.strptime(x['date'], "%Y-%m-%d"))
    print("*"*25, edited_activity.workout_type, edited_activity.activity_notes)
    
    return jsonify({
        "success": True, 
        "error": None, 
        "activities": activity_objs,
        "activityId": edited_activity.activity_id,        
        "activityName": edited_activity.activity_name,
        "activityDate": edited_activity.activity_date.strftime("%Y-%m-%d"),
        "activityType": edited_activity.workout_type,
        "duration": edited_activity.duration,
        "distance": edited_activity.distance,
        "sufferScore": edited_activity.suffer_score,
        "activityNotes": edited_activity.activity_notes
        })


@app.route("/api/<user_id>/activities", methods=["POST"])
def add_activity(user_id):
    """Add a new activity."""
    data = request.json

    user_id = session["user_id"]

    new_act_date = data.get("activity_date")
    new_act_type = data.get("activity_type")
    new_act_name = data.get("activity_name")
    new_act_duration = data.get("duration")
    new_act_distance = data.get("distance")
    new_act_suffer_score = data.get("suffer_score")
    new_act_notes = data.get("activity_notes")
    created_at = datetime.datetime.now()

    currentTime= datetime.datetime.now()
    
    if (new_act_date is None) or (new_act_name is None) or (new_act_type == "Null"):
        error = "Please enter an activity date, type, & name"
        success = False
        
        return jsonify({"success": success, "error": error})
        

    elif datetime.datetime.strptime(new_act_date, "%Y-%m-%d") > currentTime:
        error = "The date you entered is in the future. Please enter a valid activity date."
        success = False
        
        return jsonify({"success": success, "error": error})

    else:
        error = None
        success = True

        new_activity = ActivityLog.create_activity(user_id, new_act_date, new_act_type, new_act_name, new_act_duration, new_act_distance, new_act_suffer_score, new_act_notes, created_at)

        new_activity.activity_date = new_activity.activity_date.strftime("%Y-%m-%d")

        return jsonify({
            "success": success, 
            "error": error, 
            "activityId": new_activity.activity_id,
            "activityName": new_activity.activity_name,
            "activityDate": new_activity.activity_date,
            "activityType": new_activity.workout_type,
            "duration": new_activity.duration,
            "distance": new_activity.distance,
            "sufferScore": new_activity.suffer_score,
            "activityNotes": new_activity.activity_notes
            })



@app.route('/api/<user_id>/periods')
def period_data(user_id):
    # user_id = session["user_id"]
    all_periods = MenseLog.query.filter(MenseLog.user_id == user_id).all()

    periods = []

    for period in all_periods:
        new_period = {
            "id": period.mense_id, 
            "flow": period.flow_volume,
            "mood": period.mood, 
            "cramps": period.cramps, 
            "bloating": period.bloating, 
            "fatigue": period.fatigue, 
            "date": period.mense_date.strftime("%Y-%m-%d"), 
            "notes": period.mense_notes,
            "created_at": period.created_at.strftime("%Y-%m-%d")
        }
        periods.append(new_period)

    periods.sort(key=lambda x: datetime.datetime.strptime(x['date'], "%Y-%m-%d"))

    last_period = db.session.query(func.max(MenseLog.mense_date)).one()[0].strftime("%B %d, %Y")
    
    return jsonify({
        "periods": periods, 
        "success": True, 
        "lastPeriod": last_period
    })


@app.route("/api/<user_id>/periods/<period_id>", methods=["PUT"])
# change to /api/activity update & /api/activity post
def update_period(user_id, period_id):
    data = request.json

    user_id = session["user_id"]

    edited_period_id = data.get("period_id")
    
    edited_mense_date = data.get("mense_date")
    edited_flow_volume = data.get("flow_volume")
    edited_mood = data.get("mood")
    edited_cramps = data.get("cramps")
    edited_bloating = data.get("bloating")
    edited_fatigue = data.get("fatigue")
    edited_notes = data.get("notes")

    currentTime= datetime.datetime.now()

    edited_period = MenseLog.get_period_by_id(edited_period_id)

    edited_period.user_id = user_id
    edited_period.mense_date = edited_mense_date
    edited_period.flow_voume = edited_flow_volume
    edited_period.mood = edited_mood
    edited_period.cramps = edited_cramps
    edited_period.bloating = edited_bloating
    edited_period.fatigue = edited_fatigue
    edited_period.notes = edited_notes

    db.session.commit()

    return jsonify({
        "success": True, 
        "error": None, 
        "periodId": edited_period.mense_id,        
        "flowVolume": edited_period.flow_voume,
        "periodDate": edited_period.mense_date.strftime("%Y-%m-%d"),
        "mood": edited_period.mood,
        "cramps": edited_period.cramps,
        "bloating": edited_period.bloating,
        "fatigue": edited_period.fatigue,
        "activityNotes": edited_period.notes
        })



@app.route("/api/<user_id>/periods", methods=["POST"])
def add_period(user_id):
    """Save user-entered period info to the database."""
    data = request.json
    
    user_id = data.get("user_id")
    flow_volume = data.get("flow_volume")
    mood = data.get("mood")
    cramps = data.get("cramps")
    bloating = data.get("bloating")
    fatigue = data.get("fatigue")
    mense_date = data.get("mense_date")
    notes = data.get("notes")
    created_at = datetime.datetime.now()

    currentTime = datetime.datetime.now()

    if mense_date is None or flow_volume is None:
        error = "Please enter a date & flow"
        success = False
        
        return jsonify({
            "success": success, 
            "error": error})
        
    elif datetime.datetime.strptime(mense_date, "%Y-%m-%d") > currentTime:
        error = "The date you entered is in the future. Please enter a valid date."
        success = False
        
        return jsonify({
            "success": success, 
            "error": error})

    else:
        error = None
        success = True

        new_period = MenseLog.create_mense_log(user_id, flow_volume, mood, cramps, bloating, fatigue, mense_date, notes, created_at)

        return jsonify({
            "success": success, 
            "error": error,
            "periodId": new_period.mense_id,
            "flowVolume": new_period.flow_volume,
            "mood": new_period.mood,
            "cramps": new_period.cramps,
            "bloating": new_period.bloating,
            "fatigue": new_period.fatigue,
            "periodDate": new_period.mense_date,
            "notes": new_period.notes,
            "createdAt": new_period.created_at
            })

# @app.route("/api/<user_id>/data")
# def chart_data(user_id):
#     all_periods = MenseLog.query.filter(MenseLog.user_id == user_id).all()

#     all_activities = ActivityLog.query.filter(ActivityLog.user_id == user_id).all()

#     periods = []

#     for period in all_periods:
#         new_period = {"id": period.mense_id, "flow": period.flow_volume, "mood": period.mood, "cramps": period.cramps, "bloating": period.bloating, "fatigue": period.fatigue, "date": period.mense_date, "notes": period.mense_notes}
#         # activity = activity.to_dict()
#         periods.append(new_period)

    
#     def get_strava_activity_data():
#         url = "https://www.strava.com/api/v3/athlete/activities"

#         access_token = session["access_token"]
#         # print(access_token)

#         headers = {
#             "Authorization": f"Bearer {access_token}"
#         }

#         page = str(1)

#         r = requests.get(f"{url}?before=1653447977&after=959223977&page={page}&per_page=20", headers=headers)
        
#         return r.json()

#     strava_activities = get_strava_activity_data()
#     # print(strava_activities)
    
#     def km_to_miles(kilometers):
#         return round((kilometers * 0.000621371), 2)

#     activity_objs = []

#     for activity in strava_activities:
#         new_strava_act = {"id": activity["id"], "name": activity["name"], "date": activity["start_date_local"], "distance": km_to_miles(activity["distance"]), "type": activity["type"]}
#         activity_objs.append(new_strava_act)


#     all_activities = ActivityLog.query.filter(ActivityLog.user_id == user_id).all()

#     for activity in all_activities:
#         new_act = {"id": activity.activity_id, "name": activity.activity_name, "date": activity.activity_date.strftime("%a %b %d %Y"), "distance": activity.distance, "type": activity.activity_type}
#         # activity = activity.to_dict()
#         activity_objs.append(new_act)
    
    
#     return jsonify({"activities": activity_objs, "periods": periods})

if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", port="5001", debug=True)
from flask import Flask, render_template,json, jsonify, request, flash, session, redirect;

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
    return redirect(f"/users/home")
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
    print(email)
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
    new_password = data.get("password")
    created_at = datetime.datetime.now()

    all_users = [x.email for x in db.session.query(User.email).distinct()]

    if new_email not in all_users and "@" in new_email: 
        new_user = User.create_user(new_fname, new_lname, new_team, new_email, new_password, created_at)

        session["user_id"] = new_user.user_id

        return jsonify({"success": True,"user_id":new_user.user_id, "first_name": new_user.first_name, "last_name": new_user.last_name, "team_name": new_user.team_name, "email": new_user.email, "password": new_user.password, "created_at": new_user.created_at, "error_msg": None})
    
    elif "@" not in new_email:
        error = "Please enter a valid email."
        return jsonify({"success": False, "error_msg": error})

    elif new_email in all_users:
        error = "We found an existing account, please log in."
        return jsonify({"success": False, "error_msg": error})
        
    else:
        error = "Please complete all required fields."
        return jsonify({"success": False, "error_msg": error})



    
    
@app.route('/api/users/<user_id>/activities')
def activity_data(user_id):
    """All activities."""
    
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
    # print(strava_activities)
    
    def km_to_miles(kilometers):
        return round((kilometers * 0.000621371), 2)

    activity_objs = []

    for activity in strava_activities:
        new_strava_act = {"id": activity["id"], "name": activity["name"], "date": activity["start_date_local"], "distance": km_to_miles(activity["distance"]), "type": activity["type"]}
        activity_objs.append(new_strava_act)


    all_activities = ActivityLog.query.filter(ActivityLog.user_id == user_id).all()

    for activity in all_activities:
        new_act = {"id": activity.activity_id, "name": activity.activity_name, "date": activity.activity_date.strftime("%a %b %d %Y"), "distance": activity.distance, "type": activity.activity_type}
        # activity = activity.to_dict()
        activity_objs.append(new_act)
    
    
    return jsonify({"activities": activity_objs})


@app.route("/users/<user_id>/home")
def user_homepage(user_id):
    """Display user's homepage after logging in."""
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
   



@app.route("/users/<user_id>/profile")
def profile(user_id):
    """User profile page."""
    user = User.get_user_by_id(user_id)
    # dt = user.created_at
    # trunc_date = datetime.date( dt.day, dt.month, dt.year)
    return jsonify({"success":True, "first_name": user.first_name, "last_name": user.last_name, "team_name": user.team_name, "email": user.email, "password": user.password, "member_since": user.created_at})


@app.route("/api/add-activity", methods=["POST"])
def add_activity():
    """Add a new activity."""
    data = request.json

    user_id = data.get("user_id")
    new_act_date = data.get("activity_date")
    new_act_type = data.get("activity_type")
    new_act_name = data.get("activity_name")
    new_act_duration = data.get("duration")
    new_act_distance = data.get("distance")
    new_act_suffer_score = data.get("suffer_score")
    new_act_notes = data.get("activity_notes")
    created_at = datetime.datetime.now()

    
    
    if new_act_date is None:
        error = "Please enter an activity date, type, & duration"
        success = False
        
        return jsonify({"success": success, "error": error})
        
    elif datetime.datetime.strptime(new_act_date, "%m-%d-%Y") > created_at:
        error = "The date you entered is in the future. Please enter a valid activity date."
        success = False
        
        return jsonify({"success": success, "error": error})

    else:
        error = None
        success = True

        new_activity = ActivityLog.create_activity(user_id, new_act_date, new_act_type, new_act_name, new_act_duration, new_act_distance, new_act_suffer_score, new_act_notes, created_at)



        return jsonify({"success": success, "error": error})

    # , "activity_date": new_act.activity_date, "activity_type": new_act.activity_type, "activity_name": new_act.activity_name, "duration": new_act.duration, "distance": new_act.distance, "suffer_score": new_act.suffer_score, "activity_notes": new_act.activity_notes})


@app.route('/api/users/<user_id>/periods')
def period_data(user_id):

        all_periods = MenseLog.query.filter(MenseLog.user_id == user_id).all()

        periods = []

        for period in all_periods:
            new_period = {"id": period.mense_id, "flow": period.flow_volume, "mood": period.mood, "cramps": period.cramps, "bloating": period.bloating, "fatigue": period.fatigue, "date": period.mense_date, "created_at": period.created_at.strftime("%a %b %d %Y"), "notes": period.mense_notes}
            # activity = activity.to_dict()
            periods.append(new_period)
       
        
        return jsonify({"periods": periods, "success": True})



@app.route("/api/add-period", methods=["POST"])
def add_period():
    """Save user-entered period info to the database."""
    data = request.json

    user_id = data.get("user_id")
    flow_volume = data.get("flow_volume")
    mood = data.get("mood")
    cramps = data.get("cramps")
    bloating = data.get("bloating")
    fatigue = data.get("fatigue")
    mense_date = data.get("date")
    notes = data.get("notes")
    created_at = datetime.datetime.now()

    new_period = MenseLog.create_mense_log(user_id, flow_volume, mood, cramps, bloating, fatigue, mense_date, notes, created_at)


    if new_period is None:
        error = "Please enter a date & flow"
        success = False
        
        # return jsonify({"success": success, "error": error})
        
    elif datetime.datetime.strptime(new_period, "%m-%d-%Y") > created_at:
        error = "The date you entered is in the future. Please enter a valid date."
        success = False
        
        # return jsonify({"success": success, "error": error})

    else:
        error = None
        success = True

    return jsonify({"success": success, "error": error})

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
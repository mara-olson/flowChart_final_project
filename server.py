from flask import Flask, render_template,json, jsonify, request, flash, session, redirect;

from model import connect_to_db, db, User, StravaUser, StravaActivity, ActivityLog, MenseLog, SleepLog;

import datetime;

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def homepage():
    """View homepage."""
    error = None
    return render_template("index.html", error=error)


@app.route('/<path>')
def route(path):

    return render_template('index.html')


@app.route('/<path>/<code>')
def nested_route(path, code):

    return render_template('index.html')


@app.route("/login")
def login():
    """Display login page."""
    error = None

    return render_template("index.html", error=error)


@app.route("/login", methods=['POST'])
def login_process():
    """Process the user's login."""

    data = request.json
    email = data.get("email")
    password = data.get("password")
    # error = data.get("error")

    user = User.get_user_by_email(email)

    if not user:
        flash(f"We could not find an account for {email}. Please sign up!")
        # return redirect("/login")
        # return jsonify({"success": False,"error":error})

    elif password != user.password:
        flash("The password you entered is incorrect. Please re-enter.")
        # return redirect("/login")
        # return jsonify({"success": False,"error":error})

    else:
        # email = session["email"]
        # return redirect(f'/{user_id}/home')
        session["user_id"] = user.user_id
        session["email"] = email

        return jsonify({"success": True, "user_id":user.user_id, "email":user.email, "password": user.password})
    
    
        # return jsonify({"user_email":email})
    # return jsonify({"error": error, "user": user})



@app.route("/sign-up")
def sign_up():
    """Display registration page & create user with entered credentials."""

    return render_template("index.html")


@app.route("/sign-up", methods=['POST'])
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
    
    # if not new_fname or not new_lname or not new_email or not new_password:
    #     flash('Please complete all required fields')

    if new_email not in all_users and "@" in new_email: 
        new_user = User.create_user(new_fname, new_lname, new_team, new_email, new_password, created_at)
    
        # user_id = new_user.user_id

        # return redirect(f"/{user_id}/home")
        return jsonify({"success": True,"user_id":new_user.user_id, "first_name": new_user.first_name, "last_name": new_user.last_name, "team_name": new_user.team_name, "email": new_user.email, "password": new_user.password, "created_at": new_user.created_at})
    
    else:

        flash("We found an existing account, please log in.")

        return jsonify({"success": False})


@app.route('/users/<user_id>/activities')
def activity_data(user_id):
    # user_id = session["user_id"]
    
    # if user_id == "null":
    #     redirect("/login")
        
    # else:
        user = User.get_user_by_id(user_id)

        all_activities = ActivityLog.query.filter(ActivityLog.user == user).all()

    
        activities = []

        for activity in all_activities:
            activity = activity.to_dict()
            # for i in range(len(all_activities)):
            #     activities[i] = activity
            activities.append(activity)
        # produces:
        # [0: {'activity_date': datetime.datetime(2022, 4, 16, 0, 0), 'activity_type': 'Run', 'activity_id': 6, 'activity_name': 'Running & Running', 'duration': 91, 'distance': 12, 'suffer_score': 7, 'activity_notes': None, 'created_at': datetime.datetime(2022, 4, 12, 0, 0), 'deleted_at': None}, 1: {'activity_date': datetime.datetime(2022, 4, 16, 0, 0), 'activity_type': 'Run', 'activity_id': 6, 'activity_name': 'Running & Running', 'duration': 91, 'distance': 12, 'suffer_score': 7, 'activity_notes': None, 'created_at': datetime.datetime(2022, 4, 12, 0, 0), 'deleted_at': None}, 2: {'activity_date': datetime.datetime(2022, 4, 16, 0, 0), 'activity_type': 'Run', 'activity_id': 6, 'activity_name': 'Running & Running', 'duration': 91, 'distance': 12, 'suffer_score': 7, 'activity_notes': None, 'created_at': datetime.datetime(2022, 4, 12, 0, 0), 'deleted_at': None}]
        
        return jsonify({"activities": activities})


@app.route("/users/<user_id>/home")
def user_homepage(user_id):
    """Display user's homepage after logging in."""
    # email = session["email"]
    
    user = User.get_user_by_email(session["email"])

    fname = user.first_name
    
    user_id = user.user_id

    welcome_msg = f"Welcome, {fname}!"

    activities = ActivityLog.query.filter(ActivityLog.user_id == user_id).all()


    return jsonify({'name':fname, 'welcome_msg': welcome_msg, 'activities': activities})




@app.route("/<user_id>/profile")
def profile(userId):
    """User profile page."""
    return render_template("profile.html")


# @app.route("/<user_id>/activities")
# def activities():
#     """Display a user's activities."""
#     return render_template("activities.html")


@app.route("/<user_id>/periods")
def periods():
    """Display a user's menstrual logs."""
    return render_template("periods.html")



if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", port="5001", debug=True)
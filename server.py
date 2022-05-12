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



@app.route("/login")
def login():
    """Display login page."""
    error = None

    return render_template("/login.html", error=error)


@app.route("/login", methods=['POST'])
def login_process():
    """Process the user's login."""
    error = None
    user = None
    
    email = request.json.get("email")

    password = request.json.get("password")

    user = User.get_user_by_email(email)

    if not user:
        error = (f"We could not find an account for {email}. Please sign up!")
        # return redirect("/login")
        return jsonify({"success": False,"error":error})

    elif user.password != password:
        error = ("The password you entered is incorrect. Please re-enter.")
        # return redirect("/login")
        return jsonify({"success": False,"error":error})

    else:
        # email = session["email"]
        # return redirect(f'/{user_id}/home')
        return jsonify({"success": True,"user_id":user.user_id, "email":user.email, "password": user.password})
    
    
        # return jsonify({"user_email":email})
    # return jsonify({"error": error, "user": user})



@app.route("/sign-up")
def sign_up():
    """Display registration page & create user with entered credentials."""

    return render_template("sign-up.html")


@app.route("/sign-up", methods=['POST'])
def save_new_user():
    """Display registration page & create user with entered credentials."""
    new_fname = request.form.get("sign-up-fname")

    new_lname = request.form.get("sign-up-lname")

    new_team = request.form.get("sign-up-team")
    
    new_email = request.form.get("sign-up-email")

    session["email"] = new_email

    new_password = request.form.get("sign-up-password")

    created_at = datetime.datetime.now()

    all_users = [x.email for x in db.session.query(User.email).distinct()]
    
    if new_email not in all_users: 
        new_user = User.create_user(new_fname, new_lname, new_team, new_email, new_password, created_at)
    
        user_id = new_user.user_id

        session["user_id"] = user_id

    # return render_template("sign-up.html")
        return redirect(f"/{user_id}/home")
    
    else:
        flash("We found an existing account, please log in.")
        return redirect("/sign-up")


@app.route('/api/activities', methods=["POST"])
def activity_data():
    user_id = session["user_id"]
    
    user = User.get_user_by_id(user_id)

    all_activities = ActivityLog.query.filter(ActivityLog.user == user).all()

    # json_activities = json.dumps(activities)

    # return json_activities
    # jsonify(json_activities=list)
    
    activities = {}

    for activity in all_activities:
        activity.to_dict()
        for i in range(len(all_activities)):
            activities[i] = all_activities[i]
     
    # return jsonify(activities)
    return jsonify({"activities": activities})


@app.route("/<user_id>/home")
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
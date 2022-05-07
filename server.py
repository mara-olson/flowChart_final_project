from flask import Flask, render_template, jsonify, request, flash, session, redirect
from model import connect_to_db, db, User, StravaUser, StravaActivity, ActivityLog, MenseLog, SleepLog

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def homepage():
    """View homepage."""
    return render_template("index.html")

@app.route("/login")
def login():
    """User login page."""
    return render_template("login.html")

@app.route("/login", methods=["POST"])
def login_process():
    """Process the user's login."""

    email = request.form.get("email")
    password = request.form.get("password")

    user = User.get_user_by_email(email)
    if not user:
        flash("We could not find an account with this email. Please sign up!")

    elif user.password != password:
        flash("The password you entered is incorrect. Please re-enter.")
    else:
        session["user_email"] = user.email
        flash(f"Welcome back, {user.first_name}")


@app.route("/{user_id}/profile")
def profile(userId):
    """User profile page."""
    return render_template("profile.html")


@app.route("/activities")
def activities():
    """Display a user's activities."""
    return render_template("activities.html")


@app.route("/periods")
def periods():
    """Display a user's menstrual logs."""
    return render_template("periods.html")



if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", port="5001", debug=True)
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



@app.route("/login", methods=['GET', 'POST'])
def login_process():
    """Process the user's login."""
    error = None
    user = None
    
    email = request.form.get("email")
    password = request.form.get("password")

    if request.method == 'POST':
        user = User.get_user_by_email(email)
        if not user:
            error = f"We could not find an account for {email}. Please sign up!"
            # return redirect("/login", error=error)

        elif user.password != password:
            error = "The password you entered is incorrect. Please re-enter."
            # return redirect("/login", error=error)

        else:
            session["user_email"] = user.email
            flash(f"Welcome back, {user.first_name}!")
            return redirect("/")

    return render_template("/index.html", error=error, email=email, user=user)


@app.route("/sign-up")
def sign_up():
    """Display registration page & create user with entered credentials."""

    return render_template("/sign-up")


@app.route("/sign-up", methods=['POST'])
def save_new_user():
    """Display registration page & create user with entered credentials."""

    return redirect("/{user_id}/home")




@app.route("/<user_id>/home")
def user_homepage(user_id):
    """Display user's homepage after logging in."""
    email = request.form.get("email")
    
    user = User.get_user_by_email(email)

    fname = user.first_name
    
    user_id = user.user_id

    return render_template("/home.html", name=fname, user_id=user_id)




@app.route("/{user_id}/profile")
def profile(userId):
    """User profile page."""
    return render_template("profile.html")


@app.route("/{user_id}/activities")
def activities():
    """Display a user's activities."""
    return render_template("activities.html")


@app.route("/{user_id}/periods")
def periods():
    """Display a user's menstrual logs."""
    return render_template("periods.html")



if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(host="0.0.0.0", port="5001", debug=True)
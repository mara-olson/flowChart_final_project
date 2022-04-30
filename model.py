"""Models for training & period cycles app."""

from flask_sqlalchemy import SQLAlchemy;

db = SQLAlchemy()

class User(db.Model):
    """A user."""
    
    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primaryKey=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    team_name = db.Column(db.String)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime)
    deactivated_at = db.Column(db.DateTime)
    notifications = db.Column(db.Boolean)


class StravaUser(db.Model):
    """A user connected to their Strava account."""
    
    __tablename__ = "strava_users"

    strava_user_id = user_id = db.Column(db.Integer, autoincrement=True, primaryKey=True)
    user_id = db.Column(db.Integer, nullable=False)
    team_name = db.Column(db.String)
    created_at = db.Column(db.DateTime)
    deactivated_at = db.Column(db.DateTime)



class StravaActvity(db.Model):
    """An activity imported from Strava.
    
    From API /activities/{id}."""
    
    __tablename__ = "strava_activities"

    strava_activity_id = db.Column(db.Integer, primaryKey=True) #id
    strava_user_id = db.Column(db.Integer, nullable=False) #athlete.id
    activity_name = db.Column(db.String) #name
    activity_type = db.Column(db.String) #type
    activity_date = db.Column(db.DateTime, nullable=False) #start_date
    distance = db.Column(db.Integer) #distance
    duration = db.Column(db.Integer) #elapsed_time or moving_time in minutes
    workout_type = db.Column(db.Integer) #workout_type (integer from Strava, will need to convert)
    suffer_score = db.Column(db.Integer) #suffer_score (total of 9 increments, I'm assuming 1-10)
    description = db.Column(db.Text) #description



class ActivityLog(db.Model):
    """An activity manually added by the user."""
    
    __tablename__ = "activity_logs"

    activity_id = db.Column(db.Integer, primaryKey=True, autoincrement=True)
    user_id = db.Column(db.Integer, nullable=False) 
    activity_name = db.Column(db.String, default="Activity") 
    activity_type = db.Column(db.String, default="Run") 
    activity_date = db.Column(db.DateTime, nullable=False) 
    distance = db.Column(db.Integer) 
    duration = db.Column(db.Integer) 
    workout_type = db.Column(db.String) 
    suffer_score = db.Column(db.Integer) 
    activity_notes = db.Column(db.Text) 
    created_at = db.Column(db.DateTime)
    deleted_at = db.Column(db.DateTime)


class MenseLog(db.Model):
    """A log added by the user related to their menstrual cycle."""
    
    __tablename__ = "mense_logs"

    mense_id = db.Column(db.Integer, primaryKey=True, autoincrement=True)
    user_id = db.Column(db.Integer, nullable=False)
    mense_date = db.Column(db.DateTime)
    flow_volume = db.Column(db.String)
    mense_notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime)
    deleted_at = db.Column(db.DateTime)


class SymptomLog(db.Model):
    """A menstrual-related symptom added by the user."""
    
    __tablename__ = "sx_logs"

    sx_id = db.Column(db.Integer, primaryKey=True, autoincrement=True)
    created_at = db.Column(db.
    deleted_at = db.Column(db.


class SleepLog(db.Model):
    """A log added by the user related to their sleep."""
   
    __tablename__ = "sleep_logs"
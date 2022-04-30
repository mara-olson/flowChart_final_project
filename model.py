"""Models for training & period cycles app."""

from flask_sqlalchemy import SQLAlchemy;

db = SQLAlchemy()

class User(db.Model):
    """A user."""
    
    __tablename__ = "users"


class StravaUser(db.Model):
    """A user connected to their Strava account."""
    
    __tablename__ = "strava_users"



class StravaActvity(db.Model):
    """An activity imported from Strava."""
    
    __tablename__ = "strava_activities"


class ActivityLog(db.Model):
    """An activity manually added by the user."""
    
    __tablename__ = "activity_logs"


class MenseLog(db.Model):
    """A log added by the user related to their menstrual cycle."""
    
    __tablename__ = "mense_logs"


class SymptomLog(db.Model):
    """A menstrual-related symptom added by the user."""
    
    __tablename__ = "sx_logs"


class SleepLog(db.Model):
    """A log added by the user related to their sleep."""
   
    __tablename__ = "sleep_logs"
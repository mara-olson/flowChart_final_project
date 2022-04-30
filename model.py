"""Models for training & period cycles app."""

from flask_sqlalchemy import SQLAlchemy;

db = SQLAlchemy()

class User(db.Model):
    pass


class StravaUser(db.Model):
    pass


class StravaActvity(db.Model):
    pass


class ActivityLog(db.Model):
    pass


class MenseLog(db.Model):
    pass


class SymptomLog(db.Model):
    pass


class SleepLog(db.Model):
    pass
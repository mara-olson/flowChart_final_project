import os
import json
import random
from random import choice, randint
from datetime import datetime

from model import ActivityLog, MenseLog, SleepLog, StravaActivity, db, connect_to_db, User, StravaUser
# , StravaActivity, ActivityLog, MenseLog, SymptomLog, SleepLog
import server

os.system('dropdb period')
os.system('createdb period')

connect_to_db(server.app)
db.create_all()
db.session.commit()

############ USER ##########
def create_user(first_name, last_name, team_name, email, password, created_at, notifications):

    user = User(first_name=first_name, last_name=last_name, team_name=team_name, email=email, password=password, created_at=created_at, notifications=notifications)

    return user


with open('data/seed_user_data.json') as u:
    user_data = json.loads(u.read())
    # print(user_data)
users_in_db = []
for user in user_data:
    
    first_name, last_name, team_name, email, password, created_at, notifications = (
        user["first_name"],
        user["last_name"],
        user["team_name"],
        user["email"],
        user["password"],
        user["created_at"],
        user["notifications"]
    )
    app_user = create_user(first_name, last_name, team_name, email, password, created_at, notifications)
    users_in_db.append(app_user)

db.session.add_all(users_in_db)
db.session.commit()

############ STRAVA USER ##########
def create_strava_user(strava_user_id, user_id,strava_email, team_name, created_at, deactivated_at):
            
        strava_user = StravaUser(strava_user_id=strava_user_id,user_id=user_id, strava_email=strava_email, team_name=team_name, created_at=created_at, deactivated_at=deactivated_at)

        return strava_user


with open('data/seed_strava_user_data.json') as su:
    strava_user_data = json.loads(su.read())
    print(strava_user_data)

strava_users_in_db = []
for strava_user in strava_user_data:
    
    strava_user_id, user_id, strava_email, team_name, created_at, deactivated_at = (
        strava_user["strava_user_id"],
        strava_user["user_id"],
        strava_user["strava_email"],
        strava_user["team_name"],
        strava_user["created_at"],
        strava_user["deactivated_at"]
    )
    
    app_strava_user = create_strava_user(strava_user_id, user_id, strava_email, team_name, created_at, deactivated_at)

    strava_users_in_db.append(app_strava_user)

db.session.add_all(strava_users_in_db)
db.session.commit()

############ STRAVA ACTIVITY ##########
# def create_strava_activity(strava_activity_id, strava_user_id, activity_name, activity_type, activity_date, distance, duration, workout_type, suffer_score, description):

#     strava_activity = StravaActivity(strava_activity_id=strava_activity_id, strava_user_id=strava_user_id, activity_name=activity_name, activity_type=activity_type, activity_date=activity_date, distance=distance, duration=duration, activity_type=activity_type, suffer_score=suffer_score, description=description)

#     return strava_activity

# with open('data/seed_strava_activities.json') as sa:
#     strava_act_data = json.loads(sa.read())
#     # print(strava_act_data)
# strava_activities_in_db = []
# for strava_act in strava_act_data:
    
#     strava_activity_id, strava_user_id, activity_name, activity_type, activity_date, distance, duration, activity_type, suffer_score, description = (
#         strava_act["strava_activity_id"],
#         strava_act["strava_user_id"],
#         strava_act["activity_name"],
#         strava_act["activity_type"],
#         strava_act["activity_date"],
#         strava_act["distance"],
#         strava_act["duration"],
#         strava_act["workout_type"],
#         strava_act["suffer_score"],
#         strava_act["description"]
#     )
#     new_strava_activity = create_strava_activity(strava_activity_id, strava_user_id, activity_name, activity_type, activity_date, distance, duration, activity_type, suffer_score, description)

#     strava_activities_in_db.append(new_strava_activity)

# db.session.add_all(strava_activities_in_db)
# db.session.commit()


############ ACTIVITY ##########
def create_activity(activity_id, user_id, activity_date, activity_type, activity_name, duration, distance, suffer_score, activity_notes):
    activity = ActivityLog(activity_id=activity_id, user_id=user_id,activity_date=activity_date, activity_type=activity_type, activity_name=activity_name, duration=duration, distance=distance, suffer_score=suffer_score, activity_notes=activity_notes)

    return activity 

with open('data/seed_activities.json') as a:
    act_data = json.loads(a.read())

activities_in_db = []
for activity in act_data:
    activity_id, user_id, activity_date, activity_type, activity_name, duration, distance, suffer_score, activity_notes = (
        activity["activity_id"],activity["user_id"],
        activity["activity_date"],
        activity["activity_type"],
        activity["activity_name"],
        activity["duration"],
        activity["distance"],
        activity["suffer_score"],
        activity["activity_notes"]
    )
    
    new_activity = create_activity(activity_id, user_id, activity_date, activity_type, activity_name, duration, distance, suffer_score, activity_notes)

    activities_in_db.append(new_activity)


db.session.add_all(activities_in_db)
db.session.commit()


############ MENSES ##########
def create_mense_log(user_id, flow_volume, mood, fatigue, bloating, cramps, mense_date, mense_notes, created_at, deleted_at):

    mense_log = MenseLog(user_id=user_id, flow_volume=flow_volume, mood=mood, fatigue=fatigue, bloating=bloating, cramps=cramps, mense_date=mense_date,mense_notes=mense_notes, created_at=created_at, deleted_at=deleted_at)

    return mense_log

with open('data/seed_mense_data.json') as md:
    mense_data = json.loads(md.read())

mense_logs_in_db = []
for mense_log in mense_data:
    user_id, flow_volume, mood, fatigue, bloating, cramps, mense_date, mense_notes, created_at, deleted_at  = (
        mense_log["user_id"],
        mense_log["flow_volume"],
        mense_log["mood"],
        mense_log["fatigue"],
        mense_log["bloating"],
        mense_log["cramps"],
        mense_log["mense_date"],
        mense_log["mense_notes"],
        mense_log["created_at"],
        mense_log["deleted_at"]
    )
    new_mense_log = create_mense_log(user_id, flow_volume, mood, fatigue, bloating, cramps, mense_date, mense_notes, created_at, deleted_at)

    mense_logs_in_db.append(new_mense_log)

db.session.add_all(mense_logs_in_db)
db.session.commit()


############ SLEEP ##########
def create_sleep_log(user_id, sleep_duration, sleep_quality, sleep_notes, created_at, deleted_at):
    
    sleep_log = SleepLog(user_id=user_id, sleep_duration=sleep_duration, sleep_quality=sleep_quality, sleep_notes=sleep_notes, created_at=created_at, deleted_at=deleted_at)

    return sleep_log

with open('data/seed_sleep_data.json') as sd:
    sleep_data = json.loads(sd.read())

sleep_logs_in_db = []
for sleep_log in sleep_data:
    user_id, sleep_duration, sleep_quality, sleep_notes, created_at, deleted_at = (
        sleep_log["user_id"],
        sleep_log["sleep_duration"],
        sleep_log["sleep_quality"],
        sleep_log["sleep_notes"],
        sleep_log["created_at"],
        sleep_log["deleted_at"]
    )

    new_sleep_log = create_sleep_log(user_id, sleep_duration, sleep_quality, sleep_notes, created_at, deleted_at)
    sleep_logs_in_db.append(new_sleep_log)

db.session.add_all(sleep_logs_in_db)
db.session.commit()





# user = model.User(first_name="Ron",
#     last_name="Weasley",
#     email= "ron@gmail.com",
#     password= "1234abc")

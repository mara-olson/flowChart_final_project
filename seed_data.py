import os
import json
from random import choice, randint
from datetime import datetime

import model
import server

os.system('dropdb period')
os.system('createdb period')

model.connect_to_db(server.app)
model.db.create_all()

with open('data/movies.json') as f:
    movie_data = json.loads(f.read())



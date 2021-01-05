import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_login import LoginManager

from .config import Configuration
from .models import db

app = Flask(__name__)
app.config.from_object(Configuration)
db.init_app(app)
Migrate(app, db)

CORS(app)

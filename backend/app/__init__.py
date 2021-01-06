import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_login import LoginManager

from .config import Configuration
from .models import db, User
from .seeds import seed_commands


app = Flask(__name__)


login = LoginManager(app)
login.login_view = "auth.unauthorized"


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


app.cli.add_command(seed_commands)


app.config.from_object(Configuration)
db.init_app(app)
migrate = Migrate(app, db)

CORS(app)

import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import flask_migrate
from flask_login import LoginManager

from .config import Configuration

app = Flask(__name__)


CORS(app)

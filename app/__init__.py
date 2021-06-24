import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect, generate_csrf

from .config import Configuration
from .models import db, User
from .seeds import seed_commands
from .api.auth_routes import auth_routes
from .api.directory_routes import directory_routes
from .api.document_routes import document_routes


app = Flask(__name__)


login = LoginManager(app)
login.login_view = "auth.unauthorized"


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


app.cli.add_command(seed_commands)


app.config.from_object(Configuration)
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(directory_routes, url_prefix="/api/directories")
app.register_blueprint(document_routes, url_prefix="/api/documents")
db.init_app(app)
migrate = Migrate(app, db)

CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie("csrf_token",
                        generate_csrf(),
                        secure=True if os.environ.get(
                            "FLASK_ENV") == "production" else False,
                        samesite="Strict" if os.environ.get(
                            "FLASK_ENV") == "production" else None,
                        httponly=True
                        )
    return response


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    print("path", path)
    if path == "favicon.ico":
        return send_from_directory("static", "favicon.ico")
    return send_from_directory("static", "index.html")

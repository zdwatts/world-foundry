from flask import Blueprint, jsonify
from app.models import Directory, User, db
from flask_login import current_user, login_required


directory_routes = Blueprint("directories", __name__)


@directory_routes.route("/")
@login_required
def directory():
    directories = Directory.query.filter_by(user_id=current_user.id).all()
    # print("DIRECTORIES:", directories)
    return {"directories": [directory.name for directory in directories]}
    # print("1:", directory)
    # children = directory.children
    # print("2:", children)
    # parent = children[0].parent
    # print("3:", parent)
    # return {}

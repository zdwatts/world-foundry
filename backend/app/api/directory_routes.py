from flask import Blueprint, jsonify
from app.models import Directory, User, db
from flask_login import current_user, login_required


directory_routes = Blueprint("directories", __name__)


@directory_routes.route("/")
@login_required
def root_directory():
    root_directory = Directory.query.filter_by(user_id=current_user.id,
                                               parent_id=None).first()
    return {"root": root_directory.to_dict()}


@directory_routes.route("/all")
@login_required
def all_directories():
    directories = Directory.query.filter_by(user_id=current_user.id).all()
    return {"directories": [directory.to_dict() for directory in directories]}


@directory_routes.route("/", methods=["POST"])
def new_directory():
    parent_id = request.json["parent directory"]
    user_id = current_user.id
    name = request.json["directory-name"]

    new_directory = Directory(parent_id, user_id, name)

    db.session.add(new_directory)
    db.session.commit()

    return new_directory.to_dict()

from flask import Blueprint, jsonify
from app.models import Directory, User, db
from flask_login import current_user, login_required


directory_routes = Blueprint("directories", __name__)


@directory_routes.route("/")
@login_required
def directory():
    root_directory = Directory.query.filter_by(user_id=current_user.id,
                                               parent_id=None).first()
    return {"root": root_directory.to_dict()}

from flask import Blueprint, jsonify
from app.models import Directory, User, db, Document
from flask_login import current_user, login_required


directory_routes = Blueprint("directories", __name__)


@directory_routes.route("/")
@login_required
def directory():
    documents = Document.query.order_by(Document.id.desc())
    return {"documents": [document.to_dict() for document in documents]}

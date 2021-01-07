from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Document, db

document_routes = Blueprint("documents", __name__)


@document_routes.route("/")
def documents():
    documents = Document.query.order_by(Document.id.desc())
    return {"documents": [document.to_dict() for document in documents]}


@document_routes.route("/", methods=["POST"])
def new_document():
    title = request.json["title"]
    body = request.json["body"]
    directory_id = Document.query.filter_by()

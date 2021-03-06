from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Document, Directory, db

document_routes = Blueprint("documents", __name__)


@document_routes.route("/")
def documents():
    documents = Document.query.order_by(Document.id.desc()).all()
    return {"documents": [document.to_dict() for document in documents]}


@document_routes.route("/references")
def references():
    references = Document.query.order_by(Document.references).all()
    print("THIS WORKED")
    return {"references": [reference.to_dict() for reference in references]}


@document_routes.route("", methods=["POST"])
def new_document():
    title = request.json["title"]
    body = request.json["body"]
    parent_directory_name = request.json["parent-directory"]
    parent_directory = Directory.query.filter_by(
                                        name=parent_directory_name).first()
    directory_id = parent_directory.id

    new_document = Document(title=title, body=body, directory_id=directory_id)

    db.session.add(new_document)
    db.session.commit()

    return {"id": new_document.id}


@document_routes.route("/<int:id>")
def one_document(id):
    document = Document.query.get(id)

    return {"document": document.to_dict()}


@document_routes.route("/<int:id>", methods=["DELETE"])
def delete_document(id):
    document = Document.query.get(id)
    if not document:
        return jsonify("Document not found")
    db.session.delete(document)
    db.session.commit()
    return jsonify("Document deleted from database")


@document_routes.route("/<int:id>", methods=["PUT"])
def edit_document(id):
    document = Document.query.get(id)
    new_title = request.json["title"]
    new_body = request.json["body"]

    document.title = new_title
    document.body = new_body

    db.session.add(document)
    db.session.commit()
    print("EDITED DOC:", document.to_dict())
    return document.to_dict()

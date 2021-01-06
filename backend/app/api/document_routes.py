from flask import Blueprint
from app.models import Document

document_routes = Blueprint("documents", __name__)


@document_routes.route("/")
def document():
    document = Document.query.filter_by(id=1).first()
    print("TITLE:", document.title)
    print("BODY:", document.body)
    return {}

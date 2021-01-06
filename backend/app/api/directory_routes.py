from flask import Blueprint
from app.models import Directory


directory_routes = Blueprint("directories", __name__)


@directory_routes.route("/")
def directory():
    directory = Directory.query.filter_by(id=1).first()
    print("1:", directory)
    children = directory.children
    print("2:", children)
    parent = children[0].parent
    print("3:", parent)
    return {}

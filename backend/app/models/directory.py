from .db import db


class Directory(db.Model):
    __tablename__ = "directories"

    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey("directories.id"),
                          nullable=True)
    userId = db.Column(db.Integer)
    name = db.Column(db.String(255))

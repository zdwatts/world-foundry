from .db import db
from sqlalchemy.orm import relationship, backref


class Directory(db.Model):
    __tablename__ = "directories"

    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey("directories.id"),
                          nullable=True)
    user_id = db.Column(db.Integer)
    name = db.Column(db.String(255))

    # parent = relationship("Directory", remote_side=[id])
    children = relationship("Directory", backref=backref("parent",
                            remote_side=[id]))

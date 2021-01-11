from .db import db
from sqlalchemy.orm import relationship, backref


class Directory(db.Model):
    __tablename__ = "directories"

    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey("directories.id"),
                          nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(255), nullable=False)

    parent = relationship("Directory", remote_side=[id],
                          back_populates="children")
    children = relationship("Directory", back_populates="parent")
    # children = relationship("Directory", backref=backref("parent",
    #                         remote_side=[id]))

    def to_dict(self):
        return {
            "id": self.id,
            "parent_id": self.parent_id,
            "user_id": self.user_id,
            "name": self.name,
            "children": [child.to_dict() for child in self.children]
        }

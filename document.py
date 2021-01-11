from .db import db


class Document(db.Model):
    __tablename__ = "documents"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=False)
    directory_id = db.Column(db.Integer, db.ForeignKey("directories.id"),
                             nullable=False)

    def __init__(self, title, body, directory_id):
        self.title = title
        self.body = body
        self.directory_id = directory_id

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "directory_id": self.directory_id
        }

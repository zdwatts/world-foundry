from .db import db

referencing = db.Table(
    "referencing",
    db.Column("referenced_id", db.Integer, db.ForeignKey("documents.id")),
    db.Column("reference_id", db.Integer, db.ForeignKey("documents.id"))
)


class Document(db.Model):
    __tablename__ = "documents"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=False)
    directory_id = db.Column(db.Integer, db.ForeignKey("directories.id"),
                             nullable=False)

    references = db.relationship(
        "Document",
        secondary=referencing,
        primaryjoin=(referencing.c.referenced_id == id),
        secondaryjoin=(referencing.c.reference_id == id),
        backref=db.backref("referencing", lazy="dynamic"),
        lazy="dynamic"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "directory_id": self.directory_id
        }

from app.models import db, Document


def seed_documents():

    demo_doc = Document(id=1, title="Demo Title", body="Demo Body",
                        directory_id=2)
    db.session.add(demo_doc)
    db.session.commit()


def undo_documents():
    db.session.execute("TRUNCATE documents;")
    db.session.commit()

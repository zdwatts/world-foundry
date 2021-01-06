from app.models import db, Directory


def seed_directories():

    parent = Directory(id=1, user_id=1, name="Demo Parent")

    child = Directory(id=2, user_id=1, name="Demo Child")
    child.parent = parent
    db.session.add(parent)
    db.session.add(child)
    db.session.commit()


def undo_directories():
    db.session.execute("TRUNCATE directories;")
    db.session.commit()

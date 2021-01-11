from app.models import db, Directory, User


def seed_directories():

    root_directory = Directory.query.filter_by(user_id=1).all()
    print("ROOT:", root_directory)

    parent = Directory(user_id=1,
                       name="Demo Parent")

    child = Directory(user_id=1, name="Demo Child")
    child.parent = parent
    db.session.add(parent)
    db.session.add(child)
    db.session.commit()


def undo_directories():
    db.session.execute("TRUNCATE directories;")
    db.session.commit()

from world_foundry.models import db, Directory, User


def seed_directories():

    root = Directory(user_id=1,
                     name="Demo Root")

    child = Directory(user_id=1, name="Demo Child")

    child.parent = root

    db.session.add(root)
    db.session.add(child)
    db.session.commit()


def undo_directories():
    db.session.execute("TRUNCATE directories;")
    db.session.commit()

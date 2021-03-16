from world_foundry.models import db, Directory, User


def seed_directories():

    root = Directory(user_id=1,
                     name="Your Worlds")

    bloodmoon_child = Directory(user_id=1, name="Bloodmoon Child")

    bloodmoon_child.parent = root

    characters = Directory(user_id=1, name="Characters")
    places = Directory(user_id=1, name="Places")
    organizations = Directory(user_id=1, name="Organizations")
    houses = Directory(user_id=1, name="Houses")
    countries_and_kingdoms = Directory(user_id=1, name="Countries and Kingdoms")

    characters.parent = bloodmoon_child
    places.parent = bloodmoon_child
    organizations.parent = bloodmoon_child
    houses.parent = bloodmoon_child
    countries_and_kingdoms.parent = bloodmoon_child

    db.session.add(root)
    db.session.add(bloodmoon_child)
    db.session.add(characters)
    db.session.add(places)
    db.session.add(organizations)
    db.session.add(houses)
    db.session.add(countries_and_kingdoms)
    db.session.commit()


def undo_directories():
    db.session.execute("TRUNCATE directories;")
    db.session.commit()

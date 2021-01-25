from world_foundry.models import db, Document


def seed_documents():

    azgarog = Document(title="Azgarog", body="""Principal antagonist. Azgarog
    is the King of the Fifth Plane of Hell, and as a jealous lower-tier demon
    king, seeks to increase his power by dominating large swathes of the
    mortal realm. Over centuries he has gained political power through
    manipulation and deceit. Rob, our protagonist, is his primary target. As
    the bastard son of Sivis, he is one of the few living beings with demon
    blood that would make a suitable long-term host for Azgarog's spirit.
    With Rob's body as his host, Azgarog could rule over the mortal realm
    in perpetuity, with no living being powerful enough to stop him.""",
                       directory_id=3)

    sivis = Document(title="Sivis", body="""Sivis is the Second Gifted of
    Azgarog. Blessed with demonic powers bestowed by drinking Azgarog's blood,
    he has served the demon king for a century and will continue to do so in
    perpetuity. Sivis's duties include assassination, destabilization of
    kingdoms, and sowing of seed for potential future hosts. """,
                     directory_id=3)

    rob = Document(title="Rob", body="""Rob lived his whole life hated by the
    people of Shoatwick, the village where he grew up. Part of that hatred
    comes from the fact that he is a bastard, and bastards are believed to
    be natural sons of devils. This hatred is finally justified when, in a
    blind, uncontrolled rage, Rob kills and maims several of his boyhood
    bullies with his bare hands. He has no memory of the incident, but
    several witnesses and his bloody knuckles tell a different story. After
    Shoatwick is raided by a rebel force, Rob undertakes a journey to find
    his birth mother and learn more about where he came from, and how he
    became cursed. """,
                   directory_id=3)


    db.session.commit()


def undo_documents():
    db.session.execute("TRUNCATE documents;")
    db.session.commit()

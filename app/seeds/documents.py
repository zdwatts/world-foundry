from app.models import db, Document


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
    kingdoms, and sowing of seed for potential future hosts.""",
                     directory_id=3)

    rob = Document(title="Rob", body="""Primary protagonist. Rob lived his
    whole life hated by the people of Shoatwick, the village where he grew
    up. Part of that hatred comes from the fact that he is a bastard, and
    bastards are believed to be natural sons of devils. This hatred is
    finally justified when, in a blind, uncontrolled rage, Rob kills and
    maims several of his boyhood bullies with his bare hands. He has no
    memory of the incident, but several witnesses and his bloody knuckles
    tell a different story. After Shoatwick is raided by a rebel force,
    Rob undertakes a journey to find his birth mother and learn more
    about where he came from, and how he became cursed.""",
                   directory_id=3)

    mercy_manor = Document(title="Mercy Manor", body="""Mercy Manor, located
    on the eastern border of Vilais, is the home of Lady Cateline of House
    Chauvet. It also sits on the western edge of the Defiled Forest, whose
    choking mists often hover over the manor and give it an eerie, ominous
    appearance, much to the delight of its vampire denizens.""",
                           directory_id=4)

    esari_tower = Document(title="Esari Tower", body="""Esari Tower, around
    which the Republic Capital City of Shel Esari was built, is a structure
    surrounded in mystery. It's widely believed to have been constructed by
    the elves, but as they are now extinct and most of their histories lost,
    there is no way to verify that theory. Impossibly tall and with large
    sections of its interior strangely inaccessible, Esari Tower mystifies
    and fascinates all who come to visit. Its topmost levels also serve as
    the apartments of House Kyngeston, ruling family of the Republic of
    Bamora.""",
                           directory_id=4)

    defiled_forest = Document(title="Defiled Forest", body="""The Defiled
    Forest is so named because of the clouds of toxic haze that populate
    much of its deepmost interior. It is also home to the pools of elf-water,
    the substance which grants mages their abilities. Harvesting this liquid
    is an inherently dangerous task thanks to the haze, whose origins are
    unknown. It is said that some magic-related catastrophe occurred here
    during the Great Elf Wars before their eventual extinction.""",
                              directory_id=4)

    the_sentinels = Document(title="The Sentinels", body="""The mercenary
    company that calls itself The Sentinels claims to be a higher order of
    sellswords than its counterparts. While other mercenaries are motivated
    only by coin, The Sentinels are the self-appointed protectors of justice,
    peace, and goodness in all the realm. They have no allegiance to one crown
    or court, and therefore are able to devote themselves wholly to the pursuit
    of protecting the oppressed.

    Their secret purpose, however, is to hunt down and destroy all hellspawn,
    including demons, vampires, and other monsters. The Sentinels believe that
    most of the injustices meted out upon the realm are committed by hellspawn,
    and are committed to eradicating them from the mortal realm forever.""",
                             directory_id=5)

    mages_guild = Document(title="The Mages Guild", body="""Comprised of almost
    exclusively old men addicted to elf-water, the Mages Guild is more of an
    elite club of uber-wealthy nobles than any kind of organization devoted to
    the arcane. With elf-water being so insanely expensive, and the Mages Guild
    being its sole distributor, access to magic is really more determined by
    the size of one's coinpurse than their devotion to study.""",
                           directory_id=5)

    house_kyngeston = Document(title="House Kyngeston", body="""The Kyngestons
    came to power in Bamora after ousting House Skardvaar from the throne.
    Rather than establishing another monarchy under the Kyngeston name, Andrew
    Kyngeston, one of the Skardvaars' most trusted advisors, chose to found a
    republic. With the help of Bamora's most powerful noble houses, they
    created a government that creates an impression upon the people that
    they actually have some form of control over what happens to them.

    This is of course a farce. The Republic of Bamora is only a republic in
    name. In truth, it is closer to an oligarchy, ruled by the Kyngeston
    family with a small margin more input from the noble houses than the
    Skardvaars had. Their colors are emerald and gold, and their sigil is
    a hawk.""",
                               directory_id=6)

    house_pelay = Document(title="House Pelay", body="""House Pelay has been
    the Royal Family of Vilais since it was first organized into a single
    kingdom in the First Epoch. It is currently ruled by King Cyprien IV
    Pelay, who is actually a puppet of the demon king Azgarog. Their colors
    are purple and silver, and their sigil is a serpent.""",
                           directory_id=6)

    republic_of_bamora = Document(title="The Republic of Bamora", body="""
    Founded only sixty years ago by Andrew I Kyngeston, the Republic is the
    youngest sovereignty in the known world. Its monopoly on elf-water has
    given it a significant economic edge over its neighbors, which has in
    turn led to a military hegemony that cannot be matched.""",
                                  directory_id=7)

    ghaskos = Document(title="Ghaskos", body="""The ancestral home of House
    Skardvaar is frigid and unforgiving, and its inhabitants even more so.
    After the fall of the Skardvaars, Ghaskos had no centralized leadership
    to speak of, and is now divided into often fraught tribal territories.""",
                       directory_id=7)

    oshnul_islands = Document(title="Oshnul Islands", body="""Sailors avoid the
    Oshnul Islands at all costs thanks to the brutality and aggression of their
    inhabitants, the orcs. Rarely seen outside of their chain of islands--
    except in Sercish fishing villages during raiding season--orcs consider all
    who trespass on their islands to be enemies.""",
                              directory_id=7)

    db.session.add(azgarog)
    db.session.add(sivis)
    db.session.add(rob)
    db.session.add(mercy_manor)
    db.session.add(esari_tower)
    db.session.add(defiled_forest)
    db.session.add(the_sentinels)
    db.session.add(mages_guild)
    db.session.add(house_kyngeston)
    db.session.add(house_pelay)
    db.session.add(republic_of_bamora)
    db.session.add(ghaskos)
    db.session.add(oshnul_islands)
    db.session.commit()


def undo_documents():
    db.session.execute("TRUNCATE documents;")
    db.session.commit()

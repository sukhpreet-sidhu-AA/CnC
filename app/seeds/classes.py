from app.models import db, Class, environment, SCHEMA
from sqlalchemy.sql import text

def seed_classes():
    barbarian = Class(
        name = 'Barbarian', hit_die = 12, hp_modifier = 7
    )
    bard = Class(
        name = 'Bard', hit_die = 8, hp_modifier = 5
    )
    cleric = Class(
        name = 'Cleric', hit_die = 8, hp_modifier = 5
    )
    druid = Class(
        name = 'Druid', hit_die = 8, hp_modifier = 5
    )
    fighter = Class(
        name = 'Fighter', hit_die = 10, hp_modifier = 6
    )
    monk = Class(
        name = 'Monk', hit_die = 8, hp_modifier = 5
    )
    paladin = Class(
        name = 'Paladin', hit_die = 10, hp_modifier = 6
    )
    ranger = Class(
        name = 'Ranger', hit_die = 10, hp_modifier = 6
    )
    rogue = Class(
        name = 'Rogue', hit_die = 8, hp_modifier = 5
    )
    sorcerer = Class(
        name = 'Sorcerer', hit_die = 6, hp_modifier = 4
    )
    warlock = Class(
        name = 'Warlock', hit_die = 8, hp_modifier = 5
    )
    wizard = Class(
        name = 'Wizard', hit_die = 6, hp_modifier = 4
    )

    lst = [barbarian, bard, cleric, druid, fighter, monk, paladin, ranger, rogue, sorcerer, warlock, wizard]
    for class_ in lst:
        db.session.add(class_)
    db.session.commit()

def undo_classes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM classes"))
        
    db.session.commit()
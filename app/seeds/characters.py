from app.models import db, Character, environment, SCHEMA
from sqlalchemy.sql import text

def seed_characters():
    char1 = Character(
        user_id = 1,
        campaign_id = 1,
        hp = 14,
        class_id = 1,
        race_id = 6,
        strength = 17,
        dexterity = 13,
        constitution = 15,
        intelligence = 10,
        wisdom = 10,
        charisma = 10,
        name = "Tiny",
        description = "This is half-orc barbarian called tiny caused hes not quite as big as a normal orc",
        alignment = "Chaotic Good",
        heroic_inspiration = False
    )

    char2 = Character(
        user_id = 1,
        campaign_id = None,
        hp = 14,
        class_id = 1,
        race_id = 6,
        strength = 17,
        dexterity = 13,
        constitution = 15,
        intelligence = 10,
        wisdom = 10,
        charisma = 10,
        name = "Tiny 2",
        description = "Carbon copy of another guy",
        alignment = "Chaotic Good",
        heroic_inspiration = False
    )

    char3 = Character(
        user_id = 2,
        campaign_id = 2,
        hp = 14,
        class_id = 2,
        race_id = 4,
        strength = 15,
        dexterity = 13,
        constitution = 15,
        intelligence = 10,
        wisdom = 10,
        charisma = 10,
        name = "Sid",
        description = "What a dude",
        alignment = "Chaotic Good",
        heroic_inspiration = False
    )

    char4 = Character(
        user_id = 3,
        campaign_id = 2,
        hp = 14,
        class_id = 1,
        race_id = 6,
        strength = 17,
        dexterity = 13,
        constitution = 15,
        intelligence = 10,
        wisdom = 10,
        charisma = 10,
        name = "Karm",
        description = "This guy is grey and huge",
        alignment = "Chaotic Good",
        heroic_inspiration = False
    )

    db.session.add(char1)
    db.session.add(char2)
    db.session.add(char3)
    db.session.add(char4)
    db.session.commit()


def undo_characters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM characters"))
        
    db.session.commit()
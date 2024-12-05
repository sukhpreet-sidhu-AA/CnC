from app.models import db, Campaign, environment, SCHEMA
from sqlalchemy.sql import text

def seed_campaigns():
    camp1 = Campaign(
        name = 'test campaign',
        description = 'This is a test campaign',
        user_id = 2
    )

    camp2 = Campaign(
        name = 'Lost Mine of Phandelver',
        description = "In Lost Mine of Phandelver, adventurers seek a lost mine rich with magic in the frontier town of Phandalin. They face goblins, bandits, and a sinister mage who seeks to control the mine's power for evil purposes.",
        user_id = 1
    )

    camp3 = Campaign(
        name = 'Curse of Strahd',
        description = 'In Curse of Strahd, adventurers are trapped in Barovia, a cursed land ruled by the vampire lord Strahd von Zarovich. They must uncover dark secrets, face undead horrors, and confront Strahd to end his reign and escape his shadowy domain.',
        user_id = 1
    )

    db.session.add(camp1)
    db.session.add(camp2)
    db.session.add(camp3)
    db.session.commit()


def undo_campaigns():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM campaigns"))
        
    db.session.commit()
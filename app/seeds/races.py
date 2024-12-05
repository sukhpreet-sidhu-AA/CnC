from app.models import db, Race, environment, SCHEMA
from sqlalchemy.sql import text

def seed_races():
    dragonborn = Race(
        name = "Dragonborn" , speed = 30, strength_modifier = 2 , dexterity_modifier = 0 , constitution_modifier = 0 , intelligence_modifier = 0 , wisdom_modifier = 0 , charisma_modifier = 1 
    )
    dwarf = Race(
        name = "Dwarf" , speed = 25, strength_modifier = 2 , dexterity_modifier = 0 , constitution_modifier = 2 , intelligence_modifier = 0 , wisdom_modifier = 0 , charisma_modifier = 0 
    )
    elf = Race(
        name = "Elf" , speed = 30, strength_modifier = 0 , dexterity_modifier = 2 , constitution_modifier = 0 , intelligence_modifier = 0 , wisdom_modifier = 1 , charisma_modifier = 0 
    )
    gnome = Race(
        name = "Gnome" , speed = 25, strength_modifier = 0 , dexterity_modifier = 1 , constitution_modifier = 0 , intelligence_modifier = 2 , wisdom_modifier = 0 , charisma_modifier = 0 
    )
    half_elf = Race(
        name = "Half-Elf" , speed = 30, strength_modifier = 0 , dexterity_modifier = 1 , constitution_modifier = 0 , intelligence_modifier = 0 , wisdom_modifier = 0 , charisma_modifier = 2 
    )
    half_orc = Race(
        name = "Half-Orc" , speed = 30, strength_modifier = 2 , dexterity_modifier = 0 , constitution_modifier = 1 , intelligence_modifier = 0 , wisdom_modifier = 0 , charisma_modifier = 0 
    )
    halfling = Race(
        name = "Halfling" , speed = 25, strength_modifier = 0 , dexterity_modifier = 2 , constitution_modifier = 0 , intelligence_modifier = 0 , wisdom_modifier = 0 , charisma_modifier = 1 
    )
    human = Race(
        name = "Human" , speed = 30, strength_modifier = 1 , dexterity_modifier = 1 , constitution_modifier = 1 , intelligence_modifier = 1 , wisdom_modifier = 1 , charisma_modifier = 1 
    )
    tiefling = Race(
        name = "Tiefling" , speed = 30, strength_modifier = 0 , dexterity_modifier = 0 , constitution_modifier = 0 , intelligence_modifier = 1 , wisdom_modifier = 0 , charisma_modifier = 2
    )

    lst = [dragonborn, dwarf, elf, gnome, half_elf, half_orc, halfling, human, tiefling]
    for race in lst:
        db.session.add(race)
    db.session.commit()


def undo_races():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM races"))
        
    db.session.commit()
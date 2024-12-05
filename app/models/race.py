from .db import db, environment, SCHEMA

class Race(db.Model):
    __tablename__ = 'races'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    speed = db.Column(db.Integer)
    strength_modifier = db.Column(db.Integer)
    dexterity_modifier = db.Column(db.Integer)
    constitution_modifier = db.Column(db.Integer)
    intelligence_modifier = db.Column(db.Integer)
    wisdom_modifier = db.Column(db.Integer)
    charisma_modifier = db.Column(db.Integer)

    characters = db.relationship("Character", back_populates="race")

    def to_dict_basic(self):
        return{
            'id':self.id,
            'name':self.name,
            'speed':self.speed,
            'strength_modifier':self.strength_modifier,
            'dexterity_modifier':self.dexterity_modifier,
            'constitution_modifier':self.constitution_modifier,
            'intelligence_modifier':self.intelligence_modifier,
            'wisdom_modifier':self.wisdom_modifier,
            'charisma_modifier':self.charisma_modifier
        }
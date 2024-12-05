from .db import db, environment, SCHEMA

class Class(db.Model):
    __tablename__ = 'classes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    hit_die = db.Column(db.Integer)
    hp_modifier = db.Column(db.Integer)

    characters = db.relationship("Character", back_populates="class_")

    def to_dict_basic(self):
        return{
            'id':self.id,
            'name':self.name,
            'hit_die':self.hit_die,
            'hp_modifier':self.hp_modifier
        }
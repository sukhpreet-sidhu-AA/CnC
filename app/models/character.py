from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Character(db.Model):
    __tablename__ = "characters"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    campaign_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("campaigns.id")), nullable=True)
    hp = db.Column(db.Integer)
    class_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("classes.id")), nullable=False)
    race_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("races.id")), nullable=False)
    strength = db.Column(db.Integer)
    dexterity = db.Column(db.Integer)
    constitution = db.Column(db.Integer)
    intelligence = db.Column(db.Integer)
    wisdom = db.Column(db.Integer)
    charisma = db.Column(db.Integer)
    name = db.Column(db.String)
    description = db.Column(db.String, nullable=True)
    alignment = db.Column(db.String)
    heroic_inspiration = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship("User", back_populates="characters")
    campaigns = db.relationship("Campaign", back_populates="characters")
    class_ = db.relationship("Class", back_populates="characters")
    race = db.relationship("Race", back_populates="characters")

    
    def to_dict_basic(self):
        return{
            'id':self.id,
            'user_id':self.user_id,
            'campaign_id':self.campaign_id,
            'hp':self.hp,
            'class_id':self.class_id,
            'race_id':self.race_id,
            'strength':self.strength,
            'dexterity':self.dexterity,
            'constitution':self.constitution,
            'intelligence':self.intelligence,
            'wisdom':self.wisdom,
            'charisma':self.charisma,
            'name':self.name,
            'description':self.description,
            'alignment':self.alignment,
            'heroic_inspiration':self.heroic_inspiration
        }
    
    def to_dict(self):
        if self.campaigns:
            return{
            **self.to_dict_basic(),
            "User":self.user.to_dict_basic(),
            "Campaign":self.campaigns.to_dict_basic(),
            "Class":self.class_.to_dict_basic(),
            "Race":self.race.to_dict_basic()
            }
        else:
            return{
            **self.to_dict_basic(),
            "User":self.user.to_dict_basic(),
            "Campaign": None,
            "Class":self.class_.to_dict_basic(),
            "Race":self.race.to_dict_basic()
            }
        
        
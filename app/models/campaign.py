from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Campaign(db.Model):
    __tablename__ = "campaigns"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship("User", back_populates="campaigns")
    characters = db.relationship("Character", back_populates="campaigns")
    
    def to_dict_basic(self):
        return{
            'id':self.id,
            'name':self.name,
            'description':self.description,
            'user_id':self.user_id,
            'created':self.created_at
        }
    
    def to_dict(self):
        return{
            **self.to_dict_basic(),
            "User":self.user.to_dict_basic(),
            "Characters":[character.to_dict() for character in self.characters]
        }
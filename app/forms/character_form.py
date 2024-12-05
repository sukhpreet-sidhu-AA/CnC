from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

class CharacterForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=60)])
    description = StringField('description', validators=[DataRequired(), Length(max=255)])
    strength = IntegerField('strength', validators=[DataRequired(), NumberRange(min=8, max=20)])
    dexterity = IntegerField('dexterity', validators=[DataRequired(), NumberRange(min=8, max=20)])
    constitution = IntegerField('constitution', validators=[DataRequired(), NumberRange(min=8, max=20)])
    intelligence = IntegerField('intelligence', validators=[DataRequired(), NumberRange(min=8, max=20)])
    wisdom = IntegerField('wisdom', validators=[DataRequired(), NumberRange(min=8, max=20)])
    charisma = IntegerField('charisma', validators=[DataRequired(), NumberRange(min=8, max=20)])
    class_id = IntegerField('class_id', validators=[DataRequired()])
    race_id = IntegerField('race_id', validators=[DataRequired()])
    alignment = StringField('alignment', validators=[DataRequired()])

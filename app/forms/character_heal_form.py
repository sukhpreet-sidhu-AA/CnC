from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import NumberRange

class CharacterHealForm(FlaskForm):
    hp = IntegerField('hp', validators=[NumberRange(min=0)])
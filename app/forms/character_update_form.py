from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class CharacterUpdateForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=60)])
    description = StringField('description', validators=[DataRequired(), Length(max=255)])
    alignment = StringField('alignment', validators=[DataRequired()])

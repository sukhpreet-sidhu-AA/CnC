from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, Length

class CampaignAddCharacterForm(FlaskForm):
    campaign_id = IntegerField('campaign_id')
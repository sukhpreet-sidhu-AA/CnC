from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Campaign, db
from app.forms import CampaignForm

campaign_routes = Blueprint('campaign', __name__)

def format_errors(validation_errors):
    errorMessages = dict()

    for field in validation_errors:
        errorMessages[field] = [error for error in validation_errors[field]]

    return errorMessages

@campaign_routes.route('')
@login_required
def campaigns():
    campaigns = Campaign.query.filter(Campaign.user_id == current_user.id).all()
    campaign_holder = {}
    for campaign in campaigns:
        campaign_holder[campaign.id] = campaign.to_dict()
    return campaign_holder

@campaign_routes.route('/<int:id>')
@login_required
def campaign(id):
    campaign = Campaign.query.get(id)
    if not campaign:
        return {"errors": "Campaign not found"}
    
    return campaign.to_dict()

@campaign_routes.route('/new', methods=['POST'])
@login_required
def new_campaign():
    form = CampaignForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        campaign = Campaign(
            name = form.data['name'],
            description = form.data['description'],
            user_id = current_user.id,
        )
        db.session.add(campaign)
        db.session.commit()
        return campaign.to_dict()
    return form.errors, 401

@campaign_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_campaign(id):
    form = CampaignForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    campaign = Campaign.query.get(id)

    if not campaign:
        return {"errors": "Campaign not found"}
    
    if campaign.user_id != current_user.id:
        return{"errors": "You don't own this campaign"}, 500
    
    if form.validate_on_submit():
        form.populate_obj(campaign)
        db.session.commmit()
        return campaign.to_dict()
    
    if form.errors:
        return {"errors": format_errors(form.errors)}, 400


@campaign_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_campaign(id):
    campaign = Campaign.query.get(id)

    if not campaign:
        return {"errors": "Campaign not found"}

    if campaign.user_id != current_user.id:
        return {"errors": "You don't own this campaign"}, 500
    
    else:
        db.session.delete(campaign)
        db.session.commit()
        return {"Message": "Campaign successfully deleted"}
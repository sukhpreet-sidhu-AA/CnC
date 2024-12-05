from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Character, db, Class, Race
from app.forms import CharacterForm
from app.forms import CharacterHealForm
from app.forms import CharacterUpdateForm
from app.forms import CampaignAddCharacterForm
import math

character_routes = Blueprint('character', __name__)

def format_errors(validation_errors):
    errorMessages = dict()

    for field in validation_errors:
        errorMessages[field] = [error for error in validation_errors[field]]

    return errorMessages

@character_routes.route('')
@login_required
def get_all_user_characters():
    characters = Character.query.filter(Character.user_id == current_user.id).all()
    character_holder={}
    for character in characters:
        character_holder[character.id] = character.to_dict()
    return character_holder

@character_routes.route('/<int:id>')
@login_required
def get_character(id):
    character = Character.query.get(id)

    if not character:
        return {"errors": "Character does not exist"}
    
    return character.to_dict()

@character_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_character(id):
    character = Character.query.get(id)
    form = CharacterUpdateForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if not character:
        return {"errors": "Character does not exist"}, 404

    if character.user_id != current_user.id:
        return {"errors": "This character doesn't belong to you"}, 401
    
    if form.validate_on_submit():
        form.populate_obj(character)
        db.session.commit()
        return character.to_dict()

    if form.errors:
        return {"errors": format_errors(form.errors)}, 400
    

@character_routes.route('/<int:id>/hp', methods=['PUT'])
@login_required
def character_hp_change(id):
    character = Character.query.get(id)
    form = CharacterHealForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        character.hp = form.data['hp']
        db.session.commit()
        return character.to_dict()
    
    if form.errors:
        return {"errors": format_errors(form.errors)}, 400
    

@character_routes.route('/<int:id>/campaign', methods=['PUT'])
@login_required
def character_add_campaign(id):
    character = Character.query.get(id)
    form = CampaignAddCharacterForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        if form.data['campaign_id'] == 0:
            character.campaign_id = None
            db.session.commit()
            return character.to_dict()
        else:
            character.campaign_id = form.data['campaign_id']
            db.session.commit()
            return character.to_dict()

    if form.errors:
        return {"errors": format_errors(form.errors)}, 400

@character_routes.route('/new', methods=['POST'])
@login_required
def create_character():
    form = CharacterForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    hit_die = Class.query.get((form.data["class_id"])).hit_die
    con_modifier = math.floor((form.data["constitution"] - 10)/2)

    if form.validate_on_submit():
        character = Character(
            user_id = current_user.id,
            campaign_id = None,
            hp = hit_die + con_modifier,
            class_id = form.data["class_id"],
            race_id = form.data["race_id"],
            strength = form.data["strength"],
            dexterity = form.data["dexterity"],
            constitution = form.data["constitution"],
            intelligence = form.data["intelligence"],
            wisdom = form.data["wisdom"],
            charisma = form.data["charisma"],
            name = form.data['name'],
            description = form.data['description'],
            alignment = form.data['alignment'],
            heroic_inspiration = False
        )
        db.session.add(character)
        db.session.commit()
        return character.to_dict(), 201
    
    return {"errors": format_errors(form.errors)}, 400

@character_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_character(id):
    character = Character.query.get(id)
    print(character, flush=True)


    if not character:
        return {"errors": "Character cannot be found"}, 404

    if character.user_id != current_user.id:
        return {"errors", "User does not own this character"}, 401
    
    db.session.delete(character)
    db.session.commit()
    return {"Message": "successfully deleted"}


    
    
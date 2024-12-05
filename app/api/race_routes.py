from flask import Blueprint
from app.models import Race

race_routes = Blueprint('races', __name__)

@race_routes.route('')
def races():
    races = Race.query.all()
    races_normalized = {}
    for race in races:
        races_normalized[race.id] = race.to_dict_basic()
    return races_normalized

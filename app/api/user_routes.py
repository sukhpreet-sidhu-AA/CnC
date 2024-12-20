from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<string:username>')
@login_required
def user_search(username):
    user = User.query.filter(User.username == username).one_or_none()
    # print("================================", user, flush='true')
    if(user):
        if (len(user.to_dict()["Characters"]) == 0):
            return {"error":"User has no characters"}
        else:
            return user.to_dict()
    else:
        return {"error":"Username does not exist"}

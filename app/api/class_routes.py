from flask import Blueprint
from app.models import Class

class_rotues = Blueprint('classes', __name__)

@class_rotues.route('')
def classes():
    classes = Class.query.all()
    classes_normalized = {}
    for c in classes:
        classes_normalized[c.id] = c.to_dict_basic()
    return classes_normalized


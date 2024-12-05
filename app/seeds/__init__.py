from flask.cli import AppGroup
from .users import seed_users, undo_users
from .races import seed_races, undo_races
from .classes import seed_classes, undo_classes
from .characters import seed_characters, undo_characters
from .campaigns import seed_campaigns, undo_campaigns

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_classes()
        undo_races()
        undo_characters()
        undo_campaigns()
    seed_users()
    seed_classes()
    seed_races()
    seed_characters()
    seed_campaigns()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_classes()
    undo_races()
    undo_characters()
    undo_campaigns()
    # Add other undo functions here

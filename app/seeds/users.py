from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', email='demo@aa.io', password='password', first_name='Demo', last_name='User')
    sukhpreet = User(
        username='sukhpreet94', email='sukhpreet@aa.io', password='password', first_name='Sukhpreet', last_name='Sidhu')
    mark = User(
        username='mark22', email='mark@aa.io', password='password', first_name='Mark', last_name='Tester'
    )

    db.session.add(demo)
    db.session.add(sukhpreet)
    db.session.add(mark)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
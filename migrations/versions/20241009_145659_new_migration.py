"""New migration

Revision ID: e1c319f3ac40
Revises: 
Create Date: 2024-10-09 14:56:59.401272

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'e1c319f3ac40'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('classes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('hit_die', sa.Integer(), nullable=True),
    sa.Column('hp_modifier', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE classes SET SCHEMA {SCHEMA};")
    
    op.create_table('races',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('speed', sa.Integer(), nullable=True),
    sa.Column('strength_modifier', sa.Integer(), nullable=True),
    sa.Column('dexterity_modifier', sa.Integer(), nullable=True),
    sa.Column('constitution_modifier', sa.Integer(), nullable=True),
    sa.Column('intelligence_modifier', sa.Integer(), nullable=True),
    sa.Column('wisdom_modifier', sa.Integer(), nullable=True),
    sa.Column('charisma_modifier', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    
    if environment == "production":
        op.execute(f"ALTER TABLE races SET SCHEMA {SCHEMA};")
    
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    # sa.Column('first_name', sa.String(length=50), nullable=False),
    # sa.Column('last_name', sa.String(length=50), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    
    op.create_table('campaigns',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    
    if environment == "production":
        op.execute(f"ALTER TABLE campaigns SET SCHEMA {SCHEMA};")
    
    op.create_table('characters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('campaign_id', sa.Integer(), nullable=True),
    sa.Column('hp', sa.Integer(), nullable=True),
    sa.Column('class_id', sa.Integer(), nullable=False),
    sa.Column('race_id', sa.Integer(), nullable=False),
    sa.Column('strength', sa.Integer(), nullable=True),
    sa.Column('dexterity', sa.Integer(), nullable=True),
    sa.Column('constitution', sa.Integer(), nullable=True),
    sa.Column('intelligence', sa.Integer(), nullable=True),
    sa.Column('wisdom', sa.Integer(), nullable=True),
    sa.Column('charisma', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('alignment', sa.String(), nullable=True),
    sa.Column('heroic_inspiration', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['campaign_id'], ['campaigns.id'], ),
    sa.ForeignKeyConstraint(['class_id'], ['classes.id'], ),
    sa.ForeignKeyConstraint(['race_id'], ['races.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE characters SET SCHEMA {SCHEMA};")
    
    # ### end Alembic commands ###



def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('characters')
    op.drop_table('campaigns')
    op.drop_table('users')
    op.drop_table('races')
    op.drop_table('classes')
    # ### end Alembic commands ###

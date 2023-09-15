"""empty message

Revision ID: a2b531a02e3b
Revises: 
Create Date: 2023-09-14 14:20:43.687272

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a2b531a02e3b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('main_categories',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('subcategories',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('main_category_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['main_category_id'], ['main_categories.id'], name=op.f('fk_subcategories_main_category_id_main_categories')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('activities',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('subcategory_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['subcategory_id'], ['subcategories.id'], name=op.f('fk_activities_subcategory_id_subcategories')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('activities')
    op.drop_table('subcategories')
    op.drop_table('main_categories')
    # ### end Alembic commands ###
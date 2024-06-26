"""add completed col to orders

Revision ID: d4f7913ecea6
Revises: b49bde7bace5
Create Date: 2024-05-31 09:24:44.042475

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd4f7913ecea6'
down_revision = 'b49bde7bace5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('completed', sa.Boolean(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.drop_column('completed')

    # ### end Alembic commands ###

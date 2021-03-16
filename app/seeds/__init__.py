from flask.cli import AppGroup
from .users import seed_users, undo_users
from .directories import seed_directories, undo_directories
from .documents import seed_documents, undo_documents


seed_commands = AppGroup("seed")


@seed_commands.command("all")
def seed():
    seed_users()
    seed_directories()
    seed_documents()


@seed_commands.command("undo")
def undo():
    undo_users()
    undo_directories()
    undo_documents()

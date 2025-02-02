from flask import Blueprint

reorderBlueprint = Blueprint('blueprintt', __name__)

reorderBlueprint.route('/', methods=['GET'])(getData)
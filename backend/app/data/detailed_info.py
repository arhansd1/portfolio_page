# Get the directory of the current script to resolve relative paths
import os
import json

base_path = os.path.dirname(__file__)

def load_data(relative_path):
    full_path = os.path.join(base_path, relative_path)
    with open(full_path, 'r', encoding='utf-8') as file:
        return json.load(file)

# Load all data into a single dictionary
detailed_info = {
    "det_experience": load_data('../../../frontend/src/data/detailed/detailed_experience.json'),
    "det_projects": load_data('../../../frontend/src/data/detailed/detailed_projects.json')
    }
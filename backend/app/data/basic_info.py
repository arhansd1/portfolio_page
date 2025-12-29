# Get the directory of the current script to resolve relative paths
import os
import json

base_path = os.path.dirname(__file__)

def load_data(relative_path):
    full_path = os.path.join(base_path, relative_path)
    with open(full_path, 'r', encoding='utf-8') as file:
        return json.load(file)

# Load all data into a single dictionary
basic_info = {
    "personal_info": load_data('../../../frontend/src/data/personal_info.json'),
    "experience": load_data('../../../frontend/src/data/experience.json'),
    "projects": load_data('../../../frontend/src/data/projects.json'),
    "skills": load_data('../../../frontend/src/data/skills.json')
}
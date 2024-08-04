# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

# Run from the root of the project directory

import json
import os


def clean_ignore_paths(json_file_path):
    # Load the knip.json file
    with open(json_file_path, "r") as file:
        knip_data = json.load(file)

    # Check if "ignore" key exists
    if "ignore" not in knip_data:
        print(f'No "ignore" key found in {json_file_path}')
        return

    # Get the list of ignored paths
    ignore_paths = knip_data["ignore"]

    # Filter out paths that do not exist
    valid_paths = [path for path in ignore_paths if os.path.exists(path)]

    # Update the "ignore" array in knip_data
    knip_data["ignore"] = valid_paths

    # Save the modified knip.json file
    with open(json_file_path, "w") as file:
        json.dump(knip_data, file, indent=4)

    print(f"Cleaned up ignore paths in {json_file_path}")


# Example usage
json_file_path = "knip.json"
clean_ignore_paths(json_file_path)

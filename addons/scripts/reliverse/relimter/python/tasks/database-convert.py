# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

import re

# todo: unfinished

# This script converts the schema file from one database to another.
# It is used to convert MySQL schema to PostgreSQL and vice versa.


def convert_schema(input_file, output_file, from_db, to_db):
    # Basic data type mappings
    type_mappings = {
        "mysql": {"text": "varchar", "timestamp": "timestamp"},
        "pgsql": {"varchar": "text", "timestamp": "timestamp"},
    }

    def convert_line(line, from_db, to_db):
        # Regex pattern to match column definitions
        pattern = r"(\w+)\s*\((\w+)\)"
        match = re.search(pattern, line)
        if match:
            data_type = match.group(2)
            if data_type in type_mappings[from_db]:
                converted_type = type_mappings[from_db][data_type]
                return line.replace(data_type, converted_type)
        return line

    with open(input_file, "r") as file:
        lines = file.readlines()

    with open(output_file, "w") as file:
        for line in lines:
            converted_line = convert_line(line, from_db, to_db)
            file.write(converted_line)


# Example usage
convert_schema("mysql.ts", "pgsql.ts", "mysql", "pgsql")

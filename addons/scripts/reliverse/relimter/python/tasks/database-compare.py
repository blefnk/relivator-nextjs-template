# ! 🔴 USE AT OWN RISK 🔴 ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !

import re

# todo: unfinished

# This script compares the schemas of the MySQL and PostgreSQL databases.
# It is used to ensure that the schemas are in sync.


def parse_schema(file_content):
    """Parses the schema file to extract table definitions."""
    schema = {}
    table_defs = re.findall(
        r'export const (\w+) = [mp]gTable\("(\w+)", \{([\s\S]*?)\}\);',
        file_content,
    )
    for table_def in table_defs:
        table_name = table_def[1]
        fields = re.findall(
            r'(\w+): (\w+)\("(\w+)"(?:, \{([\s\S]*?)\})?\)', table_def[2]
        )
        schema[table_name] = {
            field[0]: {"type": field[1], "options": field[3]} for field in fields
        }
    return schema


def compare_schemas(schema1, schema2):
    """Compares two schemas and returns the differences."""
    differences = []
    for table in schema1:
        if table not in schema2:
            differences.append(f"Table {table} is missing in the second schema.")
            continue
        for field in schema1[table]:
            if field not in schema2[table]:
                differences.append(
                    f"Field {field} in table {table} is missing in the second schema."
                )
                continue
            if schema1[table][field] != schema2[table][field]:
                differences.append(
                    f"Different definitions for field {field} in table {table}."
                )
    return differences


def main():
    with open("mysql.ts", "r") as file:
        mysql_schema = parse_schema(file.read())

    with open("pgsql.ts", "r") as file:
        pgsql_schema = parse_schema(file.read())

    differences = compare_schemas(mysql_schema, pgsql_schema)
    if differences:
        print("Differences found:")
        for diff in differences:
            print(diff)
    else:
        print("No differences found between the schemas.")


if __name__ == "__main__":
    main()

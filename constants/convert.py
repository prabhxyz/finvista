import csv
import json
def csv_to_array_of_objects(file_path):
    array_of_objects = []
    
    # Open the CSV file
    with open('mock.csv', mode='r') as file:
        # Create a CSV reader
        csv_reader = csv.DictReader(file)
        
        # Iterate over each row in the CSV
        for row in csv_reader:
            # Convert each row to a dictionary and append to the list
            array_of_objects.append(dict(row))
    
    return array_of_objects

# Specify the path to your CSV file
file_path = 'data.csv'

# Convert the CSV to an array of objects
result = csv_to_array_of_objects(file_path)

# Print the result
print(result)

# write the result to a new file
with open('output.json', 'w') as file:
    json.dump(result, file)
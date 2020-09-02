import csv

with open('sample-students.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        for k in row:
            print(k.lstrip('\ufeff'), row[k])



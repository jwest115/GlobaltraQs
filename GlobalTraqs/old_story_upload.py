import csv
from pins.models import pin
import sys


# run the below command in the Django Console while connected to the AWS db
# exec(open('old_story_upload.py').read())

def format_date(date):
    split = date.split("/")
    if len(split) > 1:
        month = split[0]
        day = split[1]
        year = split[2]
        if len(month) == 1:
            month = "0" + month
        if len(day) == 1:
            day = "0" + day
        if month == "00":
            month = "01"
        if day == "00":
            day = "01"
        return year[:4] + "-" + month + "-" + day
    else:
        split = date.split('-')
        if len(split) > 1:
            year = split[0]
            month = split[1]
            day = split[2]
            if len(month) == 1:
                month = "0" + month
            if len(day) == 1:
                day = "0" + day
            if month == "00":
                month = "01"
            if day == "00":
                day = "01"
            return year[:4] + "-" + month + "-" + day


def parse_csv(csv_filename):
    with open(csv_filename, 'rt') as file:
        my_csv_list = csv.reader(file, delimiter=',')
        for row in my_csv_list:
            category = row[0]
            title = row[1]
            description = row[2]
            start_date = row[3]
            end_date = row[4]
            latitude = row[5]
            longitude = row[6]
            date_created = row[7]
            last_edited_date = row[8]
            address = row[9]
            locality = row[10]
            region = row[11]
            country = row[12]
            post_code = row[13]

            # change category type number to match our setup
            if category == "1":
                category = 3
            elif category == "2":
                category = 1
            else:
                category = 2

            # if the address, etc. is not available make it empty string
            if address == "NULL" or address == '':
                address = ""
            if locality == "NULL" or locality == '':
                locality = ""
            if region == "NULL" or region == '':
                region = ""
            if country == "NULL" or country == '':
                country = ""
            if post_code == "NULL" or post_code == '':
                post_code = ""

            # check for null dates
            # date format YYYY-MM-DD or  YYYY-MM-DDThh:mm:ss.uuuuuuZ

            if start_date == "NULL" or start_date == "0000-00-00":
                start_date = None
            else:
                start_date = format_date(start_date)

            if end_date == "NULL" or end_date == "0000-00-00":
                end_date = None
            else:
                end_date = format_date(end_date)

            if date_created == "NULL" or date_created == "0000-00-00":
                date_created = None
            else:
                date_created = format_date(date_created)

            if last_edited_date == "NULL" or last_edited_date == "0000-00-00":
                last_edited_date = None
            else:
                last_edited_date = format_date(last_edited_date)

            print(category)
            print(start_date)
            print(end_date)
            print(date_created)
            print(last_edited_date)
            print(address)
            print(locality)
            print(region)
            print(country)
            print(post_code)

            # "title": "",
            # "description": "",
            # "latitude": null,
            # "longitude": null,
            # "upVotes": null,
            # "startDate": null,
            # "endDate": null,
            # "is_anonymous_pin": false,
            # "postDate": null,
            # "lastEditDate": null,
            # "owner": null,
            # "category": null,
            # "lastPersonEdit": null
            newPin = pin.objects.create(title=title, description=description, latitude=latitude, longitude=longitude,
                                        upVotes=0, startDate=start_date, endDate=end_date, is_anonymous_pin=True,
                                        postDate=date_created, lastEditDate=last_edited_date, category_id=category,
                                        lastPersonEdit=None, address=address, locality=locality, region=region,
                                        country=country, postCode=post_code)
            try:
                newPin.save()
                print("------------------------")

            except:
                print("Unexpected error:", sys.exc_info()[0])
        print("complete.")


parse_csv("story_modified.csv")

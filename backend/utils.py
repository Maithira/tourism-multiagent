import requests

def get_coordinates(place_name):
    url = f"https://nominatim.openstreetmap.org/search?format=json&q={place_name}"
    headers = {
        "User-Agent": "multiagent-tutorial/1.0 (your@email.com)"  # put your email or something here
    }
    response = requests.get(url, headers=headers)
    # Safety: handle failure to get JSON
    try:
        data = response.json()
    except Exception as ex:
        print("Error fetching JSON:", ex)
        print("Response text:", response.text)
        return None, None
    if data:
        lat = data[0]['lat']
        lon = data[0]['lon']
        return lat, lon
    else:
        return None, None


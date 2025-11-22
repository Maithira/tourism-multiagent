import requests

def get_places(lat, lon):
    overpass_url = "https://overpass-api.de/api/interpreter"
    # Overpass QL query to find up to 5 attractions within 5km
    query = f"""
    [out:json][timeout:25];
    (
      node["tourism"="attraction"](around:5000,{lat},{lon});
      way["tourism"="attraction"](around:5000,{lat},{lon});
      relation["tourism"="attraction"](around:5000,{lat},{lon});
    );
    out tags center;
    """
    headers = {
        "User-Agent": "multiagent-tutorial/1.0 (your@email.com)"
    }
    response = requests.post(overpass_url, data=query, headers=headers)
    data = response.json()
    places = set()
    for element in data.get("elements", []):
        name = element.get("tags", {}).get("name")
        if name:
            places.add(name)
        if len(places) >= 5:
            break
    return list(places)

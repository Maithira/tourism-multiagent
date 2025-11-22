import requests

def get_weather(lat, lon):
    url = (
        f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={lat}&longitude={lon}&current_weather=true&hourly=precipitation_probability"
    )
    headers = {
        "User-Agent": "multiagent-tutorial/1.0 (your@email.com)"
    }
    response = requests.get(url, headers=headers)
    data = response.json()
    temp = data["current_weather"]["temperature"]
    rain_prob_list = data["hourly"]["precipitation_probability"]
    if rain_prob_list:
        rain_chance = max(rain_prob_list)
    else:
        rain_chance = 0
    return temp, rain_chance


from flask import Flask, request, jsonify
from agents.weather_agent import get_weather
from agents.places_agent import get_places
from utils import get_coordinates
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route("/tourism")
def tourism():
    place = request.args.get("place", "")
    lat, lon = get_coordinates(place)
    if lat and lon:
        temp, rain_chance = get_weather(lat, lon)
        attractions = get_places(lat, lon)
        return jsonify({
            "temp": temp,
            "rain_chance": rain_chance,
            "attractions": attractions
        })
    else:
        return jsonify({"error": "Sorry, I don't know this place."})

if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask, request, jsonify

app = Flask(__name__)

CITY_INFO = {
    "Bangalore": {
        "temp": "24",
        "rain_chance": "35",
        "attractions": [
            "Lalbagh",
            "Sri Chamarajendra Park",
            "Bangalore palace",
            "Bannerghatta National Park",
            "Jawaharlal Nehru Planetarium"
        ]
    },
    # You can add more cities here in the same format
}

@app.route('/tourism')
def tourism():
    city = request.args.get('place')
    result = CITY_INFO.get(city, None)
    if result:
        return jsonify(result)
    else:
        return jsonify({"error": f"Sorry, no data found for {city}."})

if __name__ == "__main__":
    app.run(debug=True)

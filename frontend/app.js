function parseUserInput(rawInput) {
  // List your supported cities
  const cities = [
    "Bangalore", "Delhi", "Mumbai", "Chennai", "Kolkata", "Bengaluru", "Hyderabad", "Pune", "Ahmedabad",
    "Jaipur", "Lucknow", "Goa", "Agra", "Varanasi", "Mysore", "Kochi", "Amritsar", "Udaipur", "Shimla",
    "Manali", "Rishikesh", "London", "Paris", "New York", "Tokyo", "Sydney", "Berlin", "Rome",
    "San Francisco", "Singapore"
  ];
  let cityFound = "";
  for (const city of cities) {
    const re = new RegExp("\\b" + city + "\\b", "i");
    if (re.test(rawInput)) {
      cityFound = city;
      break;
    }
  }
  let wantsWeather = /temp|weather|climate|hot|cold|rain|degree/i.test(rawInput);
  let wantsPlaces = /place|visit|see|explore|go|attraction|spot/i.test(rawInput);
  // Default: if neither keyword is found, show both
  if (!wantsWeather && !wantsPlaces) wantsWeather = wantsPlaces = true;
  return { city: cityFound, wantsWeather, wantsPlaces };
}

async function getTourismInfo() {
  const rawInput = document.getElementById("placeInput").value;
  const { city, wantsWeather, wantsPlaces } = parseUserInput(rawInput);

  if (!city) {
    document.getElementById("result").innerHTML = "Sorry, couldn't find a city in your request.";
    return;
  }

  document.getElementById("loading").style.display = "block";
  let output = "";
  try {
    const response = await fetch(`http://localhost:5000/tourism?place=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (data.error) {
      output = data.error;
    } else {
      if (wantsWeather) {
        output += `In ${city} it's currently ${data.temp}&deg;C with a chance of ${data.rain_chance}% to rain.<br>`;
      }
      if (wantsPlaces) {
        output += `And these are the places you can go:<br>`;
        output += data.attractions.map(a => `- ${a}`).join("<br>");
      }
    }
  } catch (err) {
    output = "Oops! Could not connect to the server.";
  }
  document.getElementById("loading").style.display = "none";
  document.getElementById("result").innerHTML = output;
}

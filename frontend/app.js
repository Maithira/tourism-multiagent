async function getTourismInfo() {
  const place = document.getElementById("placeInput").value;
  let output = "";
  document.getElementById("loading").style.display = "block";
  try {
    const response = await fetch(`http://localhost:5000/tourism?place=${encodeURIComponent(place)}`);
    const data = await response.json();
    if (data.error) {
      output = data.error;
    } else {
      output = `In ${place}, it's currently ${data.temp}&deg;C with a chance of ${data.rain_chance}% to rain.<br>And these are the places you can go:<br>`;
      output += data.attractions.map(a => `- ${a}`).join("<br>");
    }
  } catch (err) {
    output = "Oops! Could not connect to the server.";
  }
  document.getElementById("loading").style.display = "none";
  document.getElementById("result").innerHTML = output;
}

// Enable Enter-key press
document.getElementById("placeInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    getTourismInfo();
  }
});



async function getTourismInfo() {
  const place = document.getElementById("placeInput").value;
  let output = "";
  document.getElementById("loading").style.display = "block"; // Show spinner
  try {
    const response = await fetch(`http://localhost:5000/tourism?place=${encodeURIComponent(place)}`);
    const data = await response.json();
    if (data.error) {
      output = data.error;
    } else {
      output = `In ${place}, it's currently ${data.temp}&deg;Cwith a chance of ${data.rain_chance}% to rain.\nAnd these are the places you can go:\n`;
      output += data.attractions.map(a => `- ${a}`).join("\n");
    }
  } catch (err) {
    output = "Oops! Could not connect to the server.";
  }
  document.getElementById("loading").style.display = "none"; // Hide spinner
  document.getElementById("result").innerText = output;
}
function quickFill(place) {
  document.getElementById("placeInput").value = place;
}

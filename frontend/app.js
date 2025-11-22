async function getTourismInfo() {
  const place = document.getElementById("placeInput").value;
  const response = await fetch(`http://localhost:5000/tourism?place=${encodeURIComponent(place)}`);
  const data = await response.json();
  let output = `In ${place}, it's currently ${data.temp}°C with a chance of ${data.rain_chance}% to rain.\nAnd these are the places you can go:\n`;
  output += data.attractions.map(a => `- ${a}`).join("\n");
  document.getElementById("result").innerText = output;
  // Run getTourismInfo() when user presses Enter in the input
document.getElementById("placeInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    getTourismInfo();
  }
});




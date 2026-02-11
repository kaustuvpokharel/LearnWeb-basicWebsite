const fs = require("fs");
const path = require("path");

async function loadSightings() {
  const filePath = path.join(__dirname, "..", "data", "sightings.json");
  const data = await fs.promises.readFile(filePath, "utf-8");
  const json = JSON.parse(data);
  return json.sightings;
}

module.exports = { loadSightings };
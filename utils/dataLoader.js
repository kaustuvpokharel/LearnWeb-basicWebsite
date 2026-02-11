const fs = require("fs");
const path = require("path");

async function loadSightings() {
  try {
    const filePath = path.join(__dirname, "..", "data", "sightings.json");
    const data = await fs.promises.readFile(filePath, "utf-8");
    const json = JSON.parse(data);
    return json.sightings;
  } catch (error) {
    console.error("Error loading sightings:", error);
    throw new Error("Failed to load sighting datas");
  }
}

module.exports = { loadSightings };
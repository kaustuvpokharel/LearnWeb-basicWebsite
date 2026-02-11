const express = require("express");
const app = express();
const port = 3000;
const { loadSightings } = require("./utils/dataLoader");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/sightings", async (req, res) => {
  try {
    const sightings = await loadSightings();
    res.json(sightings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/sightings/verified", async (req, res) => {
  try {
    const sightings = await loadSightings();
    const verified = sightings.filter((s) => s.verified === true);
    res.json(verified);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/sightings/species-list", async (req, res) => {
  try {
    const sightings = await loadSightings();
    const names = sightings.map((s) => s.species);
    const unique = [...new Set(names)];
    res.json(unique);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/sightings/habitat/forest", async (req, res) => {
  try {
    const sightings = await loadSightings();
    const forest = sightings.filter((s) => s.habitat === "forest");
    res.json({
      habitat: "forest",
      sightings: forest,
      count: forest.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/sightings/search/eagle", async (req, res) => {
  try {
    const sightings = await loadSightings();
    const eagle = sightings.find((s) =>
      s.species.toLowerCase().includes("eagle")
    );
    res.json(eagle || null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/sightings/find-index/moose", async (req, res) => {
  try {
    const sightings = await loadSightings();
    const index = sightings.findIndex(
      (s) => s.species.toLowerCase() === "moose"
    );
    res.json({
      index: index,
      sighting: index !== -1 ? sightings[index] : null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/sightings/recent", async (req, res) => {
  try {
    const sightings = await loadSightings();
    const sorted = [...sightings].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const recent = sorted.slice(0, 3);
    const result = recent.map((s) => ({
      id: s.id,
      species: s.species,
      location: s.location,
      date: s.date,
      time: s.time,
      observer: s.observer,
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => console.log(`Wildlife Tracker listening on port ${port}!`));
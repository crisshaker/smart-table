const mongoose = require("mongoose");
const Venue = mongoose.model("Venue");

module.exports = app => {
  app.param("venueID", async (req, res, next, id) => {
    try {
      req.venue = await Venue.findById(id);
      return next();
    } catch (err) {
      return res.send(err.message);
    }
  });

  app.get("/api/venue", async (req, res) => {
    try {
      const venues = await Venue.find({});
      return res.json(venues);
    } catch (err) {
      return res.send(err.message);
    }
  });

  app.post("/api/venue", async (req, res) => {
    const { name, capacity } = req.body;

    if (name) {
      try {
        const venue = await Venue.create(req.body);
        return res.json(venue);
      } catch (err) {
        return res.send(err.message);
      }
    } else {
      return res.send("all fields required");
    }
  });

  app.delete("/api/venue/:venueID", async (req, res) => {
    try {
      await req.venue.remove();
      return res.send("removed successfully");
    } catch (err) {
      return res.send(err.message);
    }
  });
};

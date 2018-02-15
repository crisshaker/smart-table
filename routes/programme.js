const mongoose = require("mongoose");
const Programme = mongoose.model("Programme");

module.exports = app => {
  app.param("programmeID", async (req, res, next, id) => {
    try {
      req.programme = await Programme.findById(id);
      return next();
    } catch (err) {
      return res.send(err.message);
    }
  });

  app.get("/api/programme", async (req, res) => {
    try {
      const programmes = await Programme.find({});
      return res.json(programmes);
    } catch (err) {
      return res.send(err.message);
    }
  });

  app.post("/api/programme", async (req, res) => {
    const { name, code } = req.body;

    if (name && code) {
      try {
        const programme = await Programme.create(req.body);
        return res.json(programme);
      } catch (err) {
        return res.send(err.message);
      }
    } else {
      return res.send("all fields required");
    }
  });

  app.delete("/api/programme/:programmeID", async (req, res) => {
    try {
      await req.programme.remove();
      return res.send("removed successfully");
    } catch (err) {
      return res.send(err.message);
    }
  });
};

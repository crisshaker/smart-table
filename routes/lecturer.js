const mongoose = require("mongoose");
const Lecturer = mongoose.model("Lecturer");

module.exports = app => {
  app.param("lecturerID", async (req, res, next, id) => {
    try {
      req.lecturer = await Lecturer.findById(id);
      return next();
    } catch (err) {
      return res.send(err.message);
    }
  });

  app.get("/api/lecturer", async (req, res) => {
    try {
      const lecturers = await Lecturer.find({});
      return res.json(lecturers);
    } catch (err) {
      return res.send(err.message);
    }
  });

  app.post("/api/lecturer", async (req, res) => {
    const { name } = req.body;

    if (name) {
      try {
        const lecturer = await Lecturer.create(req.body);
        return res.json(lecturer);
      } catch (err) {
        return res.send(err.message);
      }
    } else {
      return res.send("all fields required");
    }
  });

  app.delete("/api/lecturer/:lecturerID", async (req, res) => {
    try {
      await req.lecturer.remove();
      return res.send("removed successfully");
    } catch (err) {
      return res.send(err.message);
    }
  });
};

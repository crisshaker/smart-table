const mongoose = require("mongoose");
const Lecture = mongoose.model("Lecture");

module.exports = app => {
  app.param("lectureID", async (req, res, next, id) => {
    try {
      req.lecture = await Lecture.findById(id);
      return next();
    } catch (err) {
      return res.send(err.message);
    }
  });

  app.get("/api/lecture", async (req, res) => {
    try {
      const lectures = await Lecture.find({});
      return res.json(lectures);
    } catch (err) {
      return res.send(err.message);
    }
  });

  app.post("/api/lecture", async (req, res) => {
    const { course, lecturer, duration } = req.body;

    if (course && lecturer && duration) {
      try {
        const lecture = await Lecture.create(req.body);
        return res.json(lecture);
      } catch (err) {
        return res.send(err.message);
      }
    } else {
      return res.send("all fields required");
    }
  });

  app.delete("/api/lecture/:lectureID", async (req, res) => {
    try {
      await req.lecture.remove();
      return res.send("removed successfully");
    } catch (err) {
      return res.send(err.message);
    }
  });

  app.put("/api/lecture/:lectureID", async (req, res) => {
    try {
      req.lecture.update(req.body, function(err, lecture) {
        if (err) return res.send(err.message);
        return res.send(lecture);
      });
    } catch (err) {
      return res.send(err.message);
    }
  });
};

const mongoose = require("mongoose");
const Course = mongoose.model("Course");

module.exports = app => {
  app.param("courseID", async (req, res, next, id) => {
    try {
      req.course = await Course.findById(id);
      return next();
    } catch (err) {
      return res.send(err.message);
    }
  });

  app.get("/api/course", async (req, res) => {
    try {
      const courses = await Course.find({});
      return res.json(courses);
    } catch (err) {
      return res.send(err.message);
    }
  });

  app.post("/api/course", async (req, res) => {
    const { name, code } = req.body;

    if (name && code) {
      try {
        const course = await Course.create(req.body);
        return res.json(course);
      } catch (err) {
        return res.send(err.message);
      }
    } else {
      return res.send("all fields required");
    }
  });

  app.delete("/api/course/:courseID", async (req, res) => {
    try {
      await req.course.remove();
      return res.send("removed successfully");
    } catch (err) {
      return res.send(err.message);
    }
  });
};

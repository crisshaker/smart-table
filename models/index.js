const mongoose = require("mongoose");
const { Schema } = mongoose;

// Lecturer
const LecturerSchema = new Schema({
  name: String
});
mongoose.model("Lecturer", LecturerSchema);

// Course
const CourseSchema = new Schema({
  name: String,
  code: String,
  offeredBy: [Schema.Types.ObjectId]
});
mongoose.model("Course", CourseSchema);

// Venue
const VenueSchema = new Schema({
  name: String,
  capacity: { type: Number, default: 0 }
});
mongoose.model("Venue", VenueSchema);

// Programme
const ProgrammeSchema = new Schema({
  code: String,
  name: String
});
mongoose.model("Programme", ProgrammeSchema);

// Lecture
const LectureSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  lecturer: { type: Schema.Types.ObjectId, ref: "Lecturer" },
  venue: { type: Schema.Types.ObjectId, ref: "Venue" },
  period: String,
  duration: Number
});

LectureSchema.methods.update = function(updates, callback) {
  Object.assign(this, updates);
  this.save(function(err, lecture) {
    if (err) return callback(err);
    return callback(null, lecture);
  });
};

mongoose.model("Lecture", LectureSchema);

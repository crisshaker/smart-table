const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./models");

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/smarttable");
const db = mongoose.connection;
db.on("error", () => console.log("error connecting to the Database"));
db.once("open", () => console.log("Database connection successful"));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./routes/course")(app);
require("./routes/lecturer")(app);
require("./routes/programme")(app);
require("./routes/venue")(app);
require("./routes/lecture")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

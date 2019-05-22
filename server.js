const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

const PORT = process.env.PORT || 5000;

//--------------------------------------
const headerKey = "x-validate";
const apiKey = "cat";
const MIDDLEWARE = (req, res, next) => {
    next();
  if (req.headers[headerKey] === apiKey) {
    return next();
  } else {
    res.sendStatus(404);
  }
};
//--------------------------------------
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(compression());
app.use(MIDDLEWARE);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "True" }));
app.use(express.static(path.join(__dirname, "/sandbox/build")));

//--------------------------------------
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/sandbox/build", "index.html"));
});

//--------------------------------------
app.listen(PORT);
console.log("Listen @ PORT:", PORT);

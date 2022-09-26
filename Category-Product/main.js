const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");

const mongoose = require("mongoose");

const app = express();
dotenv.config({ path: "config/config.env" });

const PORT = process.env.PORT || 3000;
app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set template engine
app.set("view engine", "ejs");

//route prefix
app.use("", require("./routes/routes"));

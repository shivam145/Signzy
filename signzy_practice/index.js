const express = require("express");
const app = express();
const request = require("request");
const mongoConnect = require("./util/getInstance.js").mongoConnect;
const wikiRouter = require("./routes/wiki.js");
const bodyParser = require("body-parser");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", "views");

// app.use(bodyParser.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(wikiRouter);
app.use(express.static(path.join(__dirname, "static")));

mongoConnect(() => {
    console.log("Server Started");
    app.listen(3000);
});

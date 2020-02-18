var express = require("express");
var app = express();
var url = require("url");
var express = require("express");
var session = require("cookie-session"); // Loads the piece of middleware for sessions
var bodyParser = require("body-parser"); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(session({ secret: "todotopsecret", name: "session" }));
app.use(urlencodedParser);

app.get("/todo", function(req, res) {
    res.setHeader("200", "Content-Type", "text/html");
    res.render("bedroom.ejs", {
        tasks: req.session.tasks || []
    });
    res.end();
});

app.post("/todo/add", function(req, res) {
    req.session.tasks = req.session.tasks || [];
    req.session.tasks.push(req.body.task);

    console.log(req.session.tasks);
    res.redirect("/todo");
    res.end();
});

app.get("/todo/delete/:id", function(req, res) {
    req.session.tasks.splice(req.params.id, 1);
    res.redirect("/todo");
    res.end();
});

app.get("/todo/reset", function(req, res) {
    req.session = null;
    res.redirect("/todo");
    res.end();
});

app.listen(8080, () => console.log("Running at http://localhost:8080"));

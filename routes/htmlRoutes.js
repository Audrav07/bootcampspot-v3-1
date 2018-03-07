var fs = require('fs');
var path = require('path');
module.exports = function(app) {
    //render the maimn html page/
    app.get("/", function(req, res) {
        //this will show the session object
        console.log(req.session.user);
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/attendance", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/attendance.html"));
    });

    app.get("/calendar", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/calendar.html"));
    });

    app.get("/class", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/class.html"));
    });

    app.get("/contact", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/contact.html"));
    });

    app.get("/landing", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/landing.html"));
    });

    // If no matching route is found default to home
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};
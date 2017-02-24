var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
mongodb.MongoClient.connect(process.env.MONGODB_URI, (err, database)=> {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse
    db = database;
    console.log("Database connection ready");

    // Initialize the app
    var server = app.listen(process.env.PORT || 8080, () => {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/**
 *  "/api/events"
 *      GET: finds all events
 *      POST: creates a new event
 */

app.get("/api/events", (req, res) => {
    db.collection(CONTACTS_COLLECTION).find({}).toArray((err, docs) => {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(docs);
        }
    })
});

app.post("/api/events", (req, res) => {
    let newEvent = req.body;

    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name", 400);
    }

    db.collection(CONTACTS_COLLECTION).insertOne(newEvent, (err, doc) => {
        if (err) {
            handleError(res, err.message, "Failes to create new contact.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

/**
 *  "/api/organizers"
 *      GET: find organizer by id
 *      PUT: update organizer by id
 *      DELETE: deletes organizer by id
 */

app.get("/api/organizers/:id", (req, res) => {

});

app.put("/api/organizers/:id", (req, res) => {

});

app.delete("/api/organizers/:id", (req, res) => {

});

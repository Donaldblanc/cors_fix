// Require/import the HTTP module
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var axios = require("axios")
var fs = require("fs");
require("dotenv").config();

// Define a port to listen for incoming requests
var PORT = process.env.PORT || 8080;

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

var router = express.Router();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post("/cors", function (req, res) {
    console.log(req.body.url)

    if (req.body.key === process.env.CORS_API_KEY) {

        if (req.body.method && req.body.method == "POST") {
            axios.post(req.body.url, req.body.data)
                .then(function (response) {
                    res.json(response.data)
                })
                .catch(function (error) {
                    res.status(500).end();
                });
        } else {
            axios.get(req.body.url)
                .then(function (response) {
                    res.json(response.data)
                })
                .catch(function (error) {
                    res.status(500).end();
                });
        }
    } else {
        res.end("Invalid API Key");
    }
})

app.use(router)

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {

    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});
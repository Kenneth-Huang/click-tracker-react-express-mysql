import connection from './connect-db';

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 8000;
const app = express();
app.use(cors(), bodyParser.urlencoded({ extended: true }), bodyParser.json());

app.listen(PORT, console.log(`Server is listening on ${PORT}`));

app.get("/", (req, res) => {
	res.send("Hello world!");
});


app.get("/tracks", (req, res) => {
	const SELECT_ALL_TRACKS_QUERY = "SELECT * FROM position_tracker.tracks";
	connection.query(SELECT_ALL_TRACKS_QUERY, (err, results) => {
	if (err) {
		console.log("err");
		return res.send(err);
	}
	return res.json({
		data: results
	});
	});
});

app.post("/tracks", function(req, res) {
	const jsondata = req.body.data;
	const values = jsondata.map(d => [d.colour, d.x, d.y]);
	connection.query(
	"INSERT INTO tracks (colour, x, y) VALUES ?",
	[values],
	function(err, result) {
		if (err) {
		res.send("Error");
		} else {
		res.send("Success");
		}
	}
	);
});
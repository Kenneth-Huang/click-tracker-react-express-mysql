const mysql = require("mysql");
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "position_tracker"
});

connection.connect(err => {
	if (err) {
	console.log("err:" + err);
	return err;
	}
	console.log("Connected to MySQL");
});

// console.log(connection);
module.exports = connection;

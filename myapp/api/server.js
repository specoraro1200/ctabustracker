const express = require("express")
const app = express()
const cors = require("cors")
var mysql = require('mysql');
var con = mysql.createConnection({
	host: "buses.cfai3nm0tmno.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "password",
	port: 3306,
	database: "Buses"

});

// function connect(){
// 	con.connect(function(err) {
// 		if (err) throw err;
// 		console.log("Connected!");
// 	});
// }
// connect()
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://127.0.0.1:27017";

app.use(cors())


app.get("/", function(req, res) {
	var request = require('request');
	request('http://www.ctabustracker.com/bustime/api/v2/getroutes?key=Ph2VjWCh3hRRKyqERyPYdYLjs&format=json', function (error, response, body) {
		if (!error && response.statusCode === 200) {
			res.send(body) // Should be json format
		}
	})
})


app.get("/delay", function(req, res) {
		con.query("select (sum(dly) / count(dly)*100) as 'PercentLate', vid from Status group by vid order by PercentLate;", function (err, result, fields) {
		  if (err) connect();
		  console.log(result);
		});
})


app.listen(3000, () => {
	  console.log("app listening on port 3000")
})

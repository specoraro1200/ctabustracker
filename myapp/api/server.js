const express = require("express")
const cors = require("cors")
var redis = require('redis');
var mysql = require('mysql');
const app = express()
app.use(cors())
redisClosed = true

var con = mysql.createConnection({
	
	host:process.env.host,
	user:process.env.user,
	port:process.env.port,
	password:process.env.password,
	database:process.env.database

});
const client = redis.createClient({
    socket: {
        host: '127.0.0.1',
        port: 6379
    },
	legacyMode: true
});


async function connectToRedis(){
	redisClosed = false;
	await client.connect()
}


client.on('connect',()=> {
	console.log(client);
});

app.get("/", function(req, res){
	client.get("Frontpage", async (err, result) => {
		if(err) throw err;
		if(result !== null){
			res.send(result) 
		} 
		else{
			console.log("EPIC FAIL")
			frontPageQueryandCache(req,res)
		}
	});
})


async function frontPageQueryandCache(req, res) {
	try {
		con.query("select url,vid,name from Image", function (err, result, fields) {
			if (err) connect();
			console.log("BEFORE")
			console.log(JSON.stringify(result))
			client.setEx("Frontpage",60000,JSON.stringify(result))
			res.send(result) 
		});
	} catch (err) {
		console.error(err);
		res.status(500);
	}
}
// con.query("select sum(dly = 1) as 'True',sum(dly=0) as 'False', vid from Buses where vid in (select vid from Buses where rt = '"+id+"') group by vid", function (err, result, fields) {

app.get('/BusRoute/:id', function(req, res) {
	var id = req.params.id; 
	var busRoute = "BusRoute" + id
	client.get(busRoute, async (err, result) => {
		if(err) throw err;
		if(result !== null){
			res.send(result) 
		} 
		else{
			busRouteQueryandCache(req,res)
		}
	});
});

async function busRouteQueryandCache(req, res) {

	try {
		con.query("select sum(dly = 1) as 'True',sum(dly=0) as 'False', vid from Buses where vid in (select vid from Buses where rt = '"+id+"') and tmstmp >= '" + store + "' group by vid", function (err, result, fields) {
			if (err) connect();
			client.set("BusRoute",60000,JSON.stringify(result))
			res.send(result) 
		});
	} catch (err) {
		console.error(err);
		res.status(500);
	}
}

app.get("/delay", function(req, res) {
		con.query("select (sum(dly) / count(dly)*100) as 'PercentLate', vid from Buses group by vid order by PercentLate;", function (err, result, fields) {
		  if (err) connect();
		});
})


app.listen(3000, () => {
	console.log(client)
	if(redisClosed){
		connectToRedis()
	}
	console.log("app listening on port 3000")
})

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var router = require('./router');
var db = require('./mongo-db');
var localip = require('local-ip');
var host = '10.154.98.66';
var port = 3000;
var iface_windows = 'Wi-Fi';
var iface_linux = 'wlan0';
var path = require("path");

localip(iface_windows, function(err, res) {
  if (err) {
    console.log('No ip_add on this interface !');
  }
  else {
  	host = res;
  }
});

const server = require('http').Server(app)


var formData = { value : 3650, mac_add : "1234567AZERTYU0" };

/*db.registerLight(formData, function(response){
	console.log(response);
});
//console.log("Nb capteurs " + db.countCapteurs());
db.getTemperatureValues("1234567AZERTYU", function(response) {
    //console.log(JSON.stringify(response.data));
	response.data.data.forEach(function(elm) {
    	console.log(elm.value + " " + elm.date);
	});

});*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use("/css",  express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/lib",  express.static(__dirname + '/public/lib'));

app.use(router);
server.listen(port, host, function () {
  console.log('Application listening on : ' + host + ':' + port);
  db.countLights(function(data){
  	console.log('Nombre de lunmières : ' + data);
  });
  db.countRadiators(function(data){
  	console.log('Nombre de radiateurs : ' + data);
  });
})

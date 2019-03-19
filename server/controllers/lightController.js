var bodyParser = require('body-parser');
var db = require('../mongo-db.js');
var util = require('util');
const CircularJSON  = require('circular-json');

exports.index = function(req, res) {
	res.send('Bonjour de light');
}

exports.getAll = function(req, res) {
	db.getAllLights(function(response){
		res.send(response);
	});
}

exports.registerLight = function(req, res) {
	db.registerLight(req.body, function(response){
		res.send(response);
	});
}

exports.powerOnLight = function(mac_add, req, res) {
	setLightValue(mac_add, true, res);
}

exports.powerOffLight = function(mac_add, req, res) {
	setLightValue(mac_add, false, res);
}

exports.getLightData = function(mac_add, req, res) {
	db.getLightValues(mac_add, function(response){
		res.send(response);
	});
}

exports.getLightState = function(mac_add, req, res) {
	db.getLightValues(mac_add, function(response){
		if(response.data != null){
			if(response.data.powered)
				res.send('1');
			else
				res.send('0');
		}
		else {
			res.send('');
		}
	});
}

function setLightValue(mac_add, power, res) {
	let formData = {"mac_add" : mac_add, "powered" : power}
	db.setLightValue(formData, function(response){
		res.send(response);
	});
}
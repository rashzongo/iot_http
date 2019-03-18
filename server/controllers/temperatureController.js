var bodyParser = require('body-parser');
var db = require('../mongo-db.js');
const util = require('util');

exports.index = function(req, res) {
	res.send('Temp index');
}

exports.getAll = function(req, res) {
	db.getAllTemperatures(function(response){
		res.send(response);
	});
}

exports.registerTemperature = function(req, res) {
	db.registerTemperature(req.body, function(response){
		res.send(response);
	});
}

exports.powerOnRadiator = function(mac_add, req, res) {
	setRadiatorValue(mac_add, true, req, res);
}

exports.powerOffRadiator = function(mac_add, req, res) {
	setRadiatorValue(mac_add, false, req, res);
}

exports.getRadiatorData = function(mac_add, req, res) {
	db.getTemperatureValues(mac_add, function(response){
		res.send(response);
	});
}

function setRadiatorValue(mac_add, power, req, res) {
	let formData = {"mac_add" : mac_add, "powered" : power}
	db.setRadiatorValue(formData, function(response){
		res.send(response);
	});
}
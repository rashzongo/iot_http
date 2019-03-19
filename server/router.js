var express = require('express');
var router = express.Router();
var homeController = require('./controllers/homeController');
var lightController = require('./controllers/lightController');
var temperatureController = require('./controllers/temperatureController');

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();


//Index
router.get('/', function(req,res){
  res.sendFile(__dirname + '/public/index.html');
});

//Temperature
router.get('/temperature', jsonParser, temperatureController.index);

router.get('/temperatures', jsonParser, function(req, res, next) {
	temperatureController.getAll(req, res);
});
router.post('/temperature', jsonParser,  function(req, res, next) {
	temperatureController.registerTemperature(req, res);
});
router.get('/temperature/:mac_add', jsonParser,  function(req, res, next) {
	temperatureController.getRadiatorData(req.params.mac_add, req, res);
});
router.get('/temperature/:mac_add/state', jsonParser,  function(req, res, next) {
	temperatureController.getRadiatorState(req.params.mac_add, req, res);
});
router.get('/temperature/:mac_add/on', jsonParser,  function(req, res, next) {
	temperatureController.powerOnRadiator(req.params.mac_add, req, res);
});
router.get('/temperature/:mac_add/off', jsonParser,  function(req, res, next) {
	temperatureController.powerOffRadiator(req.params.mac_add, req, res);
});
router.get('/temperature/data', jsonParser,  function(req, res, next) {
	temperatureController.getTemperatureData(req, res);
});



//Light
router.get('/light', jsonParser, lightController.index);

router.get('/lights', jsonParser, function(req, res, next) {
	lightController.getAll(req, res);
});
router.post('/light', jsonParser,  function(req, res, next) {
	lightController.registerLight(req, res);
});
router.get('/light/:mac_add', jsonParser,  function(req, res, next) {
	lightController.getLightData(req.params.mac_add, req, res);
});
router.get('/light/:mac_add/state', jsonParser,  function(req, res, next) {
	lightController.getLightState(req.params.mac_add, req, res);
});
router.get('/light/:mac_add/on', jsonParser,  function(req, res, next) {
	lightController.powerOnLight(req.params.mac_add, req, res);
});
router.get('/light/:mac_add/off', jsonParser,  function(req, res, next) {
	lightController.powerOffLight(req.params.mac_add, req, res);
});
router.get('/light/data', jsonParser,  function(req, res, next) {
	lightController.getLightData(req, res);
});

module.exports = router;
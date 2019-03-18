exports.index = function(req, res) {
	res.sendFile('../public/', 'index.html');
}

exports.anotherFunction = function (req, res) {
	res.send('Another function in Home Controller');
}
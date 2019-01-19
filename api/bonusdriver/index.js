var express = require('express');
var router = new express.Router();
var controller = require('./controller');

module.exports = function(io) {
    router.get('/', controller.retrievePosition);
    router.put('/', function(req, res) { return controller.updatePosition(req, res, io)});

    return router;
}
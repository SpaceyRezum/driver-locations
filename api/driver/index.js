var express = require('express');
var router = new express.Router();
var controller = require('./controller');

router.get('/', controller.retrievePosition);
router.put('/', controller.updatePosition);

module.exports = router;
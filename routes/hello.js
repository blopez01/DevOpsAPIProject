var express = require('express');
var router = express.Router();

// define the hello route
router.get('/', function (req, res, next) {
    res.send({ message: 'hello summer!!!' });
    res.status(200);
});

module.exports = router;

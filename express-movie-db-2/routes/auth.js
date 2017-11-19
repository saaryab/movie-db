var express = require('express');
var router = express.Router();
var config = require('./../config.json')

var block = function (req, res, next) {
    var auth = req.get("authorization");
    if (auth !== config.apiPassword) 
        res.send('Unauthorized')
    next()
}

router.get(/.+/, block);
router.put(/.+/, block);
router.patch(/.+/, block);
router.delete(/.+/, block);

module.exports = router;

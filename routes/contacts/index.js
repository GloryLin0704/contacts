var express = require('express');
var router = express.Router();
var getList = require('./get');
var addList = require('./post');
var delList = require('./del');
var putList = require('./put');
/* GET home page. */
router.get('/', getList);

router.post('/', addList);

router.put('/', putList);

router.delete('/', delList);

module.exports = router;

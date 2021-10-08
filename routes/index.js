var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'LUT WWW2021 Weekly Ex 4' });
});

module.exports = router;

var express = require('express');
const { request } = require('../app');
var router = express.Router();
var recipes = require('./recipes.json').recipes;

router.get('/', (req, res) => {
  res.json(recipes);
});
/* GET users listing. */
router.get('/:food', (req, res) => {
  res.status(200).json({ data: recipes.find((recipe) => recipe.name === req.params.food) });
});

module.exports = router;

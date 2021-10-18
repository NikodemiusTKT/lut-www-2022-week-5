var express = require('express');
const { request } = require('../app');
var router = express.Router();
var recipes = require('./database.json').recipes;

router.get('/', (req, res) => {
  res.json(recipes);
});
/* GET users listing. */
router.get('/:food', (req, res) => {
  const recipe = recipes.find((recipe) => recipe.name === req.params.food);
  if (recipe) {
    res.status(200).json(recipe);
  } else {
    res.json('No recipe found');
  }
});

router.put('/:food', (request, response) => {
  res.status(200).json(req.params);
});
module.exports = router;

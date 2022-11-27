var express = require('express');
var router = express.Router();
var axios = require('axios').default;
const PORT = process.env.PORT || 1234;
const recipeName = 'pizza'
const recipeURL = `http://localhost:${PORT}/recipe/${recipeName}`;
/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const response = await axios.get(recipeURL);
    const { name, ingredients, instructions } = response.data;
    res.render('index', { title: 'Recipes website', name, ingredients, instructions });
  } catch (error) {
    console.error(error);
  }
  next();
});

// name: res.data.name,
// ingredients: res.data.ingredients,
// instructions: res.data.instructions,

module.exports = router;

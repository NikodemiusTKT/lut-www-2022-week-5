var express = require('express');
var router = express.Router();
var axios = require('axios').default;
const PORT = process.env.PORT || 1234;
const recipe = `http://localhost:${PORT}/recipe/hot dog`;
/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const response = await axios.get(recipe);
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

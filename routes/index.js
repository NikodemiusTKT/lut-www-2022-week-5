var express = require('express');
var router = express.Router();
var axios = require('axios').default;
const PORT = process.env.PORT | 3300;
var url = `http://localhost:${PORT}/recipe/pizza`;
/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const response = await axios.get(url);
    const { name, ingredients, instructions } = response.data;
    res.render('index', { title: 'Exercise 4', name, ingredients, instructions });
  } catch (error) {
    console.error(error);
  }
  next();
});

// name: res.data.name,
// ingredients: res.data.ingredients,
// instructions: res.data.instructions,

module.exports = router;

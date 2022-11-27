var express = require('express');
var router = express.Router();
const fs = require('fs').promises
var path = require('path')

const recipesPath = path.resolve(__dirname, '../data/database.json')

const staticRecipe = {
  ingredients: ['1 cm (1/2") peeled root ginger, grated',
    '2 cloves garlic, peeled and crushed',
    '50 g (2 oz) butter',
    '1 onion, finely chopped',
    '½ teaspoon turmeric powder',
    '½ teaspoon ground white cumin',
    '½ teaspoon ground black cumin (optional)',
    '½ teaspoon ground coriander',
    '½ teaspoon garam masala',
    '½ teaspoon chili powder',
    '½ teaspoon tandoori colouring (very optional)',
    '4 tablespoons coconut milk or a 2 cm (1") block of creamed coconut block',
    '112 ml (4 fl oz) liquid from pre cooked chicken tikka masala (or chicken stock)',
    '150 ml double cream',
    '2 heaped teaspoons of ground almonds',
    '1 tablespoon ghee or vegetable oil for frying',
    'Pinch of salt',
    'Pasta'
  ],
  instructions: ["Mix the garlic and ginger together with the salt",
    "Gently fry the onions in the ghee or vegetable oil for 4 minutes",
    "Add the ginger and garlic an cook for a further 2 minutes",
    "Add the powdered spices and cook for anther 2 minutes",
    "Pour in the stock, coconut block and the cream and heat gently, stirring until the coconut block has melted. Don't boil.",
    "Add the cooked tandoori chicken pieces and simmer gently for 5 minutes so the sauce permiates the meat."
  ]
}

// if database.json doesnt's exist just require the default-data.json
var recipes = require('../data/default-data.json').recipes



// helper function for checking if given file exists
const checkFile = async (path) => {
  try {
    await fs.access(path);
    console.log('File exists');
    return true
  } catch (error) {
    // Handle error here
    console.log("File doesn't exists");
    return false
  }
};


/* GET route "/recipe" responds with all of the recipes */
router.get('/', async (req, res) => {
  if (await checkFile(recipesPath)) {
    recipes = require('../data/database.json').recipes
  }
  res.json(recipes)
});

// POST route for adding new recipe and the saving them inside database.json file
// later JSON file could be replaced with an actual MongoDB database
router.post('/', async (req, res) => {
  if (await checkFile(recipesPath)) {
    recipes = require('../data/database.json').recipes
  }
  const {
    name,
    ingredients,
    instructions
  } = req.body;
  // Need to parse JSON for ingredients and instructions, because of escaped \" double quote strings
  const parsedIngredients = JSON.parse(ingredients)
  const parsedInstructions = JSON.parse(instructions)
  const recipeIndex = await recipes.findIndex((recipe) => recipe.name === name)
  // If recipe with given name already exists, then just push new ingredients and instructions
  if (recipeIndex >= 0) {
    recipes[recipeIndex].ingredients.push(...parsedIngredients)
    recipes[recipeIndex].instructions.push(...parsedInstructions)
    // Save new modified recipe inside a json database file at ../data/database.json
    try {
      await fs.writeFile(recipesPath, JSON.stringify({
        recipes: [...recipes]
      }))
      res.status(200).json(recipes[recipeIndex])
    } catch (error) {
      throw error
    }
  } else {
    /* Add new recipe when recipe name doesn't already exist */
    const newRecipe = {
      name: name,
      ingredients: parsedIngredients,
      instructions: parsedInstructions
    }
    recipes.push(newRecipe)
    const newRecipesArray = {
      recipes: recipes
    }
    // Save new recipe inside a json database file at ../data/database.json
    try {
      await fs.writeFile(recipesPath, JSON.stringify(newRecipesArray))
      res.status(200).json(newRecipe)
    } catch (error) {
      throw error
    }
  }
});
/* GET /recipe/:food responds with recipe given :food request param. */
router.get('/:food', (req, res) => {
  const recipe = recipes.find((recipe) => recipe.name === req.params.food);
  if (recipe) {
    res.status(200).json(recipe);
  } else {
    res.json({
      name: req.params.food,
      ingredients: staticRecipe.ingredients,
      instructions: staticRecipe.instructions
    });
  }
});

module.exports = router;
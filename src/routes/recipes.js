var express = require('express');
var router = express.Router();
const fs = require('fs').promises
var path = require('path')

const recipesPath = path.resolve(__dirname,'../data/database.json')

// if database.json doesnt's exist just require the default-data.json
 var recipes  = require('../data/default-data.json').recipes



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
    await fs.writeFile(recipesPath, JSON.stringify({ recipes: [...recipes]}))
    res.status(200).json(recipes[recipeIndex])
    } catch(error) {
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
    res.json('No recipe found');
  }
});

module.exports = router;

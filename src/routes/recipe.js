var express = require('express');
var router = express.Router();
const fs = require('fs').promises
var path = require('path');
const { nextTick } = require('process');

const recipesPath = path.resolve(__dirname, '../data/database.json')

const mongoose = require('mongoose')


// if database.json doesnt's exist just require the default-data.json
var recipes = require('../data/default-data.json').recipes

const Recipe = require('../models/recipe')


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
  try {
    const recipes = await Recipe.find({})
    res.json(recipes)
  } catch(error) {
    console.log("could not fetch all recipes:", error)
  }
});


function isValidJson(str) {
  try {
      if(typeof str != 'string') return false;
      JSON.parse(str);
      return true
  } catch (error) {
      return false
  }
}
// POST route for adding new recipe and the saving them inside database.json file
// later JSON file could be replaced with an actual MongoDB database
router.post('/', (req, res) => {
  // if (await checkFile(recipesPath)) {
  //   recipes = require('../data/database.json').recipes
  // }
  const name = req.body.name;
  var ingredients = req.body.ingredients;
  var instructions = req.body.instructions;
  // Need to parse JSON for ingredients and instructions, because of escaped \" double quote strings
  if (isValidJson(ingredients)) ingredients = JSON.parse(ingredients)
  if (isValidJson(instructions)) instructions = JSON.parse(instructions)
  const newRecipe = new Recipe({
    name: name,
    ingredients: ingredients,
    instructions: instructions
  })
  newRecipe.save().then(() => {
    if (req.header('Accept').includes('application/json')) {
      res.status(200).json({
        name: name,
        ingredients: ingredients,
        instructions: instructions
      })

    } else {
      res.render('index', {
        title: 'Recipes Website',
        name: name,
        ingredients: ingredients,
        instructions: instructions
      })

    }

  }).catch(err => {
    console.log("Something went wrong with saving new recipe: ", err)
  })
  // const recipeIndex = await recipes.findIndex((recipe) => recipe.name === name)
  // /*
  // // If recipe with given name already exists, then just push new ingredients and instructions
  // if (recipeIndex >= 0) {
  //   recipes[recipeIndex].ingredients.push(...parsedIngredients)
  //   recipes[recipeIndex].instructions.push(...parsedInstructions)
  //   // Save new modified recipe inside a json database file at ../data/database.json
  //   try {
  //     await fs.writeFile(recipesPath, JSON.stringify({
  //       recipes: [...recipes]
  //     }))
  //     res.status(200).json(recipes[recipeIndex])
  //   } catch (error) {
  //     throw error
  //   }
  // } else {
  //   /* Add new recipe when recipe name doesn't already exist */
  //   const newRecipe = {
  //     name: name,
  //     ingredients: parsedIngredients,
  //     instructions: parsedInstructions
  //   }
  //   recipes.push(newRecipe)
  //   const newRecipesArray = {
  //     recipes: recipes
  //   }
  //   // Save new recipe inside a json database file at ../data/database.json
  //   try {
  //     await fs.writeFile(recipesPath, JSON.stringify(newRecipesArray))
  //     res.status(200).json(newRecipe)
  //   } catch (error) {
  //     throw error
  //   }
  // }
});
/* GET /recipe/:food responds with recipe given :food request param. */
router.get('/:food', async (req, res) => {
  try {

  const recipe = await Recipe.findOne({name: req.params.food});
  if (!recipe) {
    res.json( "Recipe not found.")
  }
  if (req.header('Accept').includes('application/json')) {
    res.status(200).json(recipe);
  } else {
    res.render('index', {
      title: 'Recipes website',
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    });
  }
  } catch(error) {
    console.log('Something went wrong with fetching the recipe:', error)
  }
});

module.exports = router;
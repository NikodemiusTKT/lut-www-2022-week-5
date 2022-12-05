const recipe = require("../../models/recipe");

if (document.readyState !== 'loading') {
  initializeCode();
} else {
  initializeCode();
}

function initializeCode() {
  document.addEventListener('DOMContentLoaded', function () {
    var ingredients = new Array();
    var instructions = new Array();
    var pictures;
    document.getElementById('add-instruction').addEventListener('click', () => {
      var instruction = document.querySelector('#instructions-text');
      instructions.push(instruction.value);
      instruction.value = '';
    });
    document.getElementById('add-ingredient').addEventListener('click', () => {
      var ingredient = document.getElementById('ingredients-text');
      ingredients.push(ingredient.value);
      ingredient.value = '';
    });
    document.querySelector('#image-input').addEventListener('change', () => {
      var pictureInput = document.querySelector('#img-input');
      pictures = pictureInput.files;
    });
    document.querySelector('#submit').addEventListener('click', (e) => {
      e.preventDefault();
      submitFormData({
        ingredients,
        instructions,
        pictures
      });
    });
    document.querySelector('#searchForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const recipeName = document.querySelector('input[type="search"').value
      searchRecipe(recipeName);
    });
  });
}

async function submitFormData(data) {
  var formData = new FormData();
  var nameEl = document.querySelector('#name-text');
  var nameVal = nameEl.value;
  const url = `/recipe`;
  nameEl.value = '';
  formData.append('name', nameVal);
  formData.append('ingredients', JSON.stringify(data.ingredients));
  formData.append('instructions', JSON.stringify(data.instructions));
  formData.append('images', data.pictures);
  // Create request object for the recipe
  const plainFormData = Object.fromEntries(formData.entries())
  const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(plainFormData),
    headers: {
      "connection": "keep-alive",
      "content-type": "application/json"
    },
  });
  // pass request to fetch
  fetch(request)
    .then((res) => res.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error(error);
    });
}

function searchRecipe(recipeName) {
  const url = `/recipe/${recipeName}`
  const request = new Request(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json;charset=utf-8'
    }
  })
  fetch(request).then((res) => res.json()).then(data => {
    var recipeNameTitle = document.querySelector('#recipeTitle');
    var instructionsElement = document.querySelector('#instructionsList');
    var ingredientsElement = document.querySelector('#ingredientsList');
    ingredientsElement.replaceChildren()
    instructionsElement.replaceChildren()
    if (data.name) {
    // Set the recipe name
      recipeNameTitle.innerHTML = data.name 
      // create li elements for every ingredient
      if (data.ingredients.length > 0) {
        console.log('ingredients is not empty')
        data.ingredients.map(ingredient => {
          var li = document.createElement('li')
          li.append(ingredient)
          ingredientsElement.append(li)
        })
      } else {
        // case when ingredients array is empty
        ingredientsElement.replaceChildren('No ingredients found.')
      }

      // create li elements for every intruction
      if (data.instructions) {
        data.instructions.map(instruction => {
          var li = document.createElement('li')
          li.append(instruction)
          instructionsElement.append(li)
        })

      } else {
        // case when instructions array is empty
        instructionsElement.replaceChildren('No instructions found')

      }

    } else {
      recipeNameTitle.innerHTML = data;
      ingredientsElement.replaceChildren('No ingredients found.')
      instructionsElement.replaceChildren('No instructions found')

    }


  }).catch((error) => {
    console.log(error)
  })
}
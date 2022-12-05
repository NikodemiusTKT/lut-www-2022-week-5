var express = require('express');
var router = express.Router();
var axios = require('axios').default;
const PORT = process.env.PORT || 3000;
const recipeName = 'Tikka_Masala'
const recipeURL = `http://localhost:${PORT}/recipe/${recipeName}`;


var defaultRecipe = {
  "name": "Tikka_Masala",
  "ingredients": ['1 cm (1/2") peeled root ginger, grated',
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
  "instructions": ["Mix the garlic and ginger together with the salt",
    "Gently fry the onions in the ghee or vegetable oil for 4 minutes",
    "Add the ginger and garlic an cook for a further 2 minutes",
    "Add the powdered spices and cook for anther 2 minutes",
    "Pour in the stock, coconut block and the cream and heat gently, stirring until the coconut block has melted. Don't boil.",
    "Add the cooked tandoori chicken pieces and simmer gently for 5 minutes so the sauce permiates the meat."
  ]

}

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Recipes website',
    name: defaultRecipe["name"],
    ingredients: defaultRecipe["ingredients"],
    instructions: defaultRecipe["instructions"]
  });
  next();
});

// name: res.data.name,
// ingredients: res.data.ingredients,
// instructions: res.data.instructions,

module.exports = router;
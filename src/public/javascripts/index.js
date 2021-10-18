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
    document.querySelector('#img-input').addEventListener('change', () => {
      var picture = document.querySelector('#img-input');
      pictures = picture.files;
    });
    document.querySelector('#submit').addEventListener('click', (e) => {
      e.preventDefault();
      submitFormData({ ingredients, instructions });
    });
  });
}

async function submitFormData(data) {
  var formData = new FormData();
  var nameEl = document.querySelector('#name-text');
  var nameVal = nameEl.value;
  const url = `/recipe/${nameVal}`;
  nameEl.value = '';
  formData.append('name', nameVal);
  formData.append('ingredients', JSON.stringify(data.ingredients));
  formData.append('instructions', JSON.stringify(data.instructions));
  // Create request object for the recipe
  const request = new Request(url, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  // pass request to fetch
  fetch(request)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Something went wrong when posting new recipe on API');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

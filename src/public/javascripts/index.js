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
      submitFormData({ ingredients, instructions, pictures });
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
  // const plainFormData = Object.fromEntries(formData.entries())
  const request = new Request(url, {
    method: 'POST',
    body: formData,
    headers: {
      "connection": "keep-alive",
      "accept": "json/application"
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

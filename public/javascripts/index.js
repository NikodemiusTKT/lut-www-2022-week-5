if (document.readyState !== 'loading') {
  initializeCode();
} else {
  initializeCode();
}

function initializeCode() {
  document.addEventListener('DOMContentLoaded', function () {
    var name;
    var ingredients = new Array();
    var instructions = new Array();
    var pictures;
    document.querySelector('#name-text').addEventListener('change', () => {});
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
    document.querySelector('#submit').addEventListener('submit', (e) => {
      e.preventDefault();
      submitFormData({ ingredients, instructions });
    });
  });
}

async function submitFormData(data) {
  var formData = new FormData();
  var nameEl = document.querySelector('#name-text');
  var nameVal = nameEl.value;
  nameEl.value = '';
  formData.append('ingredients', JSON.stringify(data.ingredients));
  formData.append('instructions', JSON.stringify(data.instructions));
  formData.append('name', nameVal);
  try {
    let response = await fetch('/recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: formData,
    });
  } catch (error) {
    console.error(error);
  }
}

'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  throw new Error('something went wrong');
}

function fetchAndPopulatePokemons() {
  const mainDiv = document.createElement('div');
  document.body.appendChild(mainDiv);
  mainDiv.setAttribute('id', 'main-div');
  const btn = document.createElement('button');
  btn.type = 'submit';
  mainDiv.appendChild(btn);
  btn.textContent = 'Get Pokemon!';
  const select = document.createElement('select');
  mainDiv.appendChild(select);

  btn.addEventListener('click', async () => {
    try {
      const data = await fetchData(
        'https://pokeapi.co/api/v2/pokemon?limit=151%27'
      );
      const results = data.results;
      results.forEach((result) => {
        const option = document.createElement('option');
        select.appendChild(option);
        option.textContent = result.name;
        option.value = result.url;
      });
      select.addEventListener('change', (event) => {
        fetchImage(event);
      });
    } catch (error) {
      console.log(error.message);
    }
  });
}

async function fetchImage(event) {
  let image = document.querySelector('img');
  if (!image) {
    image = document.createElement('img');
    document.body.appendChild(image);
    const pokemonName = event.target.value;
    image.setAttribute('alt', pokemonName);
  }
  try {
    const data = await fetchData(event.target.value);
    image.src = data.sprites.front_default;
  } catch (error) {
    console.log(error.message);
  }
}

function main() {
  fetchAndPopulatePokemons();
}

window.addEventListener('load', main);

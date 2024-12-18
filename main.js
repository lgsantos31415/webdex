import { fetchApi, listPokemon, disabledButtons } from "./functions/index.js";

let container = document.getElementById("container");
let tab = document.getElementById("tab");

let avancar = document.getElementById("avancar");
let retroceder = document.getElementById("retroceder");
retroceder.disabled = true;

let response = await fetchApi(
  "https://pokeapi.co/api/v2/pokemon?offset=0&limit=15"
);

listPokemon(response, container, tab);

avancar.onclick = () => avancarFunc(response);
retroceder.onclick = () => retrocederFunc(response);

async function avancarFunc(respond) {
  if (respond.next) {
    container.innerHTML = "";
    response = await fetchApi(response.next);
    listPokemon(response, container, tab);
    avancar.onclick = () => avancarFunc(response);

    disabledButtons(avancar, retroceder, response);
  }
}

async function retrocederFunc(respond) {
  if (respond.previous) {
    container.innerHTML = "";
    response = await fetchApi(response.previous);
    listPokemon(response, container, tab);
    retroceder.onclick = () => retrocederFunc(response);
    retroceder.disabled = false;

    disabledButtons(avancar, retroceder, response);
  }
}

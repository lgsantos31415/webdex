const bg = {
  grass: "#9BCC50",
  poison: "#B97FC9",
  fire: "#FD7D24",
  flying: "#3DC7EF",
  water: "#4592C4",
  bug: "#729F3F",
  normal: "#A4ACAF",
  ground: "#AB9842",
  electric: "#EED535",
  fairy: "#FDB9E9",
  fighting: "#D56723",
  rock: "#A38C21",
  ice: "#51C4E7",
  psychic: "#F366B9",
  ghost: "#7B62A3",
  dark: "#707070",
  steel: "#9EB7B8",
  dragon: "#F16E57",
};

const co = [
  "poison",
  "fire",
  "water",
  "psychic",
  "bug",
  "fighting",
  "rock",
  "ground",
  "ghost",
  "dark",
  "dragon",
];

export async function fetchApi(url) {
  try {
    let response = await fetch(url);
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

export async function listPokemon(response, container, tab) {
  let array = Array.from(response.results);

  for (let index in array) {
    let div = document.createElement("div");
    div.classList.add("card");
    let name = array[index]["name"];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    name = name.split("-")[0];

    let data = await fetchApi(array[index]["url"]);
    let id = "#" + data.id.toString().padStart(4, "0");
    let types = Array.from(data.types);

    div.innerHTML = `
    <img src="${data.sprites.front_default}" alt="Sprite do ${name}"/>
    <div class="column">
      <div class="row">
        <h1>${name}</h1>
        <h2>${id}</h2>
      </div>
      <div class="types">
        ${types
          .map((type) => {
            let t = type.type.name;
            return `<span class="type" style="background: ${bg[t]}; color: ${
              co.includes(t) ? "white" : "black"
            }">${t.charAt(0).toUpperCase() + t.slice(1)}</span>`;
          })
          .join("")}
          </div>
        </div>
      `;

    div.onclick = () => showTab(tab, name, id, data);
    container.appendChild(div);
  }
}

export function disabledButtons(avancar, retroceder, respond) {
  if (respond.next && respond.previous) {
    avancar.disabled = false;
    retroceder.disabled = false;
  } else if (respond.next) {
    avancar.disabled = false;
    retroceder.disabled = true;
  } else if (respond.previous) {
    avancar.disabled = true;
    retroceder.disabled = false;
  } else {
    avancar.disabled = true;
    retroceder.disabled = true;
  }
}

export function showTab(tab, name, id, data) {
  console.log(data);
  let button = document.createElement("button");
  button.onclick = () => tab.classList.add("invisible");
  button.innerHTML = `<i class="ph ph-x"></i>`;

  let types = Array.from(data.types);
  let abilities = Array.from(data.abilities);
  let stats = Array.from(data.stats);

  tab.innerHTML = `
    <div id="row3">
      <h1>${name}</h1>
      <span>${id}</span>
    </div>
    <div id="row3">
      <img src=${data.sprites.front_default} alt="Imagem do ${name}">
      <div id="column3">
        <div id="column2">
          <h1>Height</h1>
          <h1>Weight</h1>
          <span>${calculateHeight(data.height)}</span>
          <span>${calculateWeight(data.weight)}</span>
        </div>
        
        <h1>Types</h1>
        <div class="types">
      ${types
        .map((type) => {
          let t = type.type.name;
          return `<span class="type" style="background: ${bg[t]}; color: ${
            co.includes(t) ? "white" : "black"
          }">${t.charAt(0).toUpperCase() + t.slice(1)}</span>`;
        })
        .join("")}
        </div>
      </div>
      </div>
    </div>
    <div id="column4">
      <h1>Abilities</h1>
      <div id="abilities">
      ${abilities
        .map((ab) => {
          let t = ab.ability.name;
          t = t.charAt(0).toUpperCase() + t.slice(1);
          return `<span class="ability">${t.replace("-", " ")}</span>`;
        })
        .join("")}
      </div>
    </div>
    <div id="column4">
      <h1>Stats</h1>
      <div id="stats">
      ${stats
        .map((stat) => {
          let t = stat.stat.name;
          t = t.charAt(0).toUpperCase() + t.slice(1);
          return `<div class="column5">
            <h1>${t.replace("Special-", "S-")}</h1>
            <span>${stat.base_stat}</span>
            </div>`;
        })
        .join("")}
      </div>
    </div>
  `;
  tab.classList.remove("invisible");
  tab.appendChild(button);
}

function calculateHeight(height) {
  if (height < 10) return height * 10 + " cm";
  else return height / 10 + " m";
}
function calculateWeight(weight) {
  return weight / 10 + " kg";
}

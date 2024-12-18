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

  const bg = {
    grass: "#9BCC50",
    poison: "#B97FC9",
    fire: "#FD7D24",
    flying: "#3DC7EF",
    water: "#4592C4",
    bug: "#729F3F",
  };

  const co = ["poison", "fire", "water", "bug"];

  for (let index in array) {
    let div = document.createElement("div");
    div.classList.add("card");
    let name = array[index]["name"];
    name = name.charAt(0).toUpperCase() + name.slice(1);

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
            }">${t}</span>`;
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
  tab.innerHTML = `
    <button><i class="ph ph-x"></i></button>
    <div id="row3">
      <h1>${name}</h1>
      <span>${id}</span>
    </div>
    <div id="row3">
      <img src=${data.sprites.front_default} alt="Imagem do ${name}">
      <div id="column2">
        <span>Altura: ${calculateHeight(data.height)}</span>
        <span>Peso: ${data.weight / 10}kg</span>
      </div>
    </div>
  `;
  tab.classList.remove("invisible");
}

function calculateHeight(height) {
  return height;
}
function calculateWeight(weight) {}

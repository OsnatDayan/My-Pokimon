const body = document.getElementById('body');
const finallcard = document.getElementById(`mbody`);
const myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('chosenPokimon'));
const header = document.getElementById('header');
const progress = document.getElementById('progress');
let temp = [];
let finall;
const apiString = {
    pokemon_All_Shapes: "https://pokeapi.co/api/v2/pokemon-shape",
    pokemon_Shape: "https://pokeapi.co/api/v2/pokemon-shape/"
}
async function getAllShapes() {
    return fetch(`${apiString.pokemon_All_Shapes}`)
        .then(res => res.json())
        .then(resj => resj.results)
}
async function getSingleShape(index) {
    return fetch(`${apiString.pokemon_Shape}${index}/`).then(res => res.json());
}
async function getSpecies(url) {
    return fetch(`${url}`).then(res => res.json()).then(resj => resj.varieties);
}
async function getFinallPokimon(url) {
    return fetch(`${url}`).then(res => res.json()).then(resj => resj.sprites.front_default)
}
async function init() {
    await getAllShapes().then(result => { temp = result; });
    body.innerHTML = "";
    progress.innerHTML = "";
    progress.style.width = "";
    header.innerHTML = `<h3>Pick Shape:</h3>`;
    temp.forEach((t, i) => {
        body.innerHTML += `
        <div  class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${t.name}</h5>
            <button type="button" onclick="getShape(${i + 1})" data-id="${i}" >Select</button></div>
        </div>`
    })
}


async function getShape(index) {
    await getSingleShape(index).then(res => temp = res.pokemon_species);
    body.innerHTML = "";
    progress.innerHTML = `33%`;
    progress.style.width = "33%";
    header.innerHTML = `<h3>Pick Species:</h3>`;
    temp.forEach((s, i) => {
        body.innerHTML += `
        <div  class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${s.name}</h5>
            <button type="button" onclick="allSpecies(${i})" >Select</button></div>
        </div>`
    })
}
async function allSpecies(index) {
    await getSpecies(temp[index].url).then(res => temp = res);
    body.innerHTML = "";
    progress.innerHTML = `66%`;
    progress.style.width = "66%";
    header.innerHTML = `<h3>Pick Final Pokimon:</h3>`;
    temp.forEach((s, i) => {
        body.innerHTML += `
        <div  class="card " style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${s.pokemon.name}</h5>
            <button type="button" onclick="finalPokimon(${i})" >Select</button></div>
        </div>`
    })
}


async function finalPokimon(index) {
    progress.innerHTML = `100%`;
    progress.style.width = "100%";
    await getFinallPokimon(temp[index].pokemon.url).then(res =>
        finall = {name: temp[index].pokemon.name,img: res})
    finallcard.innerHTML = `
    <div class="card " style="width: 18rem;>
        <div class="card-body ">
         <h3 class="modal-header">Your Pokimon Is:</h3>
        <h4 class="card-title">${finall.name}</h4>
         <img src="${finall.img}" class="card-img-top" alt="...">
              <button id="close-btn" type="button"   data-bs-dismiss="modal" onclick="onClose()" >Close</button>
              <button id="start-btn" type="button" onclick="startOver()"  data-bs-dismiss="modal" >start over</button>    
    </div>
    </div>`
    myModal.show();
}
function startOver() {
    init();
}

function onClose() {
    progress.innerHTML = `66%`;
    progress.style.width = "66%";
}
init();












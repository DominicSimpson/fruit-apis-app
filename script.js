const x = require("./script2")
const fruitList = document.querySelector("#fruitSection ul");
const fruitForm = document.querySelector('#inputSection form');
const fruitNutrition = document.querySelector("#nutritionSection p");
console.log(fruitForm);

fruitForm.addEventListener(
    'submit', extractFruit
);

function extractFruit(e) {
    e.preventDefault();
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value = "";
}

let cal = 0;

function addFruit(fruit) {
    const li = document.createElement("li");
    li.textContent = fruit.name;
    li.addEventListener("click", removeFruit);
    fruitList.appendChild(li);

    cal += fruit.nutritions.calories;
    fruitNutrition.textContent = cal;
}

function removeFruit(e) {
    e.target.remove();
}

function fetchFruitData(fruit) {
    fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        .then((resp) => resp.json())
        .then(data => addFruit(data))
        .catch((e) => console.log(e));
}


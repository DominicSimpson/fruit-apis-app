const x = require("./script2")
const fruitList = document.querySelector("#fruitSection ul")
const fruitForm = document.querySelector('#inputSection form')
console.log(fruitForm);

fruitForm.addEventListener(
    'submit', extractFruit
);

function extractFruit(e) {
    e.preventDefault();
    addFruit(e.target.fruitInput.value);
    e.target.fruitInput.value = "";
}

function addFruit(fruit) {
    const li = document.createElement('li');
    li.textContent = fruit;
    fruitList.appendChild(li);
}

const x = require("./script2")

console.log(x);

const fruitForm = document.querySelector('#inputSection form')
console.log(fruitForm);

fruitForm.addEventListener(
    'submit', extractFruit
);

function extractFruit(e) {
    e.preventDefault();
    console.log(e);
}

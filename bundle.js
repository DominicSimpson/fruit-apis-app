(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const x = require("./script2")
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");
const fruitForm = document.querySelector('#inputSection form');


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

    li.dataset.calories = Number(fruit.nutritions.calories);


    li.addEventListener("click", removeFruit);
    fruitList.appendChild(li);

    cal += fruit.nutritions.calories;
    fruitNutrition.textContent = `Total Calories: ${cal}`;
}


function removeFruit(e) {
    console.log("Clicked:", e.target);
    console.log("Dataset:", e.target.dataset);
    console.log("Calories to subtract:", e.target.dataset.calories);
    
    const li = e.currentTarget;
    const calories = Number(li.dataset.calories);

    cal -= calories;
    fruitNutrition.textContent = `Total Calories: ${cal}`;
    li.remove();
}

function fetchFruitData(fruit) {
    fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`)
        .then((resp) => resp.json())
        .then(data => addFruit(data))
        .catch((e) => console.log(e));
}


},{"./script2":2}],2:[function(require,module,exports){
const x = 42;

module.exports = x;
},{}]},{},[1]);

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const x = require("./script2")
const fruitForm = document.querySelector('#inputSection form');
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");
const fruitImage = document.querySelector("#fruitImage");


fruitForm.addEventListener(
    'submit', extractFruit

);

    console.log("Form element:", fruitForm);


function extractFruit(e) {
    e.preventDefault();
    console.log("Form submitted");
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value = "";
}

let cal = 0;


function addFruit(fruit, imageURL = "") {

    const li = document.createElement("li");
    li.textContent = fruit.name;

    li.dataset.calories = Number(fruit.nutritions.calories);


    li.addEventListener("click", removeFruit);
    fruitList.appendChild(li);

    cal += fruit.nutritions.calories;
    fruitNutrition.textContent = `Total Calories: ${cal}`;

    if (imageURL) {
        fruitImage.src = imageURL;
        fruitImage.alt = `${fruit.name} image`;
    } else {
        fruitImage.src = "";
        fruitImage.alt = "";
    }
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

const pixabayApiKey = "51162756-fe4e2248c284990709dcab3a3";
console.log("Pixabay key:", pixabayApiKey); // Should print the actual API key


function fetchFruitData(fruit) {
    const fruitName = fruit.trim();


    console.log("User input:", fruitName);

    fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruitName}`)
        .then((resp) => resp.json())
        .then(fruitData => {
            console.log("FruityAPI data:", fruitData);

            const encodedFruit = encodeURIComponent(fruitData.name);
            const pixabayUrl = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodedFruit}&image_type=photo&category=food&per_page=3`;

            console.log("Pixabay URL:", pixabayUrl);

            fetch(pixabayUrl)
                .then((resp) => resp.json())
                .then(imageData => {
                    console.log("Pixabay key:", pixabayApiKey);  // Should print actual key, not "undefined"
                    let imageUrl = "";
                    if (
                        imageData &&
                        Array.isArray(imageData.hits) &&
                        imageData.hits.length > 0 &&
                        imageData.hits[0].webformatURL
                    ) {
                        imageUrl = imageData.hits[0].webformatURL;
                    }
                    addFruit(fruitData, imageUrl);
                })
                .catch(err => {
                    console.warn("Pixabay fetch failed", err);
                    addFruit(fruitData, "");
                });
        })
        .catch((e) => console.log("FruityAPI fetch error:", e));
}


},{"./script2":2}],2:[function(require,module,exports){
const x = 42;

module.exports = x;
},{}]},{},[1]);

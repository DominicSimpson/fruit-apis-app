(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fruitForm = document.querySelector("#inputSection form"); // the form the user submits
const fruitList = document.querySelector("#fruitSection ul"); // where fruit images will be added
const fruitNutrition = document.querySelector("#nutritionSection p"); // the p that displays the total calories

let cal = 0; // running total of all calories
const fruitCal = {}; // an object that maps fruit names to their individual calorie values (used to subtract later)

fruitForm.addEventListener("submit", extractFruit); // When user submits form, extractFruit function is called

function extractFruit(e) {
    e.preventDefault(); // prevents page from reloading
    fetchFruitData(e.target.fruitInput.value); // fetches fruit data and image using inputted fruit name
    e.target.fruitInput.value = ""; // clears the input
}

const pixabayApiKey = "51162756-fe4e2248c284990709dcab3a3";

async function fetchFruitData(fruit) { // Make two async fetch API calls
    try {
        const respData = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`); // for nutrition data
        const respImg = await fetch(
            `https://pixabay.com/api/?q=${fruit}+fruit&key=${pixabayApiKey}` // for image
        );

        if (respData.ok && respImg.ok) { // if both succeed:
            const data = await respData.json(); // parse them as JSON
            const imgData = await respImg.json();
            addFruit(data, imgData); // then pass them to addFruit function
        } else {
            throw "Something has gone wrong with one of the API requests";
        }
    } catch (e) {
        console.log(e); // if either API fais, log error
    }
}

function addFruit(fruit, fruitImg) {
    const img = document.createElement("img"); // create img element
    img.classList.add('fruits'); // adds the class name fruits to img element, allowing CSS styling
    img.alt = fruit.name; // sets alt to the fruit name
    img.src = fruitImg.hits[0].previewURL; // sets src to image returned from Pixabay

    img.addEventListener("click", removeFruit, { once: true }); // add click listener to remove fruit one at a time
    fruitList.appendChild(img); // adds newly created fruit img element to DOM

    fruitCal[fruit.name] = fruit.nutritions.calories; // stores fruit calories in fruitCal under its name

    cal += fruit.nutritions.calories; // updates total calories
    fruitNutrition.textContent = "Total Calories: " + cal; // displays them
}

function removeFruit(e) {
    const fruitName = e.target.alt; // uses alt of the clicked image to identify fruit
    cal -= fruitCal[fruitName]; // substracts respective calories from total calories
    fruitNutrition.textContent = "Total Calories: " + cal; // displays updated calorie amount

    delete fruitCal[fruitName]; // removes calories entry and image; delete is JavaScript operator
    e.target.remove(); // remove() is built-in JavaScript DOM method that removes element from page
}
},{}]},{},[1]);

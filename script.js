const fruitForm = document.querySelector("#inputSection form"); // the form the user submits
const fruitList = document.querySelector("#fruitSection ul"); // where fruit images will be added
const fruitNutrition = document.querySelector("#nutritionSection p"); // the p that displays the total calories
const createForm = document.querySelector("#create-form"); // create a fruit

let cal = 0; // running total of all calories
const fruitCal = {}; // an object that maps fruit names to their individual calorie values (used to subtract later)

fruitForm.addEventListener("submit", extractFruit); // When user submits form, extractFruit function is called
createForm.addEventListener("submit", createNewFruit);

function extractFruit(e) {
    e.preventDefault(); // prevents page from reloading
    fetchFruitData(e.target.fruitInput.value); // fetches fruit data and image using inputted fruit name
    e.target.fruitInput.value = ""; // clears the input
}

const pixabayApiKey = process.env.VITE_PIXABAY_API_KEY;

async function fetchFruitData(fruit) { // Declares an asynchronous function called fetchFruitData that takes a fruit name
    try { //try block - used to attempt code that might throw an error, such as fetch()
        const respData = await fetch(`https://fruits-backender-rihw.onrender.com/fruits/${fruit}`); // a Promise - calls the API for nutrition data
        const respImg = await fetch(
            `https://pixabay.com/api/?q=${fruit}+fruit&key=${pixabayApiKey}` // for image
        );

        if (respData.ok && respImg.ok) { // if both succeed:
            const data = await respData.json(); // parses JSON responses into usable JavaScript
            const imgData = await respImg.json();
            addFruit(data, imgData); // then pass them to addFruit function
        } else {
            throw "Something has gone wrong with one of the API requests";
        }
    } catch (e) {
        console.log(e); // if either API fais, throws an error and logs error
    }
}

async function createNewFruit(e) {
    e.preventDefault();

    const data = { name: e.target.fruitInput.value };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    } // Add deployed API URL in this fetch
    const response = await fetch(`https://fruits-backender-rihw.onrender.com/fruits`, options);

let messageStatus = document.querySelector("#message");

if (response.status === 201) {
    e.target.fruitInput.value = ""
    messageStatus.textContent = "Fruit successfully created";
    setTimeout(() => {
        messageStatus.textContent = ""
        }, 4000)
} else {
    e.target.fruitInput.value = ""
    messageStatus.textContent = "This fruit already exists. Please enter another fruit!"
    setTimeout(() => {
        messageStatus.textContent = ""
        }, 4000)
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
//fetch and display initial meals ********************************

$(document).ready(function () {
    fetchInitialMeals();
});

function fetchInitialMeals() {
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/search.php?s=",  //API the Home page
        method: "GET",
        success: function (data) {
            displayMeals(data.meals);
        },
        error: function (error) {
            console.error("Error fetching meals:", error);
        }
    });
}


//Declarations
let rowData = document.getElementById("rowData");
let searchPart = document.getElementById("searchPart");
let submitBtn;


//loading the screen
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

//JQUERY for the sidebar menu
$("#open").on("click", function () {
    $("#leftMenu").show(500);
    //$("#open").hide(0);
    $("#closebtn").show(0);
});


$("#closebtn").on("click", function () {
    $("#leftMenu").hide(500);
    $("#closebtn").hide(0);
    //$("#open").show(0);
});

$(".sidenav a").on("click", function () {
    $("#leftMenu").hide(500);
    $("#closebtn").hide(0);
    //$("#open").show(0);
});

document.getElementById("facebook-icon").addEventListener("click", function () {
    window.open("https://www.facebook.com", "_blank");
});

document.getElementById("x-icon").addEventListener("click", function () {
    window.open("https://www.x.com", "_blank");
});




//********************on click to get me the meal details*************************/
function displayMeals(arr) {
    let contenttt = "";
    for (let i = 0; i < arr.length; i++) {
        contenttt += `
        <div class="col-3 theCard">
    <div onclick="getMealDetails('${arr[i].idMeal}')" role="button" class="mealItem overflow-hidden position-relative rounded-3 ">
<img src="${arr[i].strMealThumb}" class="w-100 " alt="${arr[i].strTags}" />
<div class="whiteCardLayer d-flex align-items-center justify-content-center text-black fw-bold">
<p>${arr[i].strMeal}</p>
</div>
</div>
</div>
        `
    }


    rowData.innerHTML = contenttt;


}







//categories API 
async function getCategories() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchPart.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)
}
//shakl el categories page "html"
function displayCategories(arr) {
    let contenttt = "";

    for (let i = 0; i < arr.length; i++) {

        contenttt += `
        <div class="col-md-3 theCard">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="whiteCardLayer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = contenttt
}


////area API
async function getArea() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchPart.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(300)

}

//shakl el area page "html"
function displayArea(arr) {
    let contenttt = "";

    for (let i = 0; i < arr.length; i++) {
        contenttt += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }
    rowData.innerHTML = contenttt
}



//ingrediants API "List"

async function getIngredients() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchPart.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

//shakl page el Ingrediants
function displayIngredients(arr) {
    let contenttt = "";

    for (let i = 0; i < arr.length; i++) {
        contenttt += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = contenttt
}

//category on click API

async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


//area API
async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


//ingrediants calling API of the meals and each meal
async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


//eacl meal details ID "lookup API" done********************************
async function getMealDetails(mealID) {


    rowData.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)

    $("#leftMenu").hide(500);
    $("#closebtn").hide(0);
    $("#open").show(0);


}




//each meal details ingrediant of the meal and its tags***************************************
function displayMealDetails(meal) {
    rowData.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")

    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }










    //Inner Layer Details of each single meal: 
    let contenttt = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = contenttt;
}




//search input 

function showSearchInputs() {
    searchPart.innerHTML = `
    <div class="row py-5">
        <div class="col-md-6">
            <input onkeyup="searchByName(this.value)" id="name"  class="formBar bg-transparent text-white" type="search" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" id="fLetter" class="formBar bg-transparent text-white" type="search" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = "";
    searchPart.classList.remove("d-none");
}



//search by name
async function searchByName(term) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)
}


//search by first letter
async function searchByFLetter(term) {
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}


//contact 
function showContacts() {
    rowData.innerHTML = `
<form>
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="formBar" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters/numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="formBar " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *example@yahoo.com
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="formBar " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="formBar " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="formBar " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="formBar " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    It Didn't match the password 
                </div>
            </div>
        </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div> 
</form>`
    submitBtn = document.getElementById("submitBtn")




    //the focus of the form bar on default and when I click On it:
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputOnClick = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputOnClick = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputOnClick = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputOnClick = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputOnClick = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputOnClick = true
    })
}

let nameInputOnClick = false;
let emailInputOnClick = false;
let phoneInputOnClick = false;
let ageInputOnClick = false;
let passwordInputOnClick = false;
let repasswordInputOnClick = false;


function inputsValidation() {
    if (nameInputOnClick) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputOnClick) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputOnClick) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputOnClick) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputOnClick) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputOnClick) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

//regexxxxxxxx in search form
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}







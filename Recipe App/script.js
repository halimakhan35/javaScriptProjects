const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe_container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-Btn");
const recipeDetails = document.querySelector(".recipe-details");

// -----------------------------
// Fetch Recipes
// -----------------------------
const fetchRecipes = async (query) => {
  recipeContainer.innerHTML = "<h2>Fetching Recipes....</h2>";

  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const response = await data.json();

    recipeContainer.innerHTML = "";

    if (!response.meals) {
      recipeContainer.innerHTML = "<h2>No Recipes Found 😢</h2>";
      return;
    }

    response.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");

      recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> category</p>
      `;

      const button = document.createElement("button");
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

      button.addEventListener("click", () => {
        openRecipePopup(meal);
      });

      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipeContainer.innerHTML = "<h2>Error fetching data 😢</h2>";
  }
};

// -----------------------------
// Get Ingredients List
// -----------------------------
const fetchIngredients = (meal) => {
  let ingredientList = "";

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredientList += `<li>${measure} ${ingredient}</li>`;
    }
  }

  return ingredientList;
};

// -----------------------------
// Open Recipe Popup
// -----------------------------
const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
  `;

  recipeDetails.style.display = "block";
};

// -----------------------------
// Close Popup
// -----------------------------
recipeCloseBtn.addEventListener("click", () => {
  recipeDetails.style.display = "none";
});

// -----------------------------
// Search Button
// -----------------------------
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();

  if (searchInput === "") {
    recipeContainer.innerHTML = "<h2>Please enter a recipe name 🍽️</h2>";
    return;
  }

  fetchRecipes(searchInput);
});

const orderBtn = document.getElementById("orderBtn");
const foodMenu = document.getElementById("foodMenu");
const menuContainer = document.getElementById("menuContainer");

//  SAME IMAGES MULTIPLE TIMES
const foodImages = [
  "images/food1.avif",
  "images/food2.avif",
  "images/food3.avif",
  "images/food4.avif",
  "images/food9.avif",
  "images/food6.avif",
  "images/food7.avif",
  "images/food8.avif",
];

// SHOW MENU ON CHECKOUT
orderBtn.addEventListener("click", () => {
  foodMenu.style.display = "block";
  menuContainer.innerHTML = ""; // reset

  foodImages.forEach((img) => {
    const foodDiv = document.createElement("div");
    foodDiv.classList.add("food");
    foodDiv.style.backgroundImage = `url(${img})`;

    // Fullscreen click
    foodDiv.addEventListener("click", () => {
      overlayImg.src = img;
      overlay.style.display = "flex";
    });

    menuContainer.appendChild(foodDiv);
  });

  foodMenu.scrollIntoView({ behavior: "smooth" });
});

// FULLSCREEN OVERLAY
const overlay = document.getElementById("imageOverlay");
const overlayImg = document.getElementById("overlayImg");
const closeBtn = document.getElementById("closeOverlay");

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});

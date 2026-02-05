const addBtn = document.getElementById("add-to-cart");
const cartCountDisplay = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartBtn = document.getElementById("cart-btn");
const closeBtn = document.querySelector(".close");

let count = 0;

addBtn.addEventListener("click", () => {
  count++;
  cartCountDisplay.innerText = count;

  // Button animation effect
  addBtn.innerText = "Added!";
  addBtn.style.background = "#059669"; // Green

  setTimeout(() => {
    addBtn.innerText = "Add to Cart";
    addBtn.style.background = "#2563eb";
  }, 1000);
});

cartBtn.addEventListener("click", () => {
  document.getElementById("cart-items").innerHTML =
    count > 0
      ? `Product: <b>Smart Pro Watch</b> <br> Quantity: ${count}`
      : "Your cart is empty!";
  document.getElementById("cart-total").innerText = `$${count * 199}`;
  cartModal.style.display = "block";
});

closeBtn.onclick = () => (cartModal.style.display = "none");

window.onclick = (e) => {
  if (e.target == cartModal) cartModal.style.display = "none";
};

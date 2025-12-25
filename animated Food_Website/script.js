// Dark/Light toggle
const themeCheckbox = document.getElementById("theme_checkbox");
themeCheckbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});

// Cart counter
let cartCount = 0;
const cartCountElem = document.getElementById("cart-count");
const addCartBtns = document.querySelectorAll(".btn, .add-cart-footer");

addCartBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        cartCount++;
        cartCountElem.innerText = cartCount;
    });
});

// Scroll animation for footer images
const footerImages = document.querySelectorAll(".footer .images");

function scrollAnimation(){
    const triggerBottom = window.innerHeight * 0.85;
    footerImages.forEach(img=>{
        const boxTop = img.getBoundingClientRect().top;
        if(boxTop < triggerBottom){
            img.style.transform="scale(1.1)";
        } else{
            img.style.transform="scale(1)";
        }
    });
}

window.addEventListener("scroll", scrollAnimation);

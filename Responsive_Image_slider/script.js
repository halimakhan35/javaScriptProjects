const slides = document.querySelectorAll(".slider_item");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;

function showSlide(i){
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
}

nextBtn.onclick = () => {
    index = (index + 1) % slides.length;
    showSlide(index);
};

prevBtn.onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
};

/* MODAL LOGIC */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".slide_button").forEach((btn, i) => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        const slide = slides[i];
        modalImg.src = slide.dataset.image;
        modalTitle.textContent = slide.dataset.title;
        modalText.textContent = slide.dataset.text;
        modal.style.display = "flex";
    });
});

closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = e => {
    if(e.target === modal) modal.style.display = "none";
};

window.onload = function () {
    console.log("Loaded site");
  };

const hamburer = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburer) {
hamburer.addEventListener("click", () => {
navList.classList.toggle("open");
});
}

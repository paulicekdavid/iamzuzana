const navbar = document.querySelector(".navbar");
const heroContainer = document.querySelector(".hero-img");

window.addEventListener("scroll", () => {
  const heroHeight = heroContainer.offsetHeight;

  if (window.scrollY > heroHeight) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


const menu = document.getElementById("menu");
const odkazy = document.getElementById("navbarodkazy");

menu.addEventListener("click", () => {

  odkazy.classList.toggle("active");
  menu.classList.toggle("active");

});


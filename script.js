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
  
  // Změna textu podle toho, jestli je menu aktivní
  if (odkazy.classList.contains("active")) {
    menu.textContent = "Zavřít";
  } else {
    menu.textContent = "Menu";
  }
});




const viewport = document.getElementById('sliderViewport');
const track = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.review-slide');
const dotsContainer = document.getElementById('sliderDots');

let currentIndex = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// 1. Create dots dynamically
slides.forEach((_, idx) => {
  const dot = document.createElement('button');
  dot.classList.add('dot');
  if (idx === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(idx));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
  dots.forEach(d => d.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

function goToSlide(index) {
  currentIndex = Math.max(0, Math.min(index, slides.length - 1));
  prevTranslate = -currentIndex * viewport.offsetWidth;
  currentTranslate = prevTranslate;
  track.style.transition = 'transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)';
  track.style.transform = `translateX(${currentTranslate}px)`;
  updateDots();
}

// 2. Mouse & Touch Drag Events
viewport.addEventListener('pointerdown', (e) => {
  isDragging = true;
  startX = e.clientX;
  track.style.transition = 'none'; // Instant follow while dragging
  viewport.setPointerCapture(e.pointerId);
});

viewport.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const diff = e.clientX - startX;
  currentTranslate = prevTranslate + diff;
  track.style.transform = `translateX(${currentTranslate}px)`;
});

function endDrag(e) {
  if (!isDragging) return;
  isDragging = false;
  const movedBy = e.clientX - startX;

  // Snap to next/prev slide if dragged more than 60px
  if (movedBy < -60 && currentIndex < slides.length - 1) {
    currentIndex++;
  } else if (movedBy > 60 && currentIndex > 0) {
    currentIndex--;
  }

  goToSlide(currentIndex);
}

viewport.addEventListener('pointerup', endDrag);
viewport.addEventListener('pointercancel', endDrag);

// Keep alignment accurate if browser window resizes
window.addEventListener('resize', () => goToSlide(currentIndex));

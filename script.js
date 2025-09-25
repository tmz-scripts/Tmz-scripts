const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const mainContent = document.getElementById("mainContent");

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");

enterBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  setTimeout(() => {
    mainContent.classList.remove("hidden");
  }, 800);
});

menuBtn.addEventListener("click", () => {
  sidebar.style.width = "250px";
});
closeBtn.addEventListener("click", () => {
  sidebar.style.width = "0";
});

// Fade-in sekcijos
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => { observer.observe(section); });

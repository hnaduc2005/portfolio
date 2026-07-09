const root = document.documentElement;
const header = document.getElementById("header");
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const year = document.getElementById("year");

// --- Theme Management ---
const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);

  const icon = themeToggle.querySelector("i");
  const isDark = theme === "dark";
  icon.className = isDark ? "ri-sun-line" : "ri-moon-line";
  themeToggle.setAttribute("aria-label", isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối");
}

setTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

// --- Menu Mobile ---
function closeMenu() {
  navMenu.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.querySelector("i").className = "ri-menu-4-line";
}

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector("i").className = isOpen ? "ri-close-line" : "ri-menu-4-line";
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    closeMenu();
  }
});

// --- Header Scroll ---
function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 12);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// --- Advanced Scroll Animations ---
// Select all standalone reveal elements
const revealElements = document.querySelectorAll('.reveal-up, .reveal-slide-left, .reveal-slide-right, .reveal-scale');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Select all stagger parents
const staggerParents = document.querySelectorAll('.stagger-parent');

const staggerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const parent = entry.target;
        // Only select direct stagger-items to avoid deep nesting issues
        const items = Array.from(parent.children).filter(child => child.classList.contains('stagger-item'));
        
        items.forEach((item, index) => {
          // Add staggered delay
          item.style.transitionDelay = `${index * 0.1}s`;
          // Force layout recalculation so transition picks up the delay
          item.getBoundingClientRect();
          item.classList.add("show");
        });
        
        staggerObserver.unobserve(parent);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

staggerParents.forEach((parent) => staggerObserver.observe(parent));

// --- Active Nav Link on Scroll ---
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    threshold: 0.5,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// --- Contact Form Demo ---
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "Cảm ơn bạn! Form hiện là giao diện demo và chưa kết nối backend.";
  contactForm.reset();

  window.setTimeout(() => {
    formMessage.textContent = "";
  }, 4500);
});

// --- Footer Year ---
year.textContent = new Date().getFullYear();

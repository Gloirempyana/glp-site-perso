const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("open");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...navigation.querySelectorAll("a")];

const updateActiveLink = () => {
  const marker = window.scrollY + 160;
  let current = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.hash === `#${current}`);
  });
};

window.addEventListener("scroll", updateActiveLink, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();

const hour = new Date().getHours();
document.querySelector("#greeting").textContent = hour >= 18 || hour < 3 ? "Bonsoir" : "Bonjour";

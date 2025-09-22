document.addEventListener("DOMContentLoaded", function () {
  initializeWebsite();
});

function initializeWebsite() {
  hideLoadingScreen();
  setupSmoothScrolling();
  setupBackToTopButton();
  setupNavigationEffects();
  setupProductInteractions();
  setupIntersectionObserver();
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading");
  if (!loadingScreen) return;

  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    loadingScreen.style.visibility = "hidden";

    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, CONFIG.animations.loadingDuration);
}
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        updateActiveNavigation(this.getAttribute("href"));
      }
    });
  });
}

function updateActiveNavigation(targetId) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  const activeLink = document.querySelector(`a[href="${targetId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}

function setupBackToTopButton() {
  const backToTop = document.getElementById("backToTop");
  if (!backToTop) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });
}

function setupNavigationEffects() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

function setupProductInteractions() {
  const orderButtons = document.querySelectorAll(".btn-order");
  orderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productName = this.getAttribute("data-product");
      if (productName) {
        orderProduct(productName);
      }
    });
  });
}

function setupIntersectionObserver() {
  const elements = document.querySelectorAll(".fade-in, .slide-up, .zoom-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));
}
window.addEventListener("DOMContentLoaded", function () {
  const year = new Date().getFullYear();
  const copyright = document.getElementById("copyright-year");
  if (copyright) {
    copyright.innerHTML = `&copy; ${year} Arte Floral que Perdura. Todos los derechos reservados.`;
  }
});

window.addEventListener("load", function () {
  document.getElementById("loading").style.display = "none";
});

function orderProduct(productName) {
  openWhatsApp(productName);
}

function openWhatsApp(product = "") {
  const phone = "573134047407";
  const baseMessage = "%F0%9F%8C%B8%20%C2%A1Hola!%20%F0%9F%8C%B8%0AHe%20visto%20sus%20flores%20artesanales%20y%20me%20encantaron%20%F0%9F%92%90%E2%9C%A8";
  const endMessage = "%0A%C2%BFPodr%C3%ADan%20ayudarme%20con%20mi%20pedido%3F%20%F0%9F%98%8A%0A%C2%A1Gracias!%20%F0%9F%99%8F";
  let productMessage = "";
  if (product) {
    productMessage = "%0AMe%20gustar%C3%ADa%20pedir:%20" + encodeURIComponent(product);
  }
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${baseMessage}${productMessage}${endMessage}`;
  window.open(url, "_blank");
}

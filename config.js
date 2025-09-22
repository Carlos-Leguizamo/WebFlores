// ========================================
// FUNCIONES PRINCIPALES DEL SITIO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ========================================
// INICIALIZACIÓN
// ========================================

function initializeWebsite() {
    hideLoadingScreen();
    setupSmoothScrolling();
    setupBackToTopButton();
    setupNavigationEffects();
    setupProductInteractions();
    setupIntersectionObserver();
    
    console.log('🌸 Arte Floral que Perdura - Sitio inicializado correctamente');
}

// ========================================
// PANTALLA DE CARGA
// ========================================

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading');
    if (!loadingScreen) return;

    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, CONFIG.animations.loadingDuration);
}

// ========================================
// NAVEGACIÓN SUAVE
// ========================================

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                updateActiveNavigation(this.getAttribute('href'));
            }
        });
    });
}

// Actualizar navegación activa
function updateActiveNavigation(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`a[href="${targetId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// ========================================
// BOTÓN BACK TO TOP
// ========================================

function setupBackToTopButton() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

// ========================================
// EFECTOS DE NAVEGACIÓN
// ========================================

function setupNavigationEffects() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// INTERACCIONES DE PRODUCTOS
// ========================================

function setupProductInteractions() {
    const orderButtons = document.querySelectorAll('.btn-order');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            if (productName) {
                orderProduct(productName);
            }
        });
    });
}

// ========================================
// ANIMACIONES CON INTERSECTION OBSERVER
// ========================================

function setupIntersectionObserver() {
    const elements = document.querySelectorAll('.fade-in, .slide-up, .zoom-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
}

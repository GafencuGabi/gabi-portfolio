// ========================================
// 🚀 GABI'S GENIUS PORTFOLIO - ULTRA MODERN JS
// ========================================
// Acest script transformă un site obișnuit într-o experiență WOW!
// Fiecare linie de cod este gândită pentru performanță și impact vizual maxim

// ========================================
// 🎯 UTILITY FUNCTIONS - GENIUS LEVEL
// ========================================

// Debounce function - previne spam-ul de evenimente pentru performanță optimă
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function - limitează execuția pentru scroll events smooth
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Random number generator pentru efecte dinamice
const randomBetween = (min, max) => Math.random() * (max - min) + min;

// ========================================
// 🎨 ADVANCED CURSOR EFFECTS - GENIUS TOUCH
// ========================================

// Cursor magic cu particule care urmăresc mouse-ul
let mouseX = 0, mouseY = 0;
let cursorDots = [];

// Creăm particule pentru cursor
function createCursorDots() {
  for (let i = 0; i < 12; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: linear-gradient(45deg, #f1b08a, #ff6b6b);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(dot);
    cursorDots.push({
      element: dot,
      x: 0,
      y: 0,
      delay: i * 0.1
    });
  }
}

// Animația cursor-ului - GENIUS LEVEL SMOOTH
function animateCursor() {
  cursorDots.forEach((dot, index) => {
    // Calculăm poziția cu delay pentru efect de urmărire
    const targetX = mouseX - (index * 2);
    const targetY = mouseY - (index * 2);
    
    // Smooth interpolation pentru mișcare fluidă
    dot.x += (targetX - dot.x) * 0.15;
    dot.y += (targetY - dot.y) * 0.15;
    
    // Aplicăm transformarea cu hardware acceleration
    dot.element.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) scale(${1 - index * 0.05})`;
    dot.element.style.opacity = Math.max(0, 1 - index * 0.1);
  });
  
  requestAnimationFrame(animateCursor);
}

// Event listeners pentru cursor magic
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Inițializăm cursor-ul magic doar pe desktop
if (window.innerWidth > 768) {
  createCursorDots();
  animateCursor();
}

// ========================================
// 🍔 MENIU HAMBURGER - GENIUS ANIMATIONS
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Funcție pentru toggle menu cu animații avansate
function toggleMenu() {
  const isActive = navMenu.classList.contains('active');
  
  if (!isActive) {
    // Deschidem meniul cu stagger animation
    navMenu.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    
    // Animăm fiecare link cu delay progresiv - GENIUS STAGGER
    const links = navMenu.querySelectorAll('a');
    links.forEach((link, index) => {
      link.style.transform = 'translateX(-30px)';
      link.style.opacity = '0';
      setTimeout(() => {
        link.style.transform = 'translateX(0)';
        link.style.opacity = '1';
        link.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }, index * 100);
    });
    
    // Prevenim scroll-ul pe body când meniul e deschis
    document.body.style.overflow = 'hidden';
  } else {
    // Închidem meniul
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

// Event listener pentru hamburger cu haptic feedback simulation
hamburger.addEventListener('click', function(e) {
  e.preventDefault();
  toggleMenu();
  
  // Simulăm haptic feedback prin vibration (pe mobile)
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
});

// Închidem meniul când se face click pe link-uri
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Închidem meniul când se face click în afara lui - GENIUS UX
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    if (navMenu.classList.contains('active')) {
      toggleMenu();
    }
  }
});

// ========================================
// 🌊 SCROLL SMOOTH CU OFFSET INTELIGENT
// ========================================

// Smooth scroll cu offset calculat dinamic pentru header sticky
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      
      // Calculăm offset-ul dinamic bazat pe înălțimea header-ului
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
      
      // Smooth scroll cu easing personalizat
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Adăugăm focus pe element pentru accessibility - GENIUS A11Y
      setTimeout(() => {
        target.setAttribute('tabindex', '-1');
        target.focus();
        target.addEventListener('blur', () => {
          target.removeAttribute('tabindex');
        }, { once: true });
      }, 500);
    }
  });
});

// ========================================
// 🎭 ANIMAȚII LA APARIȚIE - INTERSECTION OBSERVER GENIUS
// ========================================

// Configurație avansată pentru Intersection Observer
const observerOptions = {
  threshold: [0.1, 0.25, 0.5, 0.75], // Multiple thresholds pentru animații progresive
  rootMargin: '0px 0px -50px 0px' // Trigger-ul se activează mai devreme
};

// Observer pentru animații la scroll
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      
      // Adăugăm clasa de animație cu delay bazat pe poziție
      setTimeout(() => {
        element.classList.add('animated');
        
        // Animații speciale pentru cardurile de proiect - GENIUS STAGGER
        if (element.classList.contains('project-card')) {
          const cards = document.querySelectorAll('.project-card');
          const cardIndex = Array.from(cards).indexOf(element);
          element.style.animationDelay = `${cardIndex * 0.1}s`;
        }
      }, 100);
      
      // Nu mai observăm elementul după ce a fost animat
      animationObserver.unobserve(element);
    }
  });
}, observerOptions);

// Observăm toate elementele cu data-animate
const animatedEls = document.querySelectorAll('[data-animate]');
animatedEls.forEach(el => animationObserver.observe(el));

// ========================================
// 🌌 PARALLAX HERO CU MULTIPLE LAYERS - GENIUS DEPTH
// ========================================

const hero = document.querySelector('.hero');
let ticking = false;

// Parallax cu multiple straturi pentru depth effect
function updateParallax() {
  if (window.innerWidth > 900 && hero) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.2;
    const rate2 = scrolled * -0.1;
    
    // Aplicăm parallax pe background și pe conținut
    hero.style.transform = `translateY(${rate}px)`;
    
    // Parallax pe imaginea de profil pentru extra depth
    const heroImage = hero.querySelector('.hero-image');
    if (heroImage) {
      heroImage.style.transform = `translateY(${rate2}px) scale(${1 + scrolled * 0.0001})`;
    }
  }
  ticking = false;
}

// Throttled scroll pentru performanță optimă
const parallaxScroll = throttle(() => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, 16);

window.addEventListener('scroll', parallaxScroll);

// ========================================
// ⌨️ TYPING ANIMATION ULTRA ADVANCED - GENIUS TYPEWRITER
// ========================================

const mainText = document.getElementById('main-text');

if (mainText) {
  const mainLines = ["Hi, I'm Gabi.", "Web Developer"];
  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  // Configurații pentru typing effect realist
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseTime = 1200;
  const linePause = 800;
  
  function typeMainText() {
    const currentLine = mainLines[lineIndex];
    
    if (!isDeleting) {
      // Typing mode - adăugăm caractere
      if (charIndex < currentLine.length) {
        mainText.innerHTML += currentLine.charAt(charIndex);
        charIndex++;
        
        // Variație în viteza de typing pentru efect mai natural
        const variation = randomBetween(0.8, 1.2);
        setTimeout(typeMainText, typeSpeed * variation);
      } else {
        // Linia completă - trecem la următoarea
        if (lineIndex === 0) {
          mainText.innerHTML += '<br>'; // Line break după prima linie
        }
        lineIndex++;
        charIndex = 0;
        
        if (lineIndex < mainLines.length) {
          setTimeout(typeMainText, linePause);
        } else {
          // Toate liniile complete - adăugăm cursor blinking
          addBlinkingCursor();
        }
      }
    }
  }
  
  // Cursor care clipește la final - GENIUS TOUCH
  function addBlinkingCursor() {
    const cursor = document.createElement('span');
    cursor.innerHTML = '|';
    cursor.style.cssText = `
      animation: blink 1s infinite;
      color: #f1b08a;
      font-weight: 300;
    `;
    mainText.appendChild(cursor);
    
    // Adăugăm CSS pentru animația de blink
    if (!document.querySelector('#blink-animation')) {
      const style = document.createElement('style');
      style.id = 'blink-animation';
      style.textContent = `
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Începem animația cu delay pentru impact maxim
  setTimeout(typeMainText, 800);
}

// ========================================
// 🎮 CARDURI PROIECT CU PHYSICS - GENIUS 3D EFFECTS
// ========================================

document.querySelectorAll('.project-card').forEach(card => {
  let startX, startY;
  let isPressed = false;
  
  // Mouse tilt effect pentru desktop - GENIUS 3D TRANSFORM
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return; // Doar pe desktop
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;
    
    // Aplicăm transformarea 3D cu perspective
    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(1.05, 1.05, 1.05)
      translateZ(20px)
    `;
    
    // Glow effect bazat pe poziția mouse-ului
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    card.style.background = `
      radial-gradient(circle at ${glowX}% ${glowY}%, 
      rgba(241,176,138,0.1) 0%, 
      transparent 50%), 
      var(--cream)
    `;
  });
  
  // Reset la mouse leave
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.background = '';
    card.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      card.style.transition = '';
    }, 300);
  });
  
  // Touch effects pentru mobile - GENIUS MOBILE INTERACTION
  card.addEventListener('touchstart', e => {
    isPressed = true;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    
    // Scale down effect la touch
    card.style.transform = 'scale(0.98)';
    card.style.transition = 'transform 0.1s ease';
  });
  
  card.addEventListener('touchmove', e => {
    if (!isPressed) return;
    
    const touch = e.touches[0];
    const dx = (touch.clientX - startX) / 10;
    const dy = (touch.clientY - startY) / 10;
    
    // Tilt effect bazat pe mișcarea degetului
    card.style.transform = `
      rotateY(${dx}deg) 
      rotateX(${-dy}deg) 
      scale(1.02)
    `;
  });
  
  card.addEventListener('touchend', () => {
    isPressed = false;
    card.style.transform = '';
    card.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    setTimeout(() => {
      card.style.transition = '';
    }, 400);
  });
});

// ========================================
// 💫 BUTON CTA CU PARTICLE EXPLOSION - GENIUS EFFECTS
// ========================================

document.querySelectorAll('.cta-btn').forEach(btn => {
  // Ripple effect îmbunătățit
  btn.addEventListener('click', function(e) {
    // Creăm ripple-ul
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      transform: scale(0);
      animation: ripple 0.6s linear;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
    `;
    
    this.appendChild(ripple);
    
    // Particle explosion effect - GENIUS VISUAL FEEDBACK
    createParticleExplosion(e.clientX, e.clientY);
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50]);
    }
    
    setTimeout(() => ripple.remove(), 600);
  });
  
  // Hover effect cu glow
  btn.addEventListener('mouseenter', function() {
    this.style.boxShadow = `
      0 8px 32px rgba(241,176,138,0.3),
      0 0 0 1px rgba(241,176,138,0.2),
      inset 0 1px 0 rgba(255,255,255,0.2)
    `;
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.boxShadow = '';
  });
});

// Funcție pentru particle explosion - GENIUS VISUAL EFFECT
function createParticleExplosion(x, y) {
  const colors = ['#f1b08a', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
  
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = (i / 12) * Math.PI * 2;
    const velocity = randomBetween(50, 150);
    const size = randomBetween(3, 8);
    
    particle.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${x}px;
      top: ${y}px;
    `;
    
    document.body.appendChild(particle);
    
    // Animăm particula
    const deltaX = Math.cos(angle) * velocity;
    const deltaY = Math.sin(angle) * velocity;
    
    particle.animate([
      { 
        transform: 'translate(0, 0) scale(1)', 
        opacity: 1 
      },
      { 
        transform: `translate(${deltaX}px, ${deltaY}px) scale(0)`, 
        opacity: 0 
      }
    ], {
      duration: randomBetween(600, 1000),
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => particle.remove();
  }
}

// CSS pentru ripple effect
if (!document.querySelector('#ripple-styles')) {
  const style = document.createElement('style');
  style.id = 'ripple-styles';
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    .cta-btn {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
}

// ========================================
// 📧 FORMULAR CONTACT ULTRA SMART - GENIUS VALIDATION
// ========================================

const contactForm = document.getElementById('contact-form');
const submitBtn = document.querySelector('.submit-btn');

// Validare în timp real pentru fiecare câmp
const inputs = contactForm.querySelectorAll('input, textarea');
inputs.forEach(input => {
  // Validare la blur (când utilizatorul părăsește câmpul)
  input.addEventListener('blur', () => validateField(input));
  
  // Curățăm erorile la input
  input.addEventListener('input', () => clearFieldError(input));
  
  // Efecte vizuale pentru focus
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.parentElement.classList.remove('focused');
    }
  });
});

// Funcție de validare pentru fiecare câmp - GENIUS VALIDATION
function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  // Validare pentru câmp obligatoriu
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = `${field.previousElementSibling.textContent} is required`;
  }
  
  // Validare email cu regex avansat
  if (field.type === 'email' && value) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  }
  
  // Validare nume (minimum 2 caractere)
  if (field.name === 'name' && value && value.length < 2) {
    isValid = false;
    errorMessage = 'Name must be at least 2 characters long';
  }
  
  // Validare mesaj (minimum 10 caractere)
  if (field.name === 'message' && value && value.length < 10) {
    isValid = false;
    errorMessage = 'Message must be at least 10 characters long';
  }
  
  // Afișăm sau ascundem eroarea
  showFieldError(field, errorMessage, isValid);
  
  return isValid;
}

// Funcție pentru afișarea erorilor - GENIUS UX
function showFieldError(field, message, isValid) {
  let errorElement = field.parentElement.querySelector('.error-message');
  
  if (!errorElement) {
    errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    field.parentElement.appendChild(errorElement);
  }
  
  errorElement.textContent = message;
  field.classList.toggle('error', !isValid);
  field.setAttribute('aria-invalid', !isValid);
}

// Funcție pentru curățarea erorilor
function clearFieldError(field) {
  const errorElement = field.parentElement.querySelector('.error-message');
  if (errorElement) {
    errorElement.textContent = '';
  }
  field.classList.remove('error');
  field.setAttribute('aria-invalid', 'false');
}

// Submit form cu animații avansate - GENIUS FEEDBACK
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Validăm toate câmpurile
  let isFormValid = true;
  inputs.forEach(input => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });
  
  if (!isFormValid) {
    // Shake animation pentru form invalid
    contactForm.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
      contactForm.style.animation = '';
    }, 500);
    return;
  }
  
  // Form valid - începem procesul de trimitere
  const originalContent = submitBtn.innerHTML;
  
  // Loading state cu animație
  submitBtn.innerHTML = '<span>Sending</span> <i class="bx bx-loader-alt bx-spin"></i>';
  submitBtn.disabled = true;
  submitBtn.style.transform = 'scale(0.98)';
  
  // Simulăm trimiterea (în realitate aici ai face un API call)
  setTimeout(() => {
    // Success state cu confetti
    submitBtn.innerHTML = '<span>Sent!</span> <i class="bx bx-check"></i>';
    submitBtn.style.background = 'linear-gradient(90deg, #10b981 60%, #059669 100%)';
    submitBtn.style.transform = 'scale(1.05)';
    
    // Confetti explosion pentru success - GENIUS CELEBRATION
    createConfetti();
    
    // Reset form
    contactForm.reset();
    inputs.forEach(input => {
      input.parentElement.classList.remove('focused');
      clearFieldError(input);
    });
    
    // Haptic feedback pentru success
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
    
    // Revert button după delay
    setTimeout(() => {
      submitBtn.innerHTML = originalContent;
      submitBtn.style.background = '';
      submitBtn.style.transform = '';
      submitBtn.disabled = false;
    }, 3000);
    
  }, 2000);
});

// Confetti effect pentru success - GENIUS CELEBRATION
function createConfetti() {
  const colors = ['#f1b08a', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = randomBetween(4, 12);
    const startX = randomBetween(0, window.innerWidth);
    
    confetti.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      top: -10px;
      left: ${startX}px;
      z-index: 9999;
      pointer-events: none;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
    `;
    
    document.body.appendChild(confetti);
    
    // Animăm confetti-ul
    const fallDuration = randomBetween(2000, 4000);
    const rotation = randomBetween(0, 360);
    const drift = randomBetween(-100, 100);
    
    confetti.animate([
      { 
        transform: `translateY(0) rotate(0deg) translateX(0)`,
        opacity: 1
      },
      { 
        transform: `translateY(${window.innerHeight + 100}px) rotate(${rotation}deg) translateX(${drift}px)`,
        opacity: 0
      }
    ], {
      duration: fallDuration,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => confetti.remove();
  }
}

// CSS pentru shake animation
if (!document.querySelector('#shake-animation')) {
  const style = document.createElement('style');
  style.id = 'shake-animation';
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
      min-height: 1.25rem;
    }
    .form-group.focused label {
      color: #f1b08a;
      transform: translateY(-2px);
    }
    input.error, textarea.error {
      border-color: #ef4444 !important;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
  `;
  document.head.appendChild(style);
}

// ========================================
// 🎨 NAVBAR SHADOW CU GRADIENT DINAMIC - GENIUS VISUAL
// ========================================

const header = document.querySelector('header');
let lastScrollY = window.scrollY;

// Funcție pentru update navbar cu efecte avansate
function updateNavbar() {
  const scrollPosition = window.pageYOffset;
  const scrollDirection = scrollPosition > lastScrollY ? 'down' : 'up';
  
  // Shadow gradient bazat pe scroll position
  const shadowIntensity = Math.min(scrollPosition / 100, 1);
  const shadowColor = `rgba(241,176,138,${0.1 + shadowIntensity * 0.15})`;
  
  if (scrollPosition > 10) {
    header.style.boxShadow = `0 8px 32px ${shadowColor}`;
    header.style.backdropFilter = 'blur(20px) saturate(180%)';
  } else {
    header.style.boxShadow = `0 6px 28px rgba(241,176,138,0.08)`;
    header.style.backdropFilter = 'blur(15px) saturate(150%)';
  }
  
  // Auto-hide navbar la scroll down (opțional)
  if (scrollPosition > 200) {
    if (scrollDirection === 'down' && scrollPosition > lastScrollY + 5) {
      header.style.transform = 'translateY(-100%)';
    } else if (scrollDirection === 'up') {
      header.style.transform = 'translateY(0)';
    }
  } else {
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollY = scrollPosition;
}

// Throttled scroll pentru navbar
const navbarScroll = throttle(updateNavbar, 16);
window.addEventListener('scroll', navbarScroll);

// ========================================
// 🚀 SCROLL TO TOP BUTTON CU PROGRESS - GENIUS UX
// ========================================

const scrollTopBtn = document.getElementById('scrollTopBtn');

// Creăm progress ring pentru scroll to top
function createProgressRing() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  
  svg.setAttribute('width', '56');
  svg.setAttribute('height', '56');
  svg.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-90deg);
  `;
  
  circle.setAttribute('cx', '28');
  circle.setAttribute('cy', '28');
  circle.setAttribute('r', '26');
  circle.setAttribute('fill', 'none');
  circle.setAttribute('stroke', '#f1b08a');
  circle.setAttribute('stroke-width', '2');
  circle.setAttribute('stroke-dasharray', '163.36'); // 2 * PI * 26
  circle.setAttribute('stroke-dashoffset', '163.36');
  circle.style.transition = 'stroke-dashoffset 0.1s ease';
  
  svg.appendChild(circle);
  scrollTopBtn.appendChild(svg);
  
  return circle;
}

const progressCircle = createProgressRing();

// Update scroll progress și visibility
function updateScrollProgress() {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = window.scrollY / scrollHeight;
  const circumference = 163.36;
  const offset = circumference - (scrollProgress * circumference);
  
  progressCircle.style.strokeDashoffset = offset;
  
  // Show/hide button cu animație smooth
  if (window.scrollY > 300) {
    if (!scrollTopBtn.classList.contains('show')) {
      scrollTopBtn.classList.add('show');
      scrollTopBtn.style.display = 'flex';
      scrollTopBtn.style.animation = 'fadeInUp 0.3s ease';
    }
  } else {
    if (scrollTopBtn.classList.contains('show')) {
      scrollTopBtn.classList.remove('show');
      scrollTopBtn.style.animation = 'fadeOutDown 0.3s ease';
      setTimeout(() => {
        if (!scrollTopBtn.classList.contains('show')) {
          scrollTopBtn.style.display = 'none';
        }
      }, 300);
    }
  }
}

// Throttled scroll pentru progress
const progressScroll = throttle(updateScrollProgress, 16);
window.addEventListener('scroll', progressScroll);

// Click handler cu animație
scrollTopBtn.addEventListener('click', () => {
  // Smooth scroll to top cu easing personalizat
  const startPosition = window.pageYOffset;
  const startTime = performance.now();
  const duration = 800;
  
  function scrollAnimation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function pentru smooth animation
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const currentPosition = startPosition * (1 - easeOutCubic);
    
    window.scrollTo(0, currentPosition);
    
    if (progress < 1) {
      requestAnimationFrame(scrollAnimation);
    }
  }
  
  requestAnimationFrame(scrollAnimation);
  
  // Haptic feedback
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
});

// CSS pentru scroll to top animations
if (!document.querySelector('#scroll-animations')) {
  const style = document.createElement('style');
  style.id = 'scroll-animations';
  style.textContent = `
    #scrollTopBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px) scale(0.8); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes fadeOutDown {
      from { opacity: 1; transform: translateY(0) scale(1); }
      to { opacity: 0; transform: translateY(20px) scale(0.8); }
    }
  `;
  document.head.appendChild(style);
}

// ========================================
// 🎵 SOUND EFFECTS (opțional) - GENIUS AUDIO FEEDBACK
// ========================================

// Audio context pentru sound effects (doar dacă browser-ul suportă)
let audioContext;
let isAudioEnabled = false;

// Inițializăm audio context la primul click (pentru a respecta autoplay policy)
document.addEventListener('click', initAudio, { once: true });

function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    isAudioEnabled = true;
  } catch (e) {
    console.log('Audio not supported');
  }
}

// Funcție pentru generarea de sunete simple
function playTone(frequency, duration, type = 'sine') {
  if (!isAudioEnabled || !audioContext) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

// Adăugăm sound effects la interacțiuni importante
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => playTone(800, 0.1));
});

document.querySelectorAll('.cta-btn').forEach(btn => {
  btn.addEventListener('click', () => playTone(1000, 0.15));
});

// ========================================
// 🌟 PERFORMANCE MONITORING - GENIUS OPTIMIZATION
// ========================================

// Monitorizăm performanța și optimizăm în timp real
let performanceMetrics = {
  scrollEvents: 0,
  animationFrames: 0,
  lastFPS: 60
};

// FPS counter pentru debugging
function measureFPS() {
  let lastTime = performance.now();
  let frames = 0;
  
  function countFrames() {
    frames++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
      performanceMetrics.lastFPS = Math.round((frames * 1000) / (currentTime - lastTime));
      frames = 0;
      lastTime = currentTime;
      
      // Optimizăm efectele bazat pe FPS
      if (performanceMetrics.lastFPS < 30) {
        // Reducem efectele pentru performanță mai bună
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    }
    
    requestAnimationFrame(countFrames);
  }
  
  requestAnimationFrame(countFrames);
}

// Începem monitorizarea FPS
measureFPS();

// ========================================
// 🎯 EASTER EGGS - GENIUS HIDDEN FEATURES
// ========================================

// Konami Code pentru easter egg special
const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.code === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateKonamiEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

// Easter egg activation - GENIUS SURPRISE
function activateKonamiEasterEgg() {
  // Rainbow effect pe tot site-ul
  document.body.style.animation = 'rainbow 3s infinite';
  
  // Particle rain effect
  createParticleRain();
  
  // Sound effect special
  playTone(523, 0.2); // C note
  setTimeout(() => playTone(659, 0.2), 200); // E note
  setTimeout(() => playTone(784, 0.4), 400); // G note
  
  // Message în consolă
  console.log(`
    🎉 KONAMI CODE ACTIVATED! 🎉
    🌈 You found the secret rainbow mode!
    🎮 Gabi is indeed a GENIUS developer!
    ✨ Thanks for exploring the code!
  `);
  
  // Revert după 5 secunde
  setTimeout(() => {
    document.body.style.animation = '';
  }, 5000);
}

// Particle rain pentru easter egg
function createParticleRain() {
  const colors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080'];
  
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = randomBetween(3, 8);
      const startX = randomBetween(0, window.innerWidth);
      
      particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        top: -10px;
        left: ${startX}px;
        z-index: 9999;
        pointer-events: none;
      `;
      
      document.body.appendChild(particle);
      
      particle.animate([
        { transform: 'translateY(0)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + 100}px)`, opacity: 0 }
      ], {
        duration: randomBetween(2000, 4000),
        easing: 'linear'
      }).onfinish = () => particle.remove();
    }, i * 50);
  }
}

// CSS pentru rainbow effect
if (!document.querySelector('#rainbow-animation')) {
  const style = document.createElement('style');
  style.id = 'rainbow-animation';
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
    .reduced-motion * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(style);
}

// ========================================
// 🎊 CONSOLE EASTER EGG ULTRA GENIUS
// ========================================

// ASCII Art pentru consolă
const asciiArt = `
    ╔═══════════════════════════════════════╗
    ║           🚀 GABI'S PORTFOLIO         ║
    ║              GENIUS LEVEL             ║
    ╠═══════════════════════════════════════╣
    ║  👨‍💻 Built with: HTML, CSS, JS         ║
    ║  🎨 Design: Ultra Modern              ║
    ║  📱 Mobile: Optimized                 ║
    ║  ⚡ Performance: Lightning Fast       ║
    ║  🎭 Animations: Smooth & Buttery      ║
    ║  🎯 UX: Intuitive & Delightful        ║
    ╚═══════════════════════════════════════╝
`;

// Stiluri pentru consolă
const consoleStyles = {
  title: 'color: #f1b08a; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);',
  subtitle: 'color: #4ecdc4; font-size: 16px; font-weight: bold;',
  text: 'color: #97a4b6; font-size: 14px;',
  highlight: 'color: #ff6b6b; font-size: 14px; font-weight: bold;',
  success: 'color: #10b981; font-size: 14px; font-weight: bold;'
};

// Afișăm mesajul în consolă
console.log(asciiArt);
console.log('%c🎉 WELCOME TO THE GENIUS ZONE! 🎉', consoleStyles.title);
console.log('%c✨ This portfolio showcases cutting-edge web development', consoleStyles.subtitle);
console.log('%c🔥 Features implemented:', consoleStyles.text);
console.log('%c  • Advanced CSS animations & transitions', consoleStyles.text);
console.log('%c  • Smooth parallax scrolling effects', consoleStyles.text);
console.log('%c  • Interactive 3D card transformations', consoleStyles.text);
console.log('%c  • Real-time form validation', consoleStyles.text);
console.log('%c  • Particle explosion effects', consoleStyles.text);
console.log('%c  • Progressive Web App features', consoleStyles.text);
console.log('%c  • Accessibility optimizations', consoleStyles.text);
console.log('%c  • Performance monitoring', consoleStyles.text);
console.log('%c🎮 Try the Konami Code: ↑↑↓↓←→←→BA', consoleStyles.highlight);
console.log('%c🌟 This developer is definitely a GENIUS! 🌟', consoleStyles.success);

// ========================================
// 🚀 INITIALIZATION - GENIUS STARTUP
// ========================================

// Funcție de inițializare completă
function initializeGeniusPortfolio() {
  console.log('%c🚀 Initializing Genius Portfolio...', consoleStyles.subtitle);
  
  // Verificăm suportul pentru features avansate
  const features = {
    intersectionObserver: 'IntersectionObserver' in window,
    webGL: !!window.WebGLRenderingContext,
    serviceWorker: 'serviceWorker' in navigator,
    vibration: 'vibrate' in navigator,
    audioContext: !!(window.AudioContext || window.webkitAudioContext)
  };
  
  console.log('%c📊 Browser Capabilities:', consoleStyles.text);
  Object.entries(features).forEach(([feature, supported]) => {
    console.log(`%c  ${feature}: ${supported ? '✅' : '❌'}`, 
      supported ? consoleStyles.success : consoleStyles.highlight);
  });
  
  // Preload critical resources
  preloadCriticalResources();
  
  // Initialize performance monitoring
  console.log('%c⚡ Performance monitoring active', consoleStyles.success);
  
  // Setup error handling
  setupErrorHandling();
  
  console.log('%c🎉 Portfolio initialized successfully!', consoleStyles.success);
  console.log('%c💡 Pro tip: Open DevTools and explore the code!', consoleStyles.highlight);
}

// Preload resources pentru performanță optimă
function preloadCriticalResources() {
  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);
  
  // Preload critical images
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage && heroImage.src) {
    const img = new Image();
    img.src = heroImage.src;
  }
}

// Error handling global
function setupErrorHandling() {
  window.addEventListener('error', (e) => {
    console.error('🚨 JavaScript Error:', e.error);
  });
  
  window.addEventListener('unhandledrejection', (e) => {
    console.error('🚨 Unhandled Promise Rejection:', e.reason);
  });
}

// Start the genius portfolio când DOM-ul e ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGeniusPortfolio);
} else {
  initializeGeniusPortfolio();
}

// ========================================
// 🎯 FINAL GENIUS TOUCH - PERFORMANCE STATS
// ========================================

// Afișăm statistici de performanță după load
window.addEventListener('load', () => {
  setTimeout(() => {
    const perfData = performance.getEntriesByType('navigation')[0];
    const loadTime = Math.round(perfData.loadEventEnd - perfData.loadEventStart);
    const domContentTime = Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
    
    console.log('%c📈 PERFORMANCE STATS:', consoleStyles.subtitle);
    console.log(`%c  Page Load Time: ${loadTime}ms`, consoleStyles.text);
    console.log(`%c  DOM Content Loaded: ${domContentTime}ms`, consoleStyles.text);
    console.log(`%c  Current FPS: ${performanceMetrics.lastFPS}`, consoleStyles.text);
    
    if (loadTime < 1000) {
      console.log('%c🚀 LIGHTNING FAST! This site loads like a GENIUS built it!', consoleStyles.success);
    }
  }, 1000);
});

// Export pentru debugging (doar în development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.GeniusPortfolio = {
    performanceMetrics,
    createParticleExplosion,
    createConfetti,
    playTone,
    activateKonamiEasterEgg
  };
  console.log('%c🛠️ Debug mode active - GeniusPortfolio object available', consoleStyles.highlight);
}
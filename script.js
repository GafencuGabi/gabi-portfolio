// ========== MENIU HAMBURGER ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click', function() {
  navMenu.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active') ? 'true' : 'false');
});
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ========== SCROLL SMOOTH ==========
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========== ANIMATII LA APARITIE ==========
const animatedEls = document.querySelectorAll('[data-animate]');
const observer = new window.IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
animatedEls.forEach(el => observer.observe(el));

// ========== PARALLAX HERO (efect wow la scroll) ==========
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (window.innerWidth > 900 && hero) {
    const offset = window.scrollY * 0.2;
    hero.style.backgroundPosition = `center ${offset}px`;
  }
});

// ========== TYPING ANIMATION LA TITLU HERO (multi-linie) ==========
const welcomeText = document.getElementById('welcome-text');
const mainText = document.getElementById('main-text');

if (welcomeText && mainText) {
  const welcomeLine = "Welcome.";
  const mainLines = ["Hi, I'm Gabi.", "Frontend Developer"];
  
  let charIndex = 0;
  
  // Primul pas: typing pentru "Welcome."
  function typeWelcome() {
    if (charIndex < welcomeLine.length) {
      welcomeText.textContent += welcomeLine.charAt(charIndex);
      charIndex++;
      setTimeout(typeWelcome, 60);
    } else {
      // După "Welcome.", începem cu restul textului
      setTimeout(typeMainText, 800);
    }
  }
  
  // Al doilea pas: typing pentru restul textului
  let lineIndex = 0;
  let mainCharIndex = 0;
  
  function typeMainText() {
    if (lineIndex < mainLines.length) {
      const line = mainLines[lineIndex];
      if (mainCharIndex < line.length) {
        mainText.textContent += line.charAt(mainCharIndex);
        mainCharIndex++;
        setTimeout(typeMainText, 60);
      } else {
        mainCharIndex = 0;
        lineIndex++;
        mainText.textContent += '\n'; // Linie nouă
        setTimeout(typeMainText, 800);
      }
    }
  }
  
  // Începem animația
  setTimeout(typeWelcome, 600);
}

// ========== CARDURI PROIECT CU EFECT DE TILT LA TOUCH ==========
document.querySelectorAll('.project-card').forEach(card => {
  let startX, startY;
  card.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
  });
  card.addEventListener('touchmove', e => {
    const touch = e.touches[0];
    const dx = (touch.clientX - startX) / 8;
    const dy = (touch.clientY - startY) / 8;
    card.style.transform = `rotateY(${dx}deg) rotateX(${-dy}deg) scale(1.03)`;
  });
  card.addEventListener('touchend', () => {
    card.style.transform = '';
  });
});

// ========== BUTON CTA CU EFECT DE RIPPLE LA TOUCH ==========
document.querySelectorAll('.cta-btn').forEach(btn => {
  btn.addEventListener('touchstart', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${e.touches[0].clientX - btn.getBoundingClientRect().left}px`;
    ripple.style.top = `${e.touches[0].clientY - btn.getBoundingClientRect().top}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ========== FORMULAR CONTACT (efect de loading) ==========
const contactForm = document.getElementById('contact-form');
const submitBtn = document.querySelector('.submit-btn');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  submitBtn.innerHTML = '<span>Sending...</span> <i class="bx bx-loader-alt bx-spin"></i>';
  submitBtn.disabled = true;
  setTimeout(() => {
    submitBtn.innerHTML = '<span>Sent!</span> <i class="bx bx-check"></i>';
    submitBtn.style.background = 'linear-gradient(90deg, #10b981 60%, #059669 100%)';
    contactForm.reset();
    setTimeout(() => {
      submitBtn.innerHTML = '<span>Send Message</span> <i class="bx bx-send"></i>';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 2500);
  }, 1800);
});

// ========== NAVBAR SHADOW LA SCROLL ==========
const header = document.querySelector('header');
window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset;
  if (scrollPosition > 10) {
    header.style.boxShadow = '0 8px 32px rgba(37,99,235,0.15)';
  } else {
    header.style.boxShadow = '0 6px 28px rgba(37,99,235,0.12)';
  }
});

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if(window.scrollY > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== CONSOLE EASTER EGG ==========
console.log(`
🚀 Welcome to Gabi's Portfolio!
👨‍💻 Built with love, HTML, CSS & JavaScript
🌟 Thanks for checking out the code!
Mobile optimized with WOW effects! 📱✨
`);
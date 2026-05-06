// Smooth scroll
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

// Scroll animation
const elements = document.querySelectorAll('.fade-in');

function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.8;

  elements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', showOnScroll);

// Toggle Mobile Menu
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

menu.addEventListener('click', () => {
  menuLinks.classList.toggle('active');
  menu.classList.toggle('active');
});

navItems.forEach(link => {
  link.addEventListener('click', () => {
    if (menuLinks.classList.contains('active')) {
      menuLinks.classList.remove('active');
      menu.classList.remove('active');
    }
  });
});

// Advanced Intersection Observer for staggered reveals
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      
      // If it's a section with cards, stagger their reveal
      const cards = entry.target.querySelectorAll('.card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('show');
        }, index * 150); // 150ms delay between each card
      });
      
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

// Initialize the observer on all sections
document.querySelectorAll('.section').forEach(el => {
  el.classList.add('fade');
  observer.observe(el);
  
  // Hide cards initially for the stagger effect
  el.querySelectorAll('.card').forEach(card => {
    card.classList.add('fade');
  });
});

// --- IMPROVED THEME TOGGLE (Persistent Storage) ---
const themeBtn = document.getElementById('theme-toggle');

// 1. Check if the user already has a saved preference when the page loads
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeBtn.textContent = '☀️';
} else {
  themeBtn.textContent = '🌙';
}

// 2. Toggle the theme and save the choice
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
    themeBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark'); // Save choice
  } else {
    themeBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light'); // Save choice
  }
});

// Donate functionality
let selectedAmount = 0;

function selectAmount(event, amount) {
  selectedAmount = amount;
  document.querySelectorAll('.donate-btn').forEach(btn => btn.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  document.getElementById('custom-amount').value = '';
}

function donate(method = 'default') {
  const customAmount = document.getElementById('custom-amount').value;
  const amount = customAmount ? parseInt(customAmount) : selectedAmount;
  
  if (amount >= 1) {
    if (method === 'phonepe') {
      const phonepeLink = `https://phonepe.com/deeplink?amount=${amount}&mode=02&purpose=Donation&redirectUrl=${encodeURIComponent(window.location.href)}`;
      alert(`Thank you for choosing PhonePe! You will now be redirected.`);
      window.open(phonepeLink, '_blank');
      return;
    }

    alert(`Thank you for your donation of ₹${amount}! We will redirect you to the payment gateway.`);
    // Here you would integrate with a payment service like Razorpay, PayPal, Stripe, or PhonePe.
  } else {
    alert('Please select or enter a valid amount (minimum ₹1).');
  }
}

function joinUp() {
  const name = document.getElementById('join-name').value.trim();
  const email = document.getElementById('join-email').value.trim();
  const phone = document.getElementById('join-phone').value.trim();

  if (!name || !email || !phone) {
    alert('Please complete all join-up fields.');
    return;
  }

  if (!email.endsWith('@gmail.com')) {
    alert('Please use a Gmail address to join.');
    return;
  }

  alert(`Thanks ${name}! We will contact you at ${email} and ${phone} soon.`);
  document.querySelector('.join-form').reset();
}

// Gallery modal (simple implementation)
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center;
      z-index: 2000; cursor: pointer;
    `;
    const imgClone = img.cloneNode();
    imgClone.style.cssText = 'max-width: 90%; max-height: 90%; object-fit: contain;';
    modal.appendChild(imgClone);
    modal.addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);
  });
});

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
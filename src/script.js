
// Sidebar functionality
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mainContent = document.getElementById('mainContent');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

// Toggle sidebar
sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});

// Handle sidebar link clicks
sidebarLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Remove active class from all links
    sidebarLinks.forEach(l => l.classList.remove('active'));
    // Add active class to clicked link
    link.classList.add('active');
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('active');
    }
  });
});

// Mobile sidebar toggle
if (window.innerWidth <= 768) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// Staggered animation for skills
const skillItems = document.querySelectorAll('.animate-skill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = Array.from(skillItems).indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, observerOptions);

skillItems.forEach(skill => {
  skillObserver.observe(skill);
});

// Update active navigation based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Simulate form submission
  alert(`Thank you ${name}! Your message has been sent successfully.`);
  contactForm.reset();
});

// Download CV functionality
// document.querySelector('.download-btn').addEventListener('click', function() {
//   // Simulate CV download
//   alert('CV download will be implemented with actual file.');
// });

// Add resize handler for responsive sidebar
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    sidebar.classList.remove('active');
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Add initial animations
  const heroElements = document.querySelectorAll('[class*="animate-fade-in"]');
  heroElements.forEach(el => {
    el.style.opacity = '0';
    el.style.animation = el.className.includes('animate-fade-in');
  });
  
  // Trigger animations after a short delay
  setTimeout(() => {
    heroElements.forEach(el => {
      el.style.opacity = '1';
    });
  }, 100);
});

//for the chatbot
function sendMessage() {
  const input = document.getElementById('chat-input');
  const chatWindow = document.getElementById('chat-window');
  const message = input.value.trim();

  if (!message) return;

  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message';
  userMsg.style.marginBottom = '1rem';
  userMsg.textContent = `🧑 ${message}`;
  chatWindow.appendChild(userMsg);

  // Bot reply (dummy logic)
  const botMsg = document.createElement('div');
  botMsg.className = 'chat-message';
  botMsg.style.color = 'var(--primary-color)';
  botMsg.textContent = '🤖 I\'m still learning. Please check out the sections above for more info!';
  setTimeout(() => {
    chatWindow.appendChild(botMsg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 800);

  input.value = '';
  chatWindow.scrollTop = chatWindow.scrollHeight;
}


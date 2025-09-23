/* menu icon */
const menuIcon = document.querySelector('.menu-icon');
const mobileMenu = document.getElementById('mobileMenu');

menuIcon.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

/* light and mode toggle */
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

/* Apply saved theme from localStorage */
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.add(savedTheme);
  toggleBtn.textContent = savedTheme === 'dark-mode' ? 'Light Mode' : 'Dark Mode';
} else {
  body.classList.add('light-mode');
  toggleBtn.textContent = 'Dark Mode';
}

/* Toggle logic */
toggleBtn.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode', !isDark);
  toggleBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  localStorage.setItem('theme', isDark ? 'dark-mode' : 'light-mode');
});

/* Initialize on load */
document.addEventListener("DOMContentLoaded", () => {
  showSlide(currentSlideIndex);
});

/* Function to toggle the job details */
  const toggles = document.querySelectorAll(".exp-toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const content = toggle.nextElementSibling;
      const open = content.style.display === "block";
      
      // Close all
      document.querySelectorAll(".exp-content").forEach(c => c.style.display = "none");
      document.querySelectorAll(".exp-toggle span").forEach(s => s.style.transform = "rotate(0deg)");

      if (!open) {
        content.style.display = "block";
        toggle.querySelector("span").style.transform = "rotate(180deg)";
      }
    });
  });


// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show/hide the button when scrolling
window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

// Scroll to top on click
scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* -- Portfolio Slideshow -- */
/* Detect the Center Image */
  const galleryTrack = document.getElementById("galleryTrack");
  const galleryItems = document.querySelectorAll(".gallery-item");

  let currentIndex = 0;

  function scrollSlider(direction) {
    const itemWidth = galleryItems[0].offsetWidth;
    const gap = parseInt(getComputedStyle(galleryTrack).gap || 30);
    const scrollAmount = itemWidth + gap;

    currentIndex += direction;

    // Clamp the index to valid bounds
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= galleryItems.length) currentIndex = galleryItems.length - 1;

    galleryItems[currentIndex].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }
  // Keep the "active" blur/zoom effect working
  const track = document.getElementById("galleryTrack");

  function updateActiveImage() {
    const trackRect = track.getBoundingClientRect();
    galleryItems.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const trackCenter = trackRect.left + trackRect.width / 2;
      const distance = Math.abs(trackCenter - itemCenter);

      if (distance < itemRect.width / 2) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  track.addEventListener("scroll", updateActiveImage);
  window.addEventListener("load", updateActiveImage);
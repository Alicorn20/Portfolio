document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const snowToggle = document.getElementById('snowToggle');
  const rainToggle = document.getElementById('rainToggle');
  const flowerToggle = document.getElementById('flowerToggle');
  const themeIcon = themeToggle.querySelector('i');
  let snowInterval, rainInterval, flowerInterval;

  // Snowflake Effect
  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
    snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.body.appendChild(snowflake);
    setTimeout(() => snowflake.remove(), 5000);
  }

  // Raindrop Effect
  function createRaindrop() {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    raindrop.style.left = Math.random() * window.innerWidth + 'px';
    raindrop.style.opacity = Math.random() * 0.4 + 0.4;
    raindrop.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
    raindrop.style.transform = `rotate(${Math.random() * 10 + 15}deg)`;
    document.body.appendChild(raindrop);
    setTimeout(() => raindrop.remove(), 2000);
  }

  // Flower Effect
  function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.style.left = Math.random() * window.innerWidth + 'px';
    flower.style.top = Math.random() * window.innerHeight + 'px';
    const flowers = ['🌸', '🌺', '🌹', '🌷', '🌻', '🌼', '💐', '🌿'];
    flower.setAttribute('data-emoji', flowers[Math.floor(Math.random() * flowers.length)]);
    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), 2000);
  }

  // Theme Toggle
  function setTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeIcon.className = isDark ? 'ri-moon-line ri-lg' : 'ri-sun-line ri-lg';
  }

  // Event Listeners
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
  });

  snowToggle.addEventListener('click', () => {
    if (snowInterval) {
      clearInterval(snowInterval);
      snowInterval = null;
    } else {
      snowInterval = setInterval(createSnowflake, 50);
      setTimeout(() => clearInterval(snowInterval), 10000);
    }
  });

  rainToggle.addEventListener('click', () => {
    if (rainInterval) {
      clearInterval(rainInterval);
      rainInterval = null;
    } else {
      rainInterval = setInterval(createRaindrop, 20);
      setTimeout(() => clearInterval(rainInterval), 10000);
    }
  });

  flowerToggle.addEventListener('click', () => {
    if (flowerInterval) {
      clearInterval(flowerInterval);
      flowerInterval = null;
    } else {
      flowerInterval = setInterval(createFlower, 200);
      setTimeout(() => clearInterval(flowerInterval), 5000);
    }
  });

  // Initialize Theme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark);

  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => observer.observe(section));

  function updateActiveLink() {
    const fromTop = window.scrollY;
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (fromTop >= sectionTop && fromTop <= sectionBottom) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
});

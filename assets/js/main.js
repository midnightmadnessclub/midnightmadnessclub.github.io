(function() {
  "use strict";

  /**
   * Log source visits and direct/referral visits
   */
  const logSourceVisit = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    const referrer = document.referrer || 'direct';

    // Determine the source
    let visitSource;
    if (source) {
      visitSource = source;
    } else if (referrer !== 'direct') {
      visitSource = `referral:${referrer}`;
    } else {
      visitSource = 'direct';
    }

    // Log the visit using the Google Apps Script Web App
    fetch('https://script.google.com/macros/s/AKfycbyvzT-GdQJjPRiwDN94uDsx5uIam0LNd_kjwsNgs4lBpMZMbL4NZ5qOxoacqGl7awix/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ source: visitSource, timestamp: new Date().toISOString() })
    })
    .then(response => console.log('Visit logged'))
    .catch(error => console.error('Error logging visit:', error));
  };

  // Call logSourceVisit when the page loads
  window.addEventListener('load', logSourceVisit);

  // Helper functions for element selection and event listeners
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  // Activate navbar links on scroll
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    });
  };

  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  // Photography filters functionality
  window.addEventListener('load', () => {
    let photographyContainer = select('.photography-container');
    if (photographyContainer) {
      let photographyItems = photographyContainer.querySelectorAll('.photography-item');
      let photographyFilters = document.querySelectorAll('#photography-filters li');

      photographyFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
          e.preventDefault();
          photographyFilters.forEach(f => f.classList.remove('filter-active'));
          this.classList.add('filter-active');

          let filterValue = this.getAttribute('data-filter');
          photographyItems.forEach(item => {
            item.style.display = item.classList.contains(filterValue.substring(1)) ? 'block' : 'none';
          });
        });
      });

      let activeFilter = document.querySelector('#photography-filters li.filter-active').getAttribute('data-filter');
      photographyItems.forEach(item => {
        item.style.display = item.classList.contains(activeFilter.substring(1)) ? 'block' : 'none';
      });
    }
  });

  // Initialize photography lightbox
  const photographyLightbox = GLightbox({
    selector: '.photography-lightbox'
  });

  // Initialize photography slider
  new Swiper('.photography-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  // Initialize AOS (Animate On Scroll)
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

  // Initialize PureCounter for statistics
  new PureCounter();

})();

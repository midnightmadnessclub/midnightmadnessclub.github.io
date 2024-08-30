(function() {
  "use strict";

  /**
   * Log source visits
   */
  const logSourceVisit = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');

    if (source) {
      fetch('https://script.google.com/macros/s/AKfycbwGvZD_tuaSVBYwy2cjPCclf5sw_51-YwRReI14Gh0WYUVULfMWpElQAGLJhTrEL6LGsw/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ source: source, timestamp: new Date().toISOString() })
      })
      .then(response => response.json())
      .then(data => console.log('Visit logged:', data))
      .catch(error => console.error('Error logging visit:', error));
    }
  };

  // Call logSourceVisit when the page loads
  window.addEventListener('load', logSourceVisit);

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  // Mobile nav toggle
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with offset on page load with hash links in the URL
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Photography isotope and filter
   */
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

      // Initialize with the most recent album displayed
      let activeFilter = document.querySelector('#photography-filters li.filter-active').getAttribute('data-filter');
      photographyItems.forEach(item => {
        item.style.display = item.classList.contains(activeFilter.substring(1)) ? 'block' : 'none';
      });
    }
  });

  /**
   * Initiate photography lightbox 
   */
  const photographyLightbox = GLightbox({
    selector: '.photography-lightbox'
  });

  /**
   * Photography details slider
   */
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

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})();

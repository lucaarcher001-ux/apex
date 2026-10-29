  // Shrinking Navbar on Scroll
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuBtn && mobileMenu) {
          mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
          });
        }

        // 3D Book Showcase Data & Logic (Based on User's requested mechanics)
        const articles = new Map([
            ["6392322", { tx: "-90%", tz: "-70vmin", ry: "60deg", title: "The Crimson Kingdom" }],
            ["1761279", { tz: "-110vmin", title: "The Chronos Odyssey" }],
            ["1679772", { tx: "90%", tz: "-70vmin", ry: "-60deg", title: "Whispers of Eternity" }],
            ["book-04", { title: "The Hidden Atlas" }],
            ["book-05", { title: "Letters from the Moon" }],
            ["book-06", { title: "The Last Ember" }]
        ]);

        window.addEventListener("load", () => {
            const mainContainer = document.getElementById("showcase-container");

            if (!mainContainer) return;

            for (const [position, [id]] of [...articles.entries()].entries()) {
                const articleEl = makeArticleElement(id, position);
                articleEl.querySelector("button").addEventListener("click", () => {
                    const captionEl = document.getElementById("focus-caption");
                    const isSameBook = mainContainer.dataset.focus === id;

                    if (isSameBook) {
                        mainContainer.removeAttribute("data-focus");
                        mainContainer.querySelectorAll("article").forEach(article => article.classList.remove("is-selected"));
                        mainContainer.style.transform = "none";
                        if (captionEl) {
                            captionEl.innerHTML = `Featured Bestseller: <span class="text-white font-semibold">The Chronos Odyssey</span>`;
                        }
                        return;
                    }

                    const data = articles.get(id) || {};
                    mainContainer.setAttribute("data-focus", id);
                    mainContainer.querySelectorAll("article").forEach(article => {
                        article.classList.toggle("is-selected", article === articleEl);
                    });
                    if (captionEl && data.title) {
                        captionEl.innerHTML = `Selected Edition: <span class="text-indigo-400 font-semibold">${data.title}</span> (Click again to reset)`;
                    }
                });
                mainContainer.appendChild(articleEl);
            }
        });

        // e.g. turn "90%" into "-90%" or "-10vmin" into "10vmin"
        function inverseTransformation(transform) {
            if (!transform) return 0;
            const match = transform.match(/(-?\d+)(.*)/);
            if (!match) return 0;
            const [_, value, unit] = match;
            return `${-Number(value)}${unit}`;
        }

        function makeArticleElement(id, position) {
            const img = document.createElement("img");
            const localImages = {
              "6392322": "images/book-spine-01.webp",
              "1761279": "images/book-spine-02.webp",
              "1679772": "images/book-spine-03.webp",
              "book-04": "images/book-spine-04.svg",
              "book-05": "images/book-spine-05.svg",
              "book-06": "images/book-spine-06.svg"
            };
            img.src = localImages[id];
            img.alt = articles.get(id).title;
            img.loading = "lazy";
            img.onerror = function() {
                if (this.dataset.fallbackApplied) return;
                this.dataset.fallbackApplied = "true";
                this.src = "images/book-spine-01.webp";
            };

            const button = document.createElement("button");
            button.setAttribute("aria-label", `Inspect ${articles.get(id).title}`);
            button.appendChild(img);

            const element = document.createElement("article");
            element.id = id;
            element.dataset.position = position;
            element.appendChild(button);
            return element;
        }

        // Ghostwriting Projects Category Filter Functionality
    const filterTabs = document.querySelectorAll(".tab-btn");
    const booksGrid = document.querySelector(".books-grid");
    const categoryCovers = {
        fiction: [
            "images/ahitaandaboss-fictional.webp",
            "images/stilljudaas-fictional.jpg",
            "images/thecozybook-fiction.jpg",
            "images/thelittlebitofsweetness-fiction.jpg",
            "images/theskykeeperofMARSEille-fiction.jpg",
            "images/fiction1.jpg",
            "images/fiction2.jpg",
            "images/fiction3.jpg"
        ],
        action: [
            "images/classaction-action.webp",
            "images/jackmars-action.jpg",
            "images/theactionstorybook-action.jpg",
            "images/action1.jpg",
            "images/action2.jpg",
            "images/action3.jpg",
            "images/actions4.jpg",
            "images/theniv-action.webp"
        ],
        biography: [
            "images/crie-biography.jpg",
            "images/dolplundgreen-biography.webp",
            "images/dontcallmejupiter.biography.webp",
            "images/musk-biography.webp",
            "images/sleepingdogs-biography.webp",
            "images/biography1.jpg",
            "images/biography2.jpg",
            "images/biography3.jpg"
        ],
        "self-help": [
            "images/artofsettingboundry-selfhelp.webp",
            "images/Goal Oriented Self-selfhelp.jpg",
            "images/InvestingWithoutFriction-selfhelp.jpg",
            "images/TheTraitsofPowerfulPeople-selfhelp.webp",
            "images/trusted-selfhelp.webp",
            "images/selfhelp1.jpg",
            "images/selfhelp2.jpg",
            "images/selfhelp3.jpg"
        ],
        horror: [
            "images/31Horror UntilHalloween-HORROR.jpg",
            "images/Don’tOpenYourEyes-horror.jpg",
            "images/Siren'sSpring-HORROR.jpg",
            "images/TheFinalFinalGirl-HORROR.jpg",
            "images/TheNightWhenLaughterDied-HORROR.jpg",
            "images/TheSingingFieldsofOctober-HORROR.jpg",
            "images/horror1.jpg",
            "images/horror2.jpg"
        ],
        children: [
            "images/Chain-CHILDREN BOOKS.jpg",
            "images/GruffaloGranny-CHILDRENBOOKS.jpg",
            "images/Sofia'sMonster-CHILDRENBOOKS.jpg",
            "images/TheRagged-CHILDRENBOOKS.jpg",
            "images/Wherehas-CHILDRENBOOKS.jpg",
            "images/childrenbook1.jpg",
            "images/childrenbook2.jpg",
            "images/childrenbook3.jpg"
        ],
        mystery: [
            "images/Center-mystery.jpg",
            "images/Dead-mystery.jpg",
            "images/louis-mystery.webp",
            "images/Mourning-mystery.jpg",
            "images/MURDLOCK-mystery.jpg",
            "images/Palmdale-mystery.jpg",
            "images/mystery1.jpg",
            "images/mystery2.jpg"
        ]
    };

    if (booksGrid) {
        filterTabs.forEach(tab => {
            const category = tab.dataset.category;
            const covers = categoryCovers[category] || [];
            tab.dataset.bookCount = covers.length;

            covers.forEach(cover => {
                const card = document.createElement("div");
                card.className = "book-card";
                card.dataset.category = category;

                const img = document.createElement("img");
                img.src = cover;
                img.alt = `${cover.split("/").pop().replace(/\.[^.]+$/, "").replace(/[-_.]+/g, " ")} book cover`;
                img.loading = "lazy";

                card.appendChild(img);
                booksGrid.appendChild(card);
            });
        });
    }

    const bookCards = document.querySelectorAll(".books-grid .book-card");

    function showBooksInCategory(category) {
        bookCards.forEach(card => {
            card.classList.toggle("hidden", card.dataset.category !== category);
        });
    }

    filterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            filterTabs.forEach(button => button.classList.remove("active"));
            tab.classList.add("active");
            showBooksInCategory(tab.dataset.category);
        });
    });

    const activeFilter = document.querySelector(".tab-btn.active");
    if (activeFilter) showBooksInCategory(activeFilter.dataset.category);

    /**
 * Parallax Scroll Effect & Reveal Animation for Genre Section
 */
window.addEventListener("scroll", () => {
    const section = document.getElementById("genres-parallax");
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollProgress = window.innerHeight - rect.top;

    // Check if section is in viewport
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Parallax shifting for central hub
        const hub = section.querySelector(".central-hub");
        if (hub) {
            const shift = (scrollProgress * 0.05);
            hub.style.transform = `translateY(${shift - 40}px) rotate(${scrollProgress * 0.02}deg)`;
        }

        // Parallax shifting for cards based on data-speed attribute
        const cards = section.querySelectorAll(".genre-card");
        cards.forEach((card, index) => {
            const speed = parseFloat(card.getAttribute("data-speed")) || 0.05;
            const direction = (index % 2 === 0) ? 1 : -1;
            const yOffset = (scrollProgress - 300) * speed * direction;
            card.style.transform = `translateY(${yOffset}px)`;
        });
    }
});

(function(){
  var track = document.getElementById('genresTrack');
  if (!track) return;

  var stops = [0,1,2,3].map(function(i){ return document.getElementById('stop'+i); });
  var lines = [0,1,2,3].map(function(i){ return document.getElementById('line'+i); });
  var dots  = [0,1,2,3].map(function(i){ return document.getElementById('dot'+i); });
  var rail  = document.querySelectorAll('#progressRail span');
  var bookWrap = document.getElementById('bookWrap');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width: 860px)').matches;

  // measure each connector path so we can draw it with stroke-dashoffset
  var lens = lines.map(function(p){ return p.getTotalLength(); });
  lines.forEach(function(p, i){
    p.style.strokeDasharray = lens[i];
    p.style.strokeDashoffset = lens[i];
  });
  dots.forEach(function(d){ d.style.opacity = 0; d.style.transition = 'opacity 0.25s ease'; });

  function setProgress(i, t){ // t: 0..1 local progress for stop i
    t = Math.max(0, Math.min(1, t));
    var active = t > 0.05;
    stops[i].classList.toggle('is-active', active);
    lines[i].style.strokeDashoffset = lens[i] * (1 - t);
    dots[i].style.opacity = t > 0.4 ? 1 : 0;
    rail[i].classList.toggle('is-active', active);
  }

  function onScrollDesktop(){
    var rect = track.getBoundingClientRect();
    var vh = window.innerHeight;
    var total = rect.height - vh;
    var raw = -rect.top;
    var progress = total > 0 ? Math.max(0, Math.min(1, raw / total)) : 0;
    track.classList.toggle('is-done', progress > 0.02);

    // 4 stops, each owns an equal slice, with a little intro slack at the start
    var slices = 4;
    var introSlack = 0.06;
    var usable = 1 - introSlack;
    for (var i = 0; i < slices; i++){
      var start = introSlack + (i / slices) * usable;
      var end = introSlack + ((i + 1) / slices) * usable;
      var local = (progress - start) / (end - start);
      setProgress(i, local);
    }

    if (!reduceMotion){
      var rotate = (progress - 0.5) * 10; // subtle tilt
      var scale = 0.94 + progress * 0.1;
      bookWrap.style.transform = 'translate(-50%, -50%) rotate(' + rotate.toFixed(2) + 'deg) scale(' + scale.toFixed(3) + ')';
    }
  }

  function onScrollMobile(){
    stops.forEach(function(el){
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.82){
        el.classList.add('is-visible');
      }
    });
  }

  var ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      if (window.matchMedia('(max-width: 860px)').matches){
        onScrollMobile();
      } else {
        onScrollDesktop();
      }
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();

(function(){
  var track   = document.getElementById('lgrTrack');
  var glow    = document.getElementById('lgrGlow');
  var bulb    = document.getElementById('lgrBulb');
  var beam    = document.getElementById('lgrBeam');
  var content = document.getElementById('lgrContent');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!track) return;

  if (reduceMotion){
    glow.style.opacity = 1;
    bulb.style.opacity = 1;
    beam.style.opacity = 1;
    content.style.opacity = 1;
    content.style.transform = 'none';
    content.style.filter = 'none';
    return;
  }

  function apply(p){
    // p: 0 -> 1 -> 0 triangle across the section
    glow.style.opacity = p;
    bulb.style.opacity = (0.35 + p * 0.65).toFixed(2);
    bulb.style.filter  = 'drop-shadow(0 0 ' + (6 + p * 34) + 'px rgba(255,182,99,' + (0.25 + p * 0.55).toFixed(2) + '))';
    beam.style.opacity = (p * 0.9).toFixed(2);

    content.style.opacity   = p.toFixed(2);
    content.style.transform = 'translateY(' + (24 * (1 - p)).toFixed(1) + 'px)';
    content.style.filter    = 'blur(' + (6 * (1 - p)).toFixed(1) + 'px)';
  }

  var ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      var rect = track.getBoundingClientRect();
      var vh = window.innerHeight;
      var total = rect.height - vh;
      var raw = -rect.top;
      var frac = total > 0 ? Math.max(0, Math.min(1, raw / total)) : 0;

      // triangle wave: rises to 1 at the midpoint, falls back to 0 by the end
      var p = frac < 0.5 ? (frac / 0.5) : (1 - (frac - 0.5) / 0.5);
      apply(p);

      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  apply(0);
  onScroll();
})();


/**
 * Intersection Observer to smoothly animate testimonial cards on scroll
 */
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".testimonial-card");

    const observerOptions = {
        root: null,
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index * 100); // Staggered reveal effect
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, background 0.3s ease";
        observer.observe(card);
    });
});

  document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelectorAll(".bestseller-filter");
    const books = document.querySelectorAll(".bestseller-card");
    const results = document.getElementById("bestseller-results");

    if (!filters.length || !books.length) return;

    filters.forEach(button => {
      button.addEventListener("click", () => {
        const selectedGenre = button.dataset.filter || "all";
        let visibleCount = 0;

        books.forEach(book => {
          const isVisible = selectedGenre === "all" || book.dataset.genre === selectedGenre;
          book.hidden = !isVisible;
          if (isVisible) visibleCount++;
        });

        filters.forEach(filter => {
          const isActive = filter === button;
          filter.classList.toggle("is-active", isActive);
          filter.setAttribute("aria-pressed", String(isActive));
        });

        if (results) {
          results.textContent = `Showing ${visibleCount} demo ${visibleCount === 1 ? "book" : "books"}`;
        }
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("homepage-contact-form");
    const status = document.getElementById("contact-form-status");

    if (!contactForm || !status) return;

    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      status.textContent = "This form is not connected to a delivery service yet, so no message was sent.";
      status.hidden = false;
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelectorAll(".author-filter");
    const authorCards = document.querySelectorAll(".author-card");
    const results = document.getElementById("author-results");

    if (!filters.length || !authorCards.length) return;

    filters.forEach(button => {
      button.addEventListener("click", () => {
        const selectedGenre = button.dataset.filter || "all";
        let visibleCount = 0;

        authorCards.forEach(card => {
          const isVisible = selectedGenre === "all" || card.dataset.genre === selectedGenre;
          card.hidden = !isVisible;
          if (isVisible) visibleCount++;
        });

        filters.forEach(filter => {
          const isActive = filter === button;
          filter.classList.toggle("is-active", isActive);
          filter.setAttribute("aria-pressed", String(isActive));
        });

        if (results) {
          results.textContent = `Showing ${visibleCount} demo ${visibleCount === 1 ? "author" : "authors"}`;
        }
      });
    });
  });

(function(){
  // keep the copyright year current
  var yearEl = document.getElementById('apfYear');
  if (yearEl){
    yearEl.innerHTML = yearEl.innerHTML.replace('2026', new Date().getFullYear());
  }

  // fully stop the marquee for reduced-motion users
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion){
    document.querySelectorAll('.apf-col-track').forEach(function(track){
      track.style.animation = 'none';
    });
  }

  // pause on keyboard focus inside the footer too (mouse hover is handled in CSS)
  var footer = document.querySelector('.apf-footer');
  if (footer){
    footer.addEventListener('focusin', function(){
      footer.querySelectorAll('.apf-col-track').forEach(function(t){ t.style.animationPlayState = 'paused'; });
    });
    footer.addEventListener('focusout', function(){
      footer.querySelectorAll('.apf-col-track').forEach(function(t){ t.style.animationPlayState = ''; });
    });
  }
})();


//about page javascript 

document.addEventListener("DOMContentLoaded", () => {
    // 1. Interactive Timeline Switcher Data
    const timelineData = {
        "2016": {
            title: "Foundation & Physical Print Mastery (2016)",
            text: "Apex Press launched as a specialized physical publishing house, assisting regional authors with physical layout, hardcover binding, and traditional distribution channels."
        },
        "2019": {
            title: "Expansion & Bestseller Milestones (2019)",
            text: "Scaled operations to assist over 200 independent authors, establishing partnerships with major physical distributors and regional bookstores."
        },
        "2023": {
            title: "The Digital Shift & eBook Integration (2023)",
            text: "Expanded our offerings into professional eBook conversion, custom EPUB formatting, and Amazon KDP multi-platform publishing suites."
        },
        "2026": {
            title: "Global Digital Publishing Leaders (2026)",
            text: "Celebrating 10 years of operational excellence with over 450+ published titles and 18M+ global readers reached across digital and physical mediums."
        }
    };

    const timeButtons = document.querySelectorAll(".time-btn");
    const timelineDisplay = document.getElementById("timeline-display");

    if (timelineDisplay) {
      timeButtons.forEach(button => {
        button.addEventListener("click", () => {
          timeButtons.forEach(btn => btn.classList.remove("active"));
          button.classList.add("active");

          const year = button.getAttribute("data-year");
          if (timelineData[year]) {
            timelineDisplay.style.opacity = 0;
            setTimeout(() => {
              timelineDisplay.innerHTML = `
                <h3>${timelineData[year].title}</h3>
                <p>${timelineData[year].text}</p>
              `;
              timelineDisplay.style.opacity = 1;
            }, 150);
          }
        });
        });

      timelineDisplay.style.transition = "opacity 0.25s ease-in-out";
    }

    // 2. Animated Counters for Stats Section
    const counters = document.querySelectorAll(".counter");
    let animated = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const isDecimal = target % 1 !== 0;
            let count = 0;
            const speed = target / 40; // Adjust counting speed

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = isDecimal ? count.toFixed(1) : Math.floor(count);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger counter when scrolled into view
    const statsSection = document.querySelector(".stats-section");
    
    window.addEventListener("scroll", () => {
        if (!statsSection) return;
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionPos < screenPosition && !animated) {
            runCounters();
            animated = true;
        }
    });
});
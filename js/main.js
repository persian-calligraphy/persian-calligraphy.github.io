/* ============================================================
   PERSIAN CALLIGRAPHY TUTORIALS — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  // --- Reading Progress Bar ---
  var progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    });
  }

  // --- Scroll-based Fade-in Animation ---
  var animateElements = document.querySelectorAll('.animate-in');
  if (animateElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animateElements.forEach(function (el) {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }

  // --- Active TOC Highlighting ---
  var tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length > 0) {
    var headings = [];
    tocLinks.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.startsWith('#')) {
        var heading = document.getElementById(id.substring(1));
        if (heading) {
          headings.push({ element: heading, link: link });
        }
      }
    });

    if (headings.length > 0) {
      window.addEventListener('scroll', function () {
        var scrollPos = window.scrollY + 120;
        var current = headings[0];

        for (var i = 0; i < headings.length; i++) {
          if (headings[i].element.offsetTop <= scrollPos) {
            current = headings[i];
          }
        }

        tocLinks.forEach(function (link) {
          link.classList.remove('active');
        });
        if (current) {
          current.link.classList.add('active');
        }
      });
    }
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        var offset = target.offsetTop - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

})();

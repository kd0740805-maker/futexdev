(function () {
  "use strict";

  /* ---------- Navbar scroll state ---------- */
  var navbar = document.getElementById("navbar");
  function onScroll() {
    if (window.scrollY > 8) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
  }

  function openMenu() {
    toggle.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("is-open");
  }

  toggle.addEventListener("click", function () {
    var isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Smooth scroll with sticky-navbar offset ---------- */
  var navHeight = 76;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - (navHeight + 8);
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
/* =========================================================
FUTEX PROJECT FORM
========================================================= */

const projectForm = document.getElementById("project-form");
const projectSubmit = document.getElementById("project-submit");
const projectSuccess = document.getElementById("project-success");
const projectError = document.getElementById("project-error");

if (projectForm) {
projectForm.addEventListener("submit", async function (event) {
event.preventDefault();

```
projectForm.classList.add("is-loading");
projectSubmit.disabled = true;

projectSuccess.classList.remove("show");
projectError.classList.remove("show");

const formData = new FormData(projectForm);

try {
  const response = await fetch(projectForm.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json"
    }
  });

  if (response.ok) {
    projectForm.reset();

    projectForm.classList.remove("is-loading");
    projectSubmit.disabled = false;

    projectSuccess.classList.add("show");

    projectSuccess.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

  } else {
    throw new Error("Form submission failed.");
  }

} catch (error) {
  projectForm.classList.remove("is-loading");
  projectSubmit.disabled = false;

  projectError.classList.add("show");
}
```

});
}

// =========================================================
// MIDHUN & ASWATHI — INTERACTIONS
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // Let the invitation arrive before revealing the page beneath it.
  const splash = document.querySelector(".splash-screen");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  document.body.classList.add("splash-active");

  const releaseSilk = () => {
    const exitTargets = {
      ".ribbon-one": {
        transform:
          "translate(-52%, -18%) rotate(35deg) skewY(-22deg) scaleY(1.7)",
        delay: 0,
      },
      ".ribbon-two": {
        transform:
          "translate(44%, 18%) rotate(-30deg) skewY(24deg) scaleY(0.45)",
        delay: 60,
      },
      ".ribbon-three": {
        transform:
          "translate(-40%, 28%) rotate(32deg) skewY(-24deg) scaleY(1.6)",
        delay: 120,
      },
      ".ribbon-four": {
        transform:
          "translate(52%, -24%) rotate(-38deg) skewY(22deg) scaleY(0.45)",
        delay: 180,
      },
      ".smoke-one": {
        transform: "translate(-34%, -22%) rotate(-20deg) scale(2.1)",
        delay: 0,
      },
      ".smoke-two": {
        transform: "translate(34%, 22%) rotate(28deg) scale(2.15)",
        delay: 80,
      },
      ".smoke-three": {
        transform: "translate(8%, 34%) rotate(75deg) scale(2.25)",
        delay: 140,
      },
    };

    Object.entries(exitTargets).forEach(([selector, target]) => {
      const element = splash?.querySelector(selector);
      if (!element) return;

      const computed = getComputedStyle(element);
      const currentFrame = {
        transform: computed.transform,
        opacity: computed.opacity,
        filter: computed.filter,
      };

      element.getAnimations().forEach((animation) => animation.cancel());
      element.animate(
        [
          currentFrame,
          {
            transform: target.transform,
            opacity: 0,
            filter: selector.includes("ribbon") ? "blur(22px)" : "blur(68px)",
          },
        ],
        {
          duration: 1450,
          delay: target.delay,
          fill: "forwards",
          easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        },
      );
    });
  };

  window.setTimeout(
    () => {
      if (!reducedMotion) releaseSilk();
      splash?.classList.add("is-leaving");
      window.setTimeout(
        () => {
          splash?.remove();
          document.body.classList.remove("splash-active");
        },
        reducedMotion ? 20 : 1450,
      );
    },
    reducedMotion ? 250 : 2400,
  );

  // Mobile menu
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  menuButton?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  // Keep the mobile dock aligned with the section currently in view.
  const mobileNavLinks = [...document.querySelectorAll(".mobile-bottom-nav a")];
  const mobileSections = mobileNavLinks
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);

  const setMobileActive = (sectionId) => {
    mobileNavLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.section === sectionId);
    });
  };

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => setMobileActive(link.dataset.section));
  });

  const mobileSectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (first, second) => second.intersectionRatio - first.intersectionRatio,
        )[0];
      if (!visibleSection) return;

      setMobileActive(visibleSection.target.id);
    },
    { rootMargin: "-35% 0px -50%", threshold: 0 },
  );

  mobileSections.forEach((section) => mobileSectionObserver.observe(section));

  // Reveal the logo header only after the hero has been scrolled past.
  const siteHeader = document.querySelector(".site-header");
  const heroSection = document.querySelector("#home");
  const heroHeaderObserver = new IntersectionObserver(
    ([entry]) => {
      siteHeader?.classList.toggle(
        "mobile-visible",
        entry.intersectionRatio < 0.15,
      );
    },
    { threshold: [0, 0.15, 1] },
  );

  if (heroSection) heroHeaderObserver.observe(heroSection);

  // Reveal sections as they enter the viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Countdown to the wedding
  // Change this date/time to the exact Muhurtham time if required.
  const weddingDate = new Date("2026-11-08T09:24:00+05:30").getTime();

  const units = {
    days: document.querySelector('[data-unit="days"]'),
    hours: document.querySelector('[data-unit="hours"]'),
    minutes: document.querySelector('[data-unit="minutes"]'),
    seconds: document.querySelector('[data-unit="seconds"]'),
  };

  function pad(number) {
    return String(Math.max(0, number)).padStart(2, "0");
  }

  function updateCountdown() {
    const distance = weddingDate - Date.now();

    if (distance <= 0) {
      units.days.textContent = "00";
      units.hours.textContent = "00";
      units.minutes.textContent = "00";
      units.seconds.textContent = "00";
      return;
    }

    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    units.days.textContent = String(days);
    units.hours.textContent = pad(hours);
    units.minutes.textContent = pad(minutes);
    units.seconds.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Subtle parallax on the hero artwork
  const heroArt = document.querySelector(".hero-art");
  const countdownSection = document.querySelector("#countdown");
  const countdownPhoto = document.querySelector(".countdown-photo");

  window.addEventListener(
    "scroll",
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (heroArt) {
        const heroY = Math.min(window.scrollY * 0.08, 35);
        heroArt.style.transform = `scale(1.05) translateY(${heroY}px)`;
      }

      if (countdownSection && countdownPhoto) {
        const sectionTop = countdownSection.getBoundingClientRect().top;
        const parallax = Math.max(-24, Math.min(24, -sectionTop * 0.06));
        countdownPhoto.style.setProperty(
          "--countdown-parallax",
          `${parallax}px`,
        );
      }
    },
    { passive: true },
  );
});

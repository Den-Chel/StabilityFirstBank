"use strict";

///////////////////////////////////////
// Modal window
document.addEventListener("DOMContentLoaded", function () {
  const modalWindow = document.querySelector(".modal-window");
  const overlay = document.querySelector(".overlay");
  const btnCloseModalWindow = document.querySelector(
    ".btn--close-modal-window"
  );
  const btnsOpenModalWindow = document.querySelectorAll(
    ".btn--show-modal-window"
  );
  const btnScrollTo = document.querySelector(".btn--scroll-to");
  const section1 = document.querySelector("#section--1");

  const tabs = document.querySelectorAll(".operations__tab");
  const tabContainer = document.querySelector(".operations__tab-container");
  const tabContents = document.querySelectorAll(".operations__content");

  const openModalWindow = function (e) {
    e.preventDefault();
    modalWindow.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  const closeModalWindow = function () {
    modalWindow.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  btnsOpenModalWindow.forEach((button) =>
    button.addEventListener("click", openModalWindow)
  );

  // for (let i = 0; i < btnsOpenModalWindow.length; i++)
  //   btnsOpenModalWindow[i].addEventListener('click', openModalWindow);

  btnCloseModalWindow.addEventListener("click", closeModalWindow);
  overlay.addEventListener("click", closeModalWindow);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalWindow.classList.contains("hidden")) {
      closeModalWindow();
    }
  });

  btnScrollTo.addEventListener("click", function (e) {
    const section1Coords = section1.getBoundingClientRect();
    console.log(section1Coords);
    console.log(e.target.getBoundingClientRect());
    console.log("Сurrent scroll: x, y", window.pageXOffset, window.pageYOffset);
    console.log(
      "Width and height of viewport",
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    );

    // window.scrollTo(
    //   section1Coords.left + window.pageXOffset,
    //   section1Coords.top + window.pageYOffset
    // );

    // window.scrollTo({
    //   left: section1Coords.left + window.pageXOffset,
    //   top: section1Coords.top + window.pageYOffset,
    //   behavior: 'smooth',
    // });

    section1.scrollIntoView({ behavior: "smooth" });
  });

  // Event Delegation
  // Add event listener for common parent
  document.querySelector(".nav__links").addEventListener("click", function (e) {
    e.preventDefault();
    // Define target element
    console.log(e.target);
    if (e.target.classList.contains("nav__link")) {
      const href = e.target.getAttribute("href");
      console.log(href);
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    }
  });

  // Tabs

  tabContainer.addEventListener("click", function (e) {
    const clickedButton = e.target.closest(".operations__tab");
    // Guard clause
    if (!clickedButton) return;

    // Active tab
    tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
    clickedButton.classList.add("operations__tab--active");

    // Active content
    tabContents.forEach((content) =>
      content.classList.remove("operations__content--active")
    );
    document
      .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
      .classList.add("operations__content--active");
  });

  // Fade Animation on Navigation Bar

  const navLinksHoverAnimation = function (e) {
    console.log(this, e.currentTarget);
    if (e.target.classList.contains("nav__link")) {
      const linkOver = e.target;
      const siblingLinks = linkOver
        .closest(".nav__links")
        .querySelectorAll(".nav__link");
      const logo = linkOver.closest(".nav").querySelector("img");
      const logoText = linkOver.closest(".nav").querySelector(".nav__text");

      siblingLinks.forEach((el) => {
        if (el !== linkOver) el.style.opacity = this;
      });
      logo.style.opacity = this;
      logoText.style.opacity = this;
    }
  };

  // Working with Arguments with bind() / this

  const nav = document.querySelector(".nav");

  nav.addEventListener("mouseover", navLinksHoverAnimation.bind(0.4));
  nav.addEventListener("mouseout", navLinksHoverAnimation.bind(1));

  const header = document.querySelector(".header");
  const navHeight = nav.getBoundingClientRect().height;
  // console.log(navHeight);
  const getStickyNav = function (entries) {
    const entry = entries[0];
    // console.log(entry);
    if (!entry.isIntersecting) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  };

  const headerObserver = new IntersectionObserver(getStickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  });
  headerObserver.observe(header);

  // Section's appearance

  const allSections = document.querySelectorAll(".section");

  const appearanceSection = function (entries, observer) {
    const entry = entries[0];
    // console.log(entry);
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(appearanceSection, {
    root: null,
    threshold: 0.2,
  });

  allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
  });

  // Lazy images

  const lazyImages = document.querySelectorAll(".lazy-img");

  const loadImage = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener("load", () => {
        entry.target.classList.remove("lazy-img");
      });

      observer.unobserve(entry.target);
    });
  };

  const imageObserver = new IntersectionObserver(loadImage, {
    root: null,
    threshold: 0,
    rootMargin: "200px",
  });
  lazyImages.forEach((img) => imageObserver.observe(img));

  // Hamburger menu
  const toggleButton = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  console.log("Toggle Button:", toggleButton);
  console.log("Nav Links:", navLinks);

  toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    toggleButton.classList.toggle("active");
  });

  // Slider
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  let currentSlide = 0;

  const updateSlidePosition = () => {
    slides.forEach((slide, index) => {
      slide.style.left = `${(index - currentSlide) * 100}%`;
      slide.classList.toggle("slide--active", index === currentSlide);
    });
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlidePosition();
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlidePosition();
  };

  // Initialize slider
  updateSlidePosition();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
});

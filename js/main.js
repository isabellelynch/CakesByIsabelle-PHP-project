document.addEventListener("DOMContentLoaded", () => {

  // ── Active nav link ──────────────────────────────────────
  // highlights the link for the page you're on ("" means the site root, i.e. index.php)
  const current = location.pathname.split("/").pop() || "index.php";
  document.querySelectorAll(".nav ul a").forEach((a) => {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });

  // ── Menu filter bar ──────────────────────────────────────
  const filterBtns = document.querySelectorAll(".filter-bar button");
  const cakeCards  = document.querySelectorAll(".cake-grid [data-category]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {

      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const cat = btn.dataset.filter;

      cakeCards.forEach((card) => {
        const wrapper = card.closest(".cake-card-wrap");
        // a card can belong to several categories, e.g. data-category="classic best"
        const categories = card.dataset.category.split(" ");

        if (cat === "all" || categories.includes(cat)) {
          wrapper.classList.remove("hidden");
        } else {
          wrapper.classList.add("hidden");
        }
      });

    });
  });

  // ── Order configurator ───────────────────────────────────
  const BASE = 0;
  const prices = { size: { "mini": 40, "r-small": 100, "t-small": 110, "r-large": 125, "t-large": 140, "tiered": 200 },
                   flavour: { "vanilla": 0, "chocolate": 0, "lemon": 5, "kinder": 5, "biscoff": 5, "redvelvet": 8, "rockyroad": 5 },
                   extras: { "none": 0, "birthday": 5, "wedding": 15, "heart": 5, "custom": 10 } };

  // options whose price depends on the design, so the total is a starting price
  const variablePrice = ["tiered", "rockyroad", "custom"];

  const selected = { size: null, flavour: null, extras: null };
  const labels   = { size: "", flavour: "", extras: "" };

  function updatePrice() {
    const total = Object.keys(selected).reduce((acc, key) => {
      return acc + (selected[key] ? prices[key][selected[key]] : 0);
    }, BASE);
    const isFrom = Object.values(selected).some((value) => variablePrice.includes(value));
    const el = document.querySelector("[data-price]");
    if (el) el.textContent = total > 0 ? `${isFrom ? "From " : ""}€${total}` : "€—";
  }

  // config step tabs
  function showStep(step) {
    document.querySelectorAll(".config-step-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.step === step);
    });
    document.querySelectorAll(".config-panel").forEach((p) => {
      p.classList.toggle("active", p.dataset.panel === step);
    });
  }

  document.querySelectorAll(".config-step-btn").forEach((btn) => {
    btn.addEventListener("click", () => showStep(btn.dataset.step));
  });

  // config option selection
  const stepOrder = ["size", "flavour", "extras"];
  document.querySelectorAll(".config-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      const group = opt.dataset.group;
      document.querySelectorAll(`.config-option[data-group="${group}"]`)
        .forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
      selected[group] = opt.dataset.value;
      labels[group] = opt.querySelector(".config-option-label").textContent.trim();
      updatePrice();

      // move on to the next step automatically
      const next = stepOrder[stepOrder.indexOf(group) + 1];
      if (next && !selected[next]) showStep(next);
    });
  });

  // add to order
  const addBtn = document.querySelector("[data-add-order]");
  const msg    = document.querySelector("[data-order-msg]");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      if (!selected.size || !selected.flavour || !selected.extras) {
        if (msg) msg.textContent = "Please complete all three steps first.";
        // jump to the first step that still needs a choice
        showStep(stepOrder.find((step) => !selected[step]));
        return;
      }
      const extras = selected.extras === "none" ? "no extras" : labels.extras;
      if (msg) msg.textContent = `Order added! A ${labels.size} ${labels.flavour} cake with ${extras}. We'll be in touch to confirm.`;
    });
  }

  // contact form
  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const s = contactForm.querySelector("[data-form-status]");
      if (s) s.textContent = "Message received — we'll reply within one business day.";
      contactForm.reset();
    });
  }


  // about page image carousel
  const sliderImage = document.getElementById("about-image");

  // only runs on the About page, where the image exists
  if (sliderImage) {
    const images = [
      "images/cakes/1.jpg",
      "images/cakes/2.jpg",
      "images/cakes/3.jpg",
      "images/cakes/4.jpg",
      "images/cakes/5.jpg",
      "images/cakes/6.jpg"
    ];

    // load every photo up front so each one appears straight away when it fades in
    images.forEach((src) => { new Image().src = src; });

    let index = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setInterval(() => {
      sliderImage.style.opacity = 0;

      setTimeout(() => {
        index = (index + 1) % images.length;
        sliderImage.src = images[index];
        sliderImage.style.opacity = 1;
      }, reduceMotion ? 0 : 500);

    }, 3000);
  }

});

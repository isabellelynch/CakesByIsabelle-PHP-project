# Cakes By Isabelle

A website for **Cakes By Isabelle**, a home bakery in Tralee, Co. Kerry, making handmade cakes to order. It's built with PHP, HTML, CSS and vanilla JavaScript, with no frameworks and no build step.

---

## Pages

| Page | What it does |
|------|-------------|
| **Home** (`index.php`) | Hero banner, three featured cakes, "how it works" steps and customer testimonials |
| **Menu** (`menu.php`) | All six cakes, with filter buttons for *Classic*, *Chocolate* and *Bestseller* |
| **About** (`about.php`) | The bakery's story, a rotating photo gallery, and notes on ingredients and dietary options |
| **Order** (`order.php`) | A three-step cake builder (size → flavour → extras) that shows the estimated price as you choose |
| **Contact** (`contact.php`) | Contact form, email and Instagram links, and common questions |

---

## Running it locally

The site needs PHP, because each page pulls in the shared navigation bar and footer with `require_once`.

**With PHP installed** (PHP 7.4 or later):

```bash
cd CakesByIsabelle
php -S localhost:8000
```

Then open <http://localhost:8000> in a browser.

**With XAMPP, MAMP or WAMP:** copy the folder into `htdocs` (or `www`), start Apache, and open `http://localhost/CakesByIsabelle/`.

> Opening the `.php` files by double-clicking them won't work: the browser shows the raw code instead of the page. They have to be served through PHP.

**Hosting:** GitHub Pages only serves static files, so it can't run this site. Use any host that supports PHP, which most shared hosting does.

---

## Project structure

```
CakesByIsabelle/
├── index.php          Home page
├── menu.php           Menu with category filter
├── about.php          About page with photo carousel
├── order.php          Cake order builder
├── contact.php        Contact form and FAQ
├── include/
│   ├── nav.php        Navigation bar (shared by every page)
│   └── footer.php     Footer (shared by every page)
├── css/
│   └── style.css      All styles; colours and fonts are set as variables at the top
├── js/
│   └── main.js        Menu filter, order builder, contact form, carousel, active nav link
└── images/            Cake photos (images/cakes/ holds the About page gallery)
```

---

## How the main features work

- **Shared nav and footer:** each page includes `include/nav.php` and `include/footer.php`, so a change to the menu or footer only has to be made once.
- **Active nav link:** `main.js` compares each link's `href` with the current page's filename and highlights the match.
- **Menu filter:** each cake card has a `data-category` attribute, such as `data-category="classic best"`. Clicking a filter button hides every card that doesn't contain that category.
- **Order builder:**
  - Each option button has a `data-group` (size, flavour or extras) and a `data-value`. The prices live in one `prices` object in `main.js`.
  - Choosing an option updates the total and moves to the next step. Options with a variable price (2 tiers, Rocky Road and Custom) show the total as "From €…".
- **About carousel:** swaps the About photo every 3 seconds with a fade. It only runs on the About page.

To change prices, edit the `prices` object at the top of the order section in `js/main.js`, and update the matching text in `order.php`.

---

## Known limitations

- **The contact form and order builder don't send anything yet.** Both show a confirmation message in the browser, but no email is sent and nothing is saved. Connect them to a form service (for example Formspree) or a PHP mail script before relying on them for real orders.
- The site uses Google Fonts (Cormorant Garamond and DM Sans), so it needs an internet connection to show the intended fonts. Without one it falls back to standard serif and sans-serif fonts.

---

## Changes made during review (October 2026)

**Fixes that stopped the site working**
- **Every page crashed with a server error.** The pages included `include/nav.php` and `include/footer.php`, but the files were named `nav.html` and `footer.html`. They have been renamed to match, and the includes now use `__DIR__` so they work wherever the site is served from.
- **Every link was broken.** All 17 links pointed to `.html` pages (`menu.html`, `order.html`…) that don't exist. They now point to the `.php` pages.

**JavaScript**
- **Menu filter did nothing:** the script looked for `.filter-btn` and `.cake-card` classes that the menu page doesn't use. It now targets the filter buttons and cards that are actually there.
- **Active nav link never highlighted:** the script looked for a `.nav__links` class that doesn't exist.
- **Carousel errors:** the About page carousel ran on every page, causing a JavaScript error every 3 seconds on the other four. It now only runs when the About photo is on the page, and preloads the photos so each one fades in fully loaded.
- **Order builder:**
  - The confirmation read like "A redvelvet r-small cake for none". It now uses the names shown on screen, e.g. *A 6" Regular Red Velvet cake with Basic Birthday*.
  - Choosing an option now moves to the next step, and Place order jumps to any step you missed.
  - Rocky Road was priced at €10 although the page says "+€5–15". It now starts at €5, and variable-price choices show "From €…".

**Layout and design**
- **Phones:** at phone width the page scrolled sideways, and the Contact and Order links were off-screen. The nav now wraps onto two lines, and the About photo scales down to fit the screen.
- **Home page:** the hero's background glow was drawn on top of the buttons and dimmed them (a `.hero > .div` typo for `.hero > div`).
- **Readability:** the "how it works" step numbers were white on light pink, which was hard to read; they're now dark brown.

**Content**
- Pages titled "Rosewood Bakery" (left over from a template) now say Cakes By Isabelle.
- Placeholder image descriptions ("Description of image") were replaced with real ones, for screen readers and search engines.
- The home page asked for 5 days' notice, while the Order and Contact pages said 3 days. All three now say 3 days, or 1–2 weeks for wedding and tiered cakes.
- "Real vanilla – never extract" was changed to "never essence". Vanilla extract *is* real vanilla; essence is the artificial one.
- "BestSeller" tags were made consistent ("Bestseller").
- `images/cookies.webp` isn't used on any page; it was left in place in case it's wanted later.

**Testing:** the site was run with PHP 8.3 and checked in a browser with 86 automated checks, all passing. They covered:
- Every page and link, and every image
- The menu filter and order builder prices
- The contact form and the carousel
- No JavaScript errors
- Every page at phone width (375px)

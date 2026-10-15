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

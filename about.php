<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>About — Cakes By Isabelle</title>
<link rel="stylesheet" href="css/style.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body>

<?php require_once __DIR__ . '/include/nav.php'; ?>

<section class="section">
  <div class="container">
    <div class="about-grid">
      <div>
        <span class="eyebrow">Our story</span>
        <h1>Baked with patience, finished with care.</h1>
        <hr class="divider">
        <p>Cakes by Isabelle started at a kitchen table in 2016 - a few birthday cakes for friends that turned into something much bigger. Every cake we make is still handmade from scratch, with the same attention to detail as the very first one.</p>
        <p>We use locally sourced butter and eggs where we can, Belgian chocolate for anything chocolate, and real vanilla - never essence. The results speak for themselves.</p>
        <p>Based in Tralee, we deliver across Kerry. For collection orders or further afield, get in touch and we'll figure something out.</p>
        <div class="btn-row" style="justify-content:flex-start; margin-top:1.5rem;">
          <a class="btn btn--primary" href="order.php">Order a cake</a>
          <a class="btn btn--outline-dark" href="contact.php">Say hello</a>
        </div>
      </div>
      <div class="about-img"><img id="about-image" src="images/cakes/1.jpg" alt="A selection of cakes made by Cakes by Isabelle"></div>
    </div>
  </div>
</section>

<section class="section section--tinted">
  <div class="container">
    <span class="eyebrow">The details</span>
    <h2>Things worth knowing</h2>
    <hr class="divider">
    <div class="about-info-cards-grid">
      <div class="card about-info-cards">
        <h3>Quality ingredients</h3>
        <p>Free-range eggs, Irish butter, and Belgian chocolate. No shortcuts.</p>
      </div>
      <div class="card about-info-cards">
        <h3>Made to order</h3>
        <p>Nothing sits in a fridge waiting. Your cake is baked when you order it.</p>
      </div>
      <div class="card about-info-cards">
        <h3>Dietary options</h3>
        <p>Gluten-free and dairy-free versions available — just ask when ordering.</p>
      </div>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/include/footer.php'; ?>

<script src="js/main.js"></script>
</body>
</html>

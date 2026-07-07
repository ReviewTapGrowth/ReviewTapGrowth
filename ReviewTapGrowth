<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ReviewTap — Get More 5-Star Google Reviews with One Tap</title>
<meta name="description" content="ReviewTap NFC cards, stands and stickers open your Google review page instantly when customers tap their phone. No app, no typing, no friction.">
<meta property="og:title" content="ReviewTap — Get More 5-Star Google Reviews with One Tap">
<meta property="og:description" content="NFC review cards that open your Google review page the second a customer taps their phone.">
<meta property="og:type" content="website">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='15' fill='%230f1929'/%3E%3Ctext x='27' y='45' font-family='sans-serif' font-size='32' font-weight='800' fill='white' text-anchor='middle'%3ER%3C/text%3E%3Cpath d='M40 22 Q44 18 48 22' fill='none' stroke='%2306b6d4' stroke-width='3' stroke-linecap='round'/%3E%3Cpath d='M40 30 Q45 24 50 30' fill='none' stroke='%2306b6d4' stroke-width='3' stroke-linecap='round' opacity='0.6'/%3E%3C/svg%3E">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{
  --ink:#0f1929; --bg:#ffffff; --bg-soft:#f4f7fb; --text:#0f1929;
  --muted:rgba(15,25,41,.6); --faint:rgba(15,25,41,.42);
  --blue:#2563eb; --blue-dark:#1d4ed8; --tap:#06b6d4;
  --border:rgba(15,25,41,.10); --glass:rgba(255,255,255,.72);
  --glass-border:rgba(255,255,255,.6); --shadow:0 8px 32px rgba(15,25,41,.10);
  --radius:20px;
}
[data-theme="dark"]{
  --bg:#060b14; --bg-soft:rgba(255,255,255,.03); --text:#f1f5f9;
  --muted:rgba(241,245,249,.62); --faint:rgba(241,245,249,.42);
  --border:rgba(255,255,255,.10); --glass:rgba(255,255,255,.05);
  --glass-border:rgba(255,255,255,.10); --shadow:0 8px 32px rgba(0,0,0,.35);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--text);line-height:1.6;overflow-x:hidden;transition:background .3s,color .3s}
img,svg{display:block}
a{color:inherit}
.container{max-width:1120px;margin:0 auto;padding:0 22px}
.glass{background:var(--glass);border:1px solid var(--glass-border);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:var(--shadow)}

/* ===== NAV ===== */
nav{position:sticky;top:0;z-index:100;border-bottom:1px solid var(--border)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:64px}
.brand{display:flex;align-items:center;gap:10px;font-weight:800;font-size:18px;text-decoration:none;letter-spacing:-.3px}
.brand svg{height:34px;width:auto}
.nav-links{display:flex;gap:4px;align-items:center}
.nav-links a{font-size:14px;font-weight:500;color:var(--muted);text-decoration:none;padding:8px 14px;border-radius:999px;transition:.2s}
.nav-links a:hover{color:var(--text);background:var(--bg-soft)}
.nav-links a.active{color:var(--blue);background:rgba(37,99,235,.10)}
.nav-actions{display:flex;align-items:center;gap:8px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;cursor:pointer;font-family:inherit;font-weight:600;font-size:14px;padding:12px 24px;border-radius:999px;text-decoration:none;transition:.2s}
.btn-primary{background:var(--blue);color:#fff;box-shadow:0 14px 40px -14px rgba(37,99,235,.6)}
.btn-primary:hover{background:var(--blue-dark);transform:translateY(-1px)}
.btn-ghost{background:var(--glass);border:1px solid var(--glass-border);color:var(--text)}
.btn-ghost:hover{border-color:rgba(37,99,235,.5)}
.btn-lg{padding:15px 30px;font-size:15px}
.btn-block{width:100%}
.icon-btn{background:none;border:none;cursor:pointer;color:var(--muted);padding:8px;border-radius:999px;font-size:18px;line-height:1;transition:.2s}
.icon-btn:hover{background:var(--bg-soft);color:var(--text)}
.hamburger{display:none}
.mobile-menu{display:none;flex-direction:column;gap:4px;padding:12px 22px 18px;border-top:1px solid var(--border)}
.mobile-menu a{padding:12px 14px;border-radius:14px;text-decoration:none;font-weight:500;color:var(--text)}
.mobile-menu a.active{background:rgba(37,99,235,.10);color:var(--blue)}
@media(max-width:820px){.nav-links,.nav-actions .btn{display:none}.hamburger{display:block}.mobile-menu.open{display:flex}}

/* ===== SECTIONS / PAGES ===== */
.page{display:none}
.page.active{display:block;animation:pagein .45s ease}
@keyframes pagein{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
section{padding:72px 0}
.eyebrow{font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--blue)}
h1{font-size:clamp(34px,6vw,58px);font-weight:800;letter-spacing:-.03em;line-height:1.08}
h2{font-size:clamp(26px,4vw,36px);font-weight:800;letter-spacing:-.02em}
h3{font-size:18px;font-weight:700}
.lead{color:var(--muted);font-size:17px;max-width:620px}
.center{text-align:center}
.center .lead{margin:14px auto 0}
.grid{display:grid;gap:20px}
.grid-3{grid-template-columns:repeat(3,1fr)}
.grid-2{grid-template-columns:repeat(2,1fr)}
@media(max-width:820px){.grid-3,.grid-2{grid-template-columns:1fr}}
.card{border-radius:26px;padding:28px;transition:transform .25s}
.card:hover{transform:translateY(-4px)}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease}
.reveal.in{opacity:1;transform:none}

/* ===== HERO ===== */
.hero{display:grid;grid-template-columns:1.1fr 1fr;align-items:center;gap:32px;padding:70px 0 40px;position:relative}
.hero::before{content:"";position:absolute;inset:-60px -200px auto;height:420px;background:radial-gradient(55% 60% at 50% 0%,rgba(37,99,235,.14),transparent);pointer-events:none}
@media(max-width:900px){.hero{grid-template-columns:1fr;text-align:center}.hero .lead{margin:18px auto 0}.hero-ctas{justify-content:center}}
.pill{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:var(--blue);padding:7px 16px;border-radius:999px;margin-bottom:20px}
.grad{background:linear-gradient(90deg,var(--blue),var(--tap));-webkit-background-clip:text;background-clip:text;color:transparent}
.hero-ctas{display:flex;gap:12px;margin-top:30px;flex-wrap:wrap}

/* NFC card mockup */
.mockwrap{position:relative;display:flex;align-items:center;justify-content:center;min-height:340px}
.ring{position:absolute;width:200px;height:200px;border:2px solid rgba(6,182,212,.4);border-radius:50%;animation:ring 2.6s ease-out infinite}
.ring:nth-child(2){animation-delay:.85s}.ring:nth-child(3){animation-delay:1.7s}
@keyframes ring{0%{transform:scale(.6);opacity:.9}100%{transform:scale(2.1);opacity:0}}
.nfc-card{position:relative;width:300px;aspect-ratio:8/5;border-radius:24px;padding:20px;color:#fff;background:linear-gradient(135deg,#0f1929,#13233d 55%,#1d4ed8);box-shadow:0 30px 70px -25px rgba(37,99,235,.55);transform:rotate(-4deg);animation:float 7s ease-in-out infinite;transition:transform .3s}
.nfc-card:hover{transform:rotate(0) scale(1.03)}
@keyframes float{0%,100%{translate:0 0}50%{translate:0 -12px}}
.nfc-top{display:flex;justify-content:space-between;align-items:flex-start}
.nfc-label{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-top:16px}
.nfc-google{font-size:24px;font-weight:800;margin-top:2px}
.stars{color:#fbbf24;font-size:15px;letter-spacing:2px}
.qr{position:absolute;right:14px;bottom:14px;width:54px;height:54px;border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:center}
.nfc-foot{position:absolute;left:20px;bottom:18px;font-size:9px;color:rgba(255,255,255,.4)}

/* ===== STATS ===== */
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-radius:32px;padding:38px;text-align:center}
@media(max-width:680px){.stats{grid-template-columns:1fr}}
.stat b{display:block;font-size:clamp(32px,5vw,46px);font-weight:800;letter-spacing:-.02em;color:var(--blue);font-variant-numeric:tabular-nums}
.stat span{font-size:13px;font-weight:500;color:var(--muted)}

/* ===== STEPS / FEATURES ===== */
.stepnum{position:absolute;top:20px;right:24px;font-size:46px;font-weight:800;color:rgba(37,99,235,.10)}
.iconbox{width:46px;height:46px;border-radius:15px;background:linear-gradient(135deg,var(--blue),var(--tap));color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:16px}
.card p{color:var(--muted);font-size:14px;margin-top:8px}
.card{position:relative}

/* ===== TESTIMONIALS ===== */
.quote{font-size:14px;color:var(--muted);margin:12px 0 18px}
.who b{display:block;font-size:14px}.who span{font-size:12px;color:var(--faint)}

/* ===== FAQ ===== */
.faq{max-width:720px;margin:36px auto 0}
.faq-item{border-radius:18px;margin-bottom:10px;overflow:hidden}
.faq-q{width:100%;background:none;border:none;font:inherit;color:inherit;font-weight:600;font-size:15px;text-align:left;padding:18px 22px;cursor:pointer;display:flex;justify-content:space-between;gap:14px;align-items:center}
.faq-q::after{content:"⌄";font-size:18px;color:var(--blue);transition:transform .3s}
.faq-item.open .faq-q::after{transform:rotate(180deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .35s ease}
.faq-a p{padding:0 22px 18px;font-size:14px;color:var(--muted)}
.faq-item.open .faq-a{max-height:220px}

/* ===== CTA BANNER ===== */
.cta-banner{border-radius:32px;background:linear-gradient(135deg,#0f1929,#13233d 55%,#1d4ed8);color:#fff;text-align:center;padding:64px 28px;position:relative;overflow:hidden}
.cta-banner::before{content:"";position:absolute;top:-90px;left:50%;transform:translateX(-50%);width:280px;height:280px;border-radius:50%;background:rgba(6,182,212,.3);filter:blur(70px)}
.cta-banner p{color:rgba(255,255,255,.7);max-width:520px;margin:14px auto 28px;position:relative}
.cta-banner h2,.cta-banner .btn{position:relative}
.btn-white{background:#fff;color:#0f1929}
.btn-white:hover{background:#eef2ff}

/* ===== PRODUCTS ===== */
.price-card{display:flex;flex-direction:column;border-radius:30px;padding:28px}
.price-card.popular{border:2px solid rgba(37,99,235,.45)}
.badge{position:absolute;top:-12px;left:26px;background:var(--blue);color:#fff;font-size:11px;font-weight:700;padding:5px 12px;border-radius:999px}
.pvisual{aspect-ratio:8/5;border-radius:22px;background:linear-gradient(135deg,#0f1929,#13233d 55%,#1d4ed8);display:flex;align-items:center;justify-content:center;color:var(--tap);font-size:42px;position:relative;margin-bottom:20px}
.pvisual .qr{width:42px;height:42px;right:12px;bottom:12px;font-size:22px}
.price{font-size:38px;font-weight:800;letter-spacing:-.02em;margin:14px 0 4px}
.price small{font-size:13px;font-weight:500;color:var(--faint)}
.feat{list-style:none;margin:16px 0 22px;flex:1}
.feat li{font-size:14px;color:var(--muted);padding:5px 0 5px 26px;position:relative}
.feat li::before{content:"✓";position:absolute;left:0;color:var(--blue);font-weight:700}

/* ===== FORMS ===== */
.formcard{border-radius:30px;padding:34px;max-width:680px;margin:36px auto 0}
label{display:block;font-size:13px;font-weight:600;margin:16px 0 6px}
label small{font-weight:400;color:var(--faint)}
input,select,textarea{width:100%;font:inherit;font-size:14px;color:var(--text);background:var(--glass);border:1px solid var(--border);border-radius:15px;padding:12px 16px;outline:none;transition:.2s}
input:focus,select:focus,textarea:focus{border-color:var(--blue);box-shadow:0 0 0 4px rgba(37,99,235,.14)}
textarea{min-height:110px;resize:vertical}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:0 16px}
@media(max-width:600px){.form-row{grid-template-columns:1fr}}
form .btn{margin-top:24px}
.note{font-size:12px;color:var(--faint);text-align:center;margin-top:12px}
.success{display:none;border-radius:18px;padding:18px 22px;margin-top:20px;border:1px solid rgba(16,185,129,.35);background:rgba(16,185,129,.08);font-size:14px}
.success.show{display:block}

/* ===== CONTACT ===== */
.contact-grid{display:grid;grid-template-columns:1.3fr 1fr;gap:20px;margin-top:36px}
@media(max-width:820px){.contact-grid{grid-template-columns:1fr}}
.contact-line{display:flex;align-items:center;gap:12px;font-size:14px;padding:8px 0}
.contact-line span:first-child{color:var(--blue);font-size:18px}
.map{border-radius:22px;min-height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--faint);font-size:13px;text-align:center;padding:20px;margin-top:16px}
.socials{display:flex;gap:8px;margin-top:10px}
.socials a{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:16px;color:var(--muted);background:var(--bg-soft);transition:.2s}
.socials a:hover{color:var(--blue);background:rgba(37,99,235,.10)}

/* ===== FOOTER ===== */
footer{border-top:1px solid var(--border);background:var(--bg-soft);padding:54px 0 0;margin-top:40px}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:28px}
@media(max-width:820px){.foot-grid{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.foot-grid{grid-template-columns:1fr}}
.foot-grid h4{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--faint);margin-bottom:14px}
.foot-grid a{display:block;font-size:14px;color:var(--muted);text-decoration:none;padding:4px 0}
.foot-grid a:hover{color:var(--blue)}
.foot-grid p{font-size:13px;color:var(--muted);max-width:260px;margin-top:10px}
.copyright{text-align:center;font-size:12px;color:var(--faint);border-top:1px solid var(--border);margin-top:40px;padding:20px}

/* ===== FLOATING ===== */
#toTop{position:fixed;right:22px;bottom:22px;z-index:90;width:46px;height:46px;border-radius:50%;border:1px solid var(--glass-border);background:var(--glass);backdrop-filter:blur(14px);color:var(--blue);font-size:18px;cursor:pointer;opacity:0;pointer-events:none;transition:.3s;box-shadow:var(--shadow)}
#toTop.show{opacity:1;pointer-events:auto}
#cookies{position:fixed;left:16px;right:16px;bottom:16px;z-index:95;max-width:560px;margin:0 auto;border-radius:22px;padding:18px 20px;display:none;gap:14px;align-items:center;flex-wrap:wrap}
#cookies.show{display:flex}
#cookies p{flex:1;font-size:13px;color:var(--muted);min-width:200px}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}html{scroll-behavior:auto}}
</style>
</head>
<body data-theme="light">

<nav class="glass">
  <div class="container nav-inner">
    <a class="brand" href="#/home">
      <svg viewBox="0 0 200 168" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="24" y="8" width="152" height="152" rx="36" fill="#0f1929"></rect><text x="80" y="112" font-family="Inter,sans-serif" font-size="78" font-weight="800" fill="#ffffff" text-anchor="middle">R</text><path d="M118 60 Q126 52 134 60" fill="none" stroke="#06b6d4" stroke-width="5.5" stroke-linecap="round"></path><path d="M118 76 Q128 65 138 76" fill="none" stroke="#06b6d4" stroke-width="5.5" stroke-linecap="round" opacity="0.6"></path><path d="M118 92 Q130 79 142 92" fill="none" stroke="#06b6d4" stroke-width="5.5" stroke-linecap="round" opacity="0.32"></path></svg>
      ReviewTap
    </a>
    <div class="nav-links" id="navLinks">
      <a href="#/home" data-page="home">Home</a>
      <a href="#/products" data-page="products">Products</a>
      <a href="#/about" data-page="about">About</a>
      <a href="#/support" data-page="support">Support</a>
      <a href="#/contact" data-page="contact">Contact</a>
    </div>
    <div class="nav-actions">
      <button class="icon-btn" id="themeBtn" aria-label="Toggle dark mode">🌙</button>
      <a class="btn btn-primary" href="#/order">Order now</a>
      <button class="icon-btn hamburger" id="menuBtn" aria-label="Open menu">☰</button>
    </div>
  </div>
  <div class="mobile-menu" id="mobileMenu">
    <a href="#/home" data-page="home">Home</a>
    <a href="#/products" data-page="products">Products</a>
    <a href="#/about" data-page="about">About</a>
    <a href="#/support" data-page="support">Support</a>
    <a href="#/contact" data-page="contact">Contact</a>
    <a href="#/order" class="btn btn-primary" style="justify-content:center;margin-top:8px">Order now</a>
  </div>
</nav>

<!-- ================= HOME ================= -->
<main id="page-home" class="page">
  <div class="container">
    <section class="hero">
      <div>
        <span class="pill glass">📱 Works with every modern iPhone &amp; Android</span>
        <h1>Get More 5-Star Google Reviews <span class="grad">with One Tap.</span></h1>
        <p class="lead" style="margin-top:20px">ReviewTap cards carry an NFC chip linked to your Google review page. A customer taps their phone on the card, your review page opens instantly — no app, no searching, no typing. Reviews go from "I'll do it later" to done in ten seconds.</p>
        <div class="hero-ctas">
          <a class="btn btn-primary btn-lg" href="#/order">Order now →</a>
          <a class="btn btn-ghost btn-lg" href="#/contact">Contact us</a>
        </div>
      </div>
      <div class="mockwrap">
        <span class="ring"></span><span class="ring"></span><span class="ring"></span>
        <div class="nfc-card">
          <div class="nfc-top">
            <svg viewBox="24 8 152 152" width="30" height="30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="24" y="8" width="152" height="152" rx="36" fill="rgba(255,255,255,.14)"></rect><text x="80" y="112" font-family="Inter,sans-serif" font-size="78" font-weight="800" fill="#ffffff" text-anchor="middle">R</text><path d="M118 60 Q126 52 134 60" fill="none" stroke="#06b6d4" stroke-width="5.5" stroke-linecap="round"></path><path d="M118 76 Q128 65 138 76" fill="none" stroke="#06b6d4" stroke-width="5.5" stroke-linecap="round" opacity="0.6"></path><path d="M118 92 Q130 79 142 92" fill="none" stroke="#06b6d4" stroke-width="5.5" stroke-linecap="round" opacity="0.32"></path></svg>
            <span style="font-size:20px">📶</span>
          </div>
          <div class="nfc-label">Tap to review us on</div>
          <div class="nfc-google">Google</div>
          <div class="stars">★★★★★</div>
          <div class="qr" aria-label="QR code placeholder"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0f1929" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM19 19h2v2h-2zM14 19h2M19 14h2"/></svg></div>
          <div class="nfc-foot">reviewtap · NFC inside</div>
        </div>
      </div>
    </section>

    <section style="padding-top:0">
      <div class="stats glass reveal">
        <div class="stat"><b data-count="1200" data-suffix="+">0</b><span>Businesses helped</span></div>
        <div class="stat"><b data-count="85000" data-suffix="+">0</b><span>Reviews generated</span></div>
        <div class="stat"><b data-count="1.4" data-suffix="★" data-decimals="1">0</b><span>Average rating increase</span></div>
      </div>
    </section>

    <section>
      <div class="center reveal">
        <div class="eyebrow">How it works</div>
        <h2 style="margin-top:10px">From happy customer to 5-star review in seconds</h2>
        <p class="lead">Three steps. No friction. That's the whole trick.</p>
      </div>
      <div class="grid grid-3" style="margin-top:40px">
        <div class="card glass reveal"><span class="stepnum">1</span><div class="iconbox">📱</div><h3>Customer taps their phone</h3><p>Hold any modern smartphone against the ReviewTap card, stand or sticker. The NFC chip does the rest — no app to install.</p></div>
        <div class="card glass reveal"><span class="stepnum">2</span><div class="iconbox">🔗</div><h3>Your Google review page opens instantly</h3><p>The phone jumps straight to your business's review form on Google. No searching your name, no scrolling, no dead ends.</p></div>
        <div class="card glass reveal"><span class="stepnum">3</span><div class="iconbox">⭐</div><h3>Customer leaves a review</h3><p>They rate you while the great experience is still fresh — right there at the counter, the table or the door.</p></div>
      </div>
    </section>

    <section>
      <div class="center reveal">
        <div class="eyebrow">Why ReviewTap</div>
        <h2 style="margin-top:10px">Built to grow your reputation on autopilot</h2>
      </div>
      <div class="grid grid-3" style="margin-top:40px">
        <div class="card glass reveal"><div class="iconbox">📈</div><h3>Rank higher on Google</h3><p>Review count and recency are key local-SEO signals. More fresh reviews push you up in Maps and search results.</p></div>
        <div class="card glass reveal"><div class="iconbox">⚡</div><h3>Zero friction for customers</h3><p>No app, no QR-hunting, no typing your business name. One tap and the review form is open.</p></div>
        <div class="card glass reveal"><div class="iconbox">💳</div><h3>One-time cost, no subscription</h3><p>Buy the card once and use it forever. No monthly fees, no per-review charges, no lock-in.</p></div>
        <div class="card glass reveal"><div class="iconbox">📍</div><h3>Win more local customers</h3><p>88% of people trust online reviews as much as personal recommendations. A strong profile turns searchers into visitors.</p></div>
        <div class="card glass reveal"><div class="iconbox">🔁</div><h3>Reusable, forever</h3><p>The chip links to your Google profile for life and can be re-programmed if anything changes.</p></div>
        <div class="card glass reveal"><div class="iconbox">🛡️</div><h3>Fully policy-compliant</h3><p>ReviewTap simply makes leaving a genuine review easier. No incentives, no gating — just less friction.</p></div>
      </div>
    </section>

    <section>
      <div class="center reveal"><div class="eyebrow">Testimonials</div><h2 style="margin-top:10px">Local businesses, real results</h2></div>
      <div class="grid grid-3" style="margin-top:40px">
        <div class="card glass reveal"><div class="stars">★★★★★</div><p class="quote">"We went from 34 reviews to over 210 in four months. The card lives next to the till and customers actually enjoy tapping it."</p><div class="who"><b>Maria Lindqvist</b><span>Owner, Café Söder</span></div></div>
        <div class="card glass reveal"><div class="stars">★★★★★</div><p class="quote">"Every driver carries a ReviewTap sticker on the delivery bag. Our rating climbed from 4.1 to 4.7 and orders followed."</p><div class="who"><b>Omar Haddad</b><span>Manager, Zaytoun Kitchen</span></div></div>
        <div class="card glass reveal"><div class="stars">★★★★★</div><p class="quote">"Simplest marketing money I've spent. One stand at reception and we get more reviews in a week than we used to get in a quarter."</p><div class="who"><b>Jenny Ek</b><span>Founder, Ek Physio Clinic</span></div></div>
      </div>
    </section>

    <section>
      <div class="center reveal"><div class="eyebrow">FAQ</div><h2 style="margin-top:10px">Questions, answered</h2></div>
      <div class="faq reveal">
        <div class="faq-item glass open"><button class="faq-q">Do my customers need to install an app?</button><div class="faq-a"><p>No. NFC is built into every modern iPhone (iPhone 7 and newer) and Android phone. Tapping the card opens your Google review page in the phone's browser — nothing to download.</p></div></div>
        <div class="faq-item glass"><button class="faq-q">What if a phone doesn't support NFC?</button><div class="faq-a"><p>Every ReviewTap product also carries a printed QR code that points to the same review link, so older phones can simply scan instead of tap.</p></div></div>
        <div class="faq-item glass"><button class="faq-q">How do you link the card to my business?</button><div class="faq-a"><p>During checkout you give us your Google Business Profile URL. We program every card, stand or sticker to that exact review link before shipping.</p></div></div>
        <div class="faq-item glass"><button class="faq-q">Is there a monthly fee?</button><div class="faq-a"><p>No. You pay once for the physical product and it works forever. If your review link ever changes, we'll re-program it for free.</p></div></div>
        <div class="faq-item glass"><button class="faq-q">Is this allowed by Google?</button><div class="faq-a"><p>Yes. ReviewTap only removes friction from leaving a genuine review. We never gate reviews, filter by rating or offer incentives — all of which Google prohibits.</p></div></div>
        <div class="faq-item glass"><button class="faq-q">How fast is delivery?</button><div class="faq-a"><p>Cards are programmed and shipped within 2 business days. Most customers receive their order within a week.</p></div></div>
      </div>
    </section>

    <section>
      <div class="cta-banner reveal">
        <h2>Your next 5-star review is one tap away.</h2>
        <p>Join 1,200+ local businesses collecting reviews on autopilot. Programmed to your Google profile and shipped within 2 business days.</p>
        <a class="btn btn-white btn-lg" href="#/order">Order your ReviewTap →</a>
      </div>
    </section>
  </div>
</main>

<!-- ================= PRODUCTS ================= -->
<main id="page-products" class="page">
  <div class="container">
    <section>
      <div class="center reveal">
        <div class="eyebrow">Products</div>
        <h2 style="margin-top:10px">Pick the format that fits your counter</h2>
        <p class="lead">Every product ships programmed to your Google review page, with a printed QR code as backup. One-time cost — no subscription, ever.</p>
      </div>
      <div class="grid grid-3" style="margin-top:44px">
        <div class="price-card card glass popular reveal">
          <span class="badge">Most popular</span>
          <div class="pvisual">💳<div class="qr"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0f1929" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3z"/></svg></div></div>
          <h3>NFC Google Review Card</h3>
          <p style="color:var(--muted);font-size:13px">The classic. Hand it over, get the review.</p>
          <div class="price">$29 <small>per card</small></div>
          <ul class="feat"><li>Tap or scan — NFC chip + printed QR code</li><li>Works with iPhone and Android, no app needed</li><li>Linked to your Google review page for life</li><li>Durable matte PVC, credit-card sized</li><li>Free custom branding with your logo</li></ul>
          <a class="btn btn-primary btn-block" href="#/order" data-product="NFC Google Review Card">Buy Review Card</a>
        </div>
        <div class="price-card card glass reveal">
          <div class="pvisual">🖥️<div class="qr"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0f1929" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3z"/></svg></div></div>
          <h3>NFC Review Stand</h3>
          <p style="color:var(--muted);font-size:13px">Counter-top stand for checkouts and reception desks.</p>
          <div class="price">$49 <small>per stand</small></div>
          <ul class="feat"><li>Freestanding acrylic display with NFC + QR</li><li>Perfect next to the till or on tables</li><li>"Rate your visit" call-to-action printed on front</li><li>Weighted base, wipe-clean surface</li><li>Free custom branding with your logo</li></ul>
          <a class="btn btn-ghost btn-block" href="#/order" data-product="NFC Review Stand">Buy Review Stand</a>
        </div>
        <div class="price-card card glass reveal">
          <div class="pvisual">🏷️<div class="qr"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0f1929" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3z"/></svg></div></div>
          <h3>NFC Sticker</h3>
          <p style="color:var(--muted);font-size:13px">Stick it anywhere — doors, menus, packaging.</p>
          <div class="price">$19 <small>per sticker</small></div>
          <ul class="feat"><li>Ultra-thin adhesive NFC tag + QR code</li><li>Waterproof and scratch-resistant</li><li>Great for delivery bags and takeaway boxes</li><li>Re-programmable if your link ever changes</li><li>Pack discounts on 10+ stickers</li></ul>
          <a class="btn btn-ghost btn-block" href="#/order" data-product="NFC Sticker">Buy Sticker</a>
        </div>
      </div>
      <p class="note" style="margin-top:28px">Need 25+ units or custom branding across locations? <a href="#/contact" style="color:var(--blue);font-weight:600">Contact us for volume pricing.</a></p>
    </section>
  </div>
</main>

<!-- ================= ORDER ================= -->
<main id="page-order" class="page">
  <div class="container">
    <section>
      <div class="center reveal">
        <div class="eyebrow">Order</div>
        <h2 style="margin-top:10px">Order your ReviewTap</h2>
        <p class="lead">Tell us where to point the tap. We program every unit to your Google review page before it ships.</p>
      </div>
      <form class="formcard glass reveal" id="orderForm">
        <div class="form-row">
          <div><label for="o-biz">Business name</label><input id="o-biz" name="Business name" required placeholder="Café Söder"></div>
          <div><label for="o-name">Contact name</label><input id="o-name" name="Contact name" required placeholder="Maria Lindqvist"></div>
        </div>
        <div class="form-row">
          <div><label for="o-email">Email</label><input id="o-email" name="Email" type="email" required placeholder="you@business.com"></div>
          <div><label for="o-phone">Phone number</label><input id="o-phone" name="Phone" type="tel" required placeholder="+46 70 123 45 67"></div>
        </div>
        <label for="o-url">Google Business Profile URL</label>
        <input id="o-url" name="Google Business Profile URL" type="url" required placeholder="https://g.page/your-business">
        <div class="form-row">
          <div><label for="o-product">Product</label>
            <select id="o-product" name="Product" required>
              <option>NFC Google Review Card — $29 per card</option>
              <option>NFC Review Stand — $49 per stand</option>
              <option>NFC Sticker — $19 per sticker</option>
            </select>
          </div>
          <div><label for="o-qty">Quantity</label><input id="o-qty" name="Quantity" type="number" min="1" max="999" value="1" required></div>
        </div>
        <label for="o-notes">Notes <small>optional</small></label>
        <textarea id="o-notes" name="Notes" placeholder="Logo placement, multiple locations, delivery instructions…"></textarea>
        <button type="submit" class="btn btn-primary btn-lg btn-block">Submit order</button>
        <p class="note">No payment taken now — submitting opens an email to us with your order details, and we confirm by reply.</p>
        <div class="success" id="orderSuccess">✅ <b>Order prepared!</b> Your email app should have opened with the order details — just press send. We'll confirm within one business day.</div>
      </form>
    </section>
  </div>
</main>

<!-- ================= SUPPORT ================= -->
<main id="page-support" class="page">
  <div class="container">
    <section>
      <div class="center reveal">
        <div class="eyebrow">Support</div>
        <h2 style="margin-top:10px">We keep every tap working</h2>
        <p class="lead">Report an issue, ask for help or request a replacement — we reply within one business day.</p>
      </div>
      <div class="grid grid-3" style="margin-top:40px">
        <div class="card glass reveal"><div class="iconbox">🔧</div><h3>Report an issue</h3><p>Card not opening the review page, or opening the wrong one? Tell us and we'll fix or re-program it.</p></div>
        <div class="card glass reveal"><div class="iconbox">🔄</div><h3>Request a replacement</h3><p>Damaged or lost products are replaced free within the first year.</p></div>
        <div class="card glass reveal"><div class="iconbox">💬</div><h3>Ask for help</h3><p>Setup questions, best placement tips, staff training — we're happy to help you get more taps.</p></div>
      </div>
      <form class="formcard glass reveal" id="supportForm">
        <div class="form-row">
          <div><label for="s-name">Name</label><input id="s-name" name="Name" required placeholder="Your name"></div>
          <div><label for="s-email">Email</label><input id="s-email" name="Email" type="email" required placeholder="you@business.com"></div>
        </div>
        <div class="form-row">
          <div><label for="s-order">Order number <small>optional</small></label><input id="s-order" name="Order number" placeholder="e.g. RT-1042"></div>
          <div><label for="s-issue">Issue type</label>
            <select id="s-issue" name="Issue type" required>
              <option>Card not working</option><option>Wrong review link</option><option>Request a replacement</option><option>Order question</option><option>Billing question</option><option>Something else</option>
            </select>
          </div>
        </div>
        <label for="s-msg">Message</label>
        <textarea id="s-msg" name="Message" required placeholder="Describe what's happening and we'll sort it out."></textarea>
        <button type="submit" class="btn btn-primary btn-lg btn-block">Send to support</button>
        <div class="success" id="supportSuccess">✅ <b>Ticket prepared!</b> Your email app should have opened — just press send and support will reply within one business day.</div>
      </form>
    </section>
  </div>
</main>

<!-- ================= CONTACT ================= -->
<main id="page-contact" class="page">
  <div class="container">
    <section>
      <div class="center reveal">
        <div class="eyebrow">Contact</div>
        <h2 style="margin-top:10px">Talk to a human</h2>
        <p class="lead">Questions about products, bulk orders or partnerships — we answer everything within one business day.</p>
      </div>
      <div class="contact-grid">
        <form class="card glass reveal" id="contactForm" style="border-radius:30px">
          <div class="form-row">
            <div><label for="c-name">Name</label><input id="c-name" name="Name" required placeholder="Your name"></div>
            <div><label for="c-email">Email</label><input id="c-email" name="Email" type="email" required placeholder="you@business.com"></div>
          </div>
          <label for="c-msg">Message</label>
          <textarea id="c-msg" name="Message" required placeholder="Volume pricing, partnerships, press — anything goes."></textarea>
          <button type="submit" class="btn btn-primary btn-lg btn-block">Send message</button>
          <div class="success" id="contactSuccess">✅ <b>Message prepared!</b> Your email app should have opened — just press send.</div>
        </form>
        <div class="reveal">
          <div class="card glass" style="border-radius:24px">
            <div class="contact-line"><span>✉️</span><a href="mailto:hello@reviewtap.example" style="text-decoration:none">hello@reviewtap.example</a></div>
            <div class="contact-line"><span>📞</span><a href="tel:+46701234567" style="text-decoration:none">+46 70 123 45 67</a></div>
            <div class="contact-line"><span>📍</span>Kistagången 12, 164 40 Kista, Stockholm</div>
            <div class="socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">📷</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">👍</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter / X">🐦</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">💼</a>
            </div>
          </div>
          <div class="map glass">
            <span style="font-size:26px">🗺️</span>
            <b>Google Maps embed goes here</b>
            Replace this block with your Maps iframe once your address is final.
          </div>
        </div>
      </div>
    </section>
  </div>
</main>

<!-- ================= ABOUT ================= -->
<main id="page-about" class="page">
  <div class="container">
    <section>
      <div class="reveal" style="max-width:720px">
        <div class="eyebrow">About ReviewTap</div>
        <h1 style="font-size:clamp(30px,5vw,46px);margin-top:12px">Great service deserves to be seen.</h1>
        <p class="lead" style="margin-top:18px">ReviewTap exists to help local businesses grow by making it incredibly easy for customers to leave Google reviews. Every card, stand and sticker we ship carries an NFC chip linked directly to your review page — so the moment a customer is delighted, they can say so in seconds.</p>
        <p class="lead" style="margin-top:14px">More reviews mean better local rankings, more trust and more customers walking through your door. We just remove everything standing between a happy customer and the five stars you earned.</p>
      </div>
      <div class="grid grid-3" style="margin-top:44px">
        <div class="card glass reveal"><div class="iconbox">🎯</div><h3>Friction is the enemy</h3><p>9 out of 10 happy customers say they'd leave a review — most never do, because finding your Google page takes too many steps. We shrink those steps to one tap.</p></div>
        <div class="card glass reveal"><div class="iconbox">❤️</div><h3>Built for local</h3><p>Cafés, salons, clinics, workshops, restaurants — businesses that live by word of mouth. Your Google rating is modern word of mouth, and it deserves a fair shot.</p></div>
        <div class="card glass reveal"><div class="iconbox">✨</div><h3>Honest by design</h3><p>We never gate, filter or incentivize reviews. ReviewTap only makes the genuine ones easier to leave — fully in line with Google's policies.</p></div>
      </div>
      <div class="center" style="margin-top:44px"><a class="btn btn-primary btn-lg" href="#/order">Start collecting reviews →</a></div>
    </section>
  </div>
</main>

<footer>
  <div class="container foot-grid">
    <div>
      <a class="brand" href="#/home" style="font-size:16px">
        <svg viewBox="0 0 200 168" width="26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="24" y="8" width="152" height="152" rx="36" fill="#0f1929"></rect><text x="80" y="112" font-family="Inter,sans-serif" font-size="78" font-weight="800" fill="#ffffff" text-anchor="middle">R</text><path d="M118 60 Q126 52 134 60" fill="none" stroke="#06b6d4" stroke-width="5.5" stroke-linecap="round"></path><path d="M118 76 Q128 65 138 76" fill="none" stroke="#06b6d4" stroke-width="5.5" stroke-linecap="round" opacity="0.6"></path><path d="M118 92 Q130 79 142 92" fill="none" stroke="#06b6d4" stroke-width="5.5" stroke-linecap="round" opacity="0.32"></path></svg>
        ReviewTap
      </a>
      <p>NFC review cards that turn happy customers into 5-star Google reviews — with a single tap.</p>
    </div>
    <div><h4>Product</h4><a href="#/products">NFC Review Card</a><a href="#/products">NFC Review Stand</a><a href="#/products">NFC Sticker</a><a href="#/order">Order now</a></div>
    <div><h4>Company</h4><a href="#/about">About</a><a href="#/contact">Contact</a><a href="#/support">Support</a></div>
    <div><h4>Get in touch</h4><a href="mailto:hello@reviewtap.example">hello@reviewtap.example</a><a href="tel:+46701234567">+46 70 123 45 67</a></div>
  </div>
  <div class="copyright">© <span id="year"></span> ReviewTap. All rights reserved.</div>
</footer>

<button id="toTop" aria-label="Scroll back to top">↑</button>

<div id="cookies" class="glass">
  <p>🍪 We use essential cookies to keep the site running and optional analytics cookies to improve it.</p>
  <button class="btn btn-ghost" style="padding:9px 18px" id="cookieNo">Decline</button>
  <button class="btn btn-primary" style="padding:9px 18px" id="cookieYes">Accept</button>
</div>

<script>
/* ====== CONFIG — change this to your real email ====== */
var BUSINESS_EMAIL = "hello@reviewtap.example";

/* ====== PAGE ROUTER (hash-based, works on GitHub Pages) ====== */
var pages = ["home","products","order","support","contact","about"];
function route(){
  var name = (location.hash.replace("#/","") || "home").split("?")[0];
  if(pages.indexOf(name) === -1) name = "home";
  pages.forEach(function(p){
    var el = document.getElementById("page-"+p);
    if(el) el.classList.toggle("active", p === name);
  });
  document.querySelectorAll("[data-page]").forEach(function(a){
    a.classList.toggle("active", a.getAttribute("data-page") === name);
  });
  document.getElementById("mobileMenu").classList.remove("open");
  window.scrollTo({top:0, behavior:"auto"});
  observeReveals();
}
window.addEventListener("hashchange", route);

/* ====== THEME ====== */
var themeBtn = document.getElementById("themeBtn");
function setTheme(t){
  document.body.setAttribute("data-theme", t);
  themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
  try{ localStorage.setItem("rt-theme", t); }catch(e){}
}
themeBtn.addEventListener("click", function(){
  setTheme(document.body.getAttribute("data-theme") === "dark" ? "light" : "dark");
});
(function(){
  var saved = null;
  try{ saved = localStorage.getItem("rt-theme"); }catch(e){}
  if(saved){ setTheme(saved); }
  else if(window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches){ setTheme("dark"); }
})();

/* ====== MOBILE MENU ====== */
document.getElementById("menuBtn").addEventListener("click", function(){
  document.getElementById("mobileMenu").classList.toggle("open");
});

/* ====== SCROLL REVEALS ====== */
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} });
},{threshold:.12});
function observeReveals(){
  document.querySelectorAll(".page.active .reveal:not(.in)").forEach(function(el){ io.observe(el); });
  runCounters();
}

/* ====== STAT COUNTERS ====== */
var counted = false;
function runCounters(){
  document.querySelectorAll(".page.active [data-count]").forEach(function(el){
    if(el.dataset.done) return;
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        obs.unobserve(el);
        el.dataset.done = "1";
        var target = parseFloat(el.dataset.count), dec = parseInt(el.dataset.decimals||"0",10), suf = el.dataset.suffix||"";
        var t0 = performance.now(), dur = 1400;
        function tick(now){
          var t = Math.min((now - t0)/dur, 1);
          var eased = 1 - Math.pow(1-t, 3);
          el.textContent = (target*eased).toLocaleString("en-US",{minimumFractionDigits:dec,maximumFractionDigits:dec}) + suf;
          if(t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    },{threshold:.4});
    obs.observe(el);
  });
}

/* ====== FAQ ====== */
document.querySelectorAll(".faq-q").forEach(function(btn){
  btn.addEventListener("click", function(){
    var item = btn.parentElement;
    var wasOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach(function(i){ i.classList.remove("open"); });
    if(!wasOpen) item.classList.add("open");
  });
});

/* ====== FORMS -> pre-filled email ====== */
function wireForm(formId, successId, subject){
  var form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener("submit", function(e){
    e.preventDefault();
    var lines = [];
    form.querySelectorAll("input,select,textarea").forEach(function(f){
      if(f.name) lines.push(f.name + ": " + f.value);
    });
    var url = "mailto:" + BUSINESS_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    window.location.href = url;
    document.getElementById(successId).classList.add("show");
  });
}
wireForm("orderForm","orderSuccess","New ReviewTap order");
wireForm("supportForm","supportSuccess","ReviewTap support request");
wireForm("contactForm","contactSuccess","ReviewTap contact message");

/* Pre-select product when coming from a Buy button */
document.querySelectorAll("[data-product]").forEach(function(a){
  a.addEventListener("click", function(){
    var sel = document.getElementById("o-product");
    if(!sel) return;
    var want = a.getAttribute("data-product");
    Array.prototype.forEach.call(sel.options, function(opt, i){
      if(opt.text.indexOf(want) === 0) sel.selectedIndex = i;
    });
  });
});

/* ====== SCROLL TO TOP ====== */
var toTop = document.getElementById("toTop");
window.addEventListener("scroll", function(){
  toTop.classList.toggle("show", window.scrollY > 600);
},{passive:true});
toTop.addEventListener("click", function(){ window.scrollTo({top:0,behavior:"smooth"}); });

/* ====== COOKIE BANNER ====== */
(function(){
  var seen = null;
  try{ seen = localStorage.getItem("rt-cookies"); }catch(e){}
  if(!seen) document.getElementById("cookies").classList.add("show");
  function answer(v){
    try{ localStorage.setItem("rt-cookies", v); }catch(e){}
    document.getElementById("cookies").classList.remove("show");
  }
  document.getElementById("cookieYes").addEventListener("click", function(){ answer("accepted"); });
  document.getElementById("cookieNo").addEventListener("click", function(){ answer("declined"); });
})();

document.getElementById("year").textContent = new Date().getFullYear();
route();
</script>
</body>
</html>

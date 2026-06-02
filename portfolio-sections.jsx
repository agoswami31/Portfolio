/* global window, React, PORTFOLIO */
const { useState, useEffect, useRef } = React;
const P = window.PORTFOLIO;

/* ----------------------------- injected styles ----------------------------- */
const CSS = `
/* ════════════════════════════════════════════════════════════════
   Duna "Warm Minimalism" — earthy neutrals, full-radius CTAs, soft
   shadows, single GT-America-style family + Fragment Mono labels.
   ════════════════════════════════════════════════════════════════ */

/* nav */
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 60; transition: background .3s, border-color .3s, backdrop-filter .3s; border-bottom: 1px solid transparent; }
.nav.solid { background: rgba(247,247,245,.82); backdrop-filter: blur(14px) saturate(140%); border-bottom-color: var(--line); }
.nav-in { position: relative; max-width: var(--maxw); margin: 0 auto; padding: 16px var(--gut); display: flex; align-items: center; justify-content: space-between; }
.brand { display: flex; align-items: center; gap: 12px; font-weight: 600; letter-spacing: -0.01em; }
.brand:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; border-radius: 6px; }
.brand-mono { width: 38px; height: 38px; border-radius: 10px; background: var(--primary); color: var(--primary-ink); display: grid; place-items: center; font-family: var(--mono); font-weight: 400; font-size: 14px; box-shadow: var(--shadow-sm); }
.brand small { display: block; font-family: var(--mono); font-size: 10.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--faint); font-weight: 400; }
.nav-links { display: flex; align-items: center; gap: 4px; }
.nav-links a { font-size: 14px; color: var(--muted); padding: 8px 13px; border-radius: var(--r-input); transition: color .2s, background .2s; font-weight: 500; }
.nav-links a:hover { color: var(--text); background: var(--bg-2); }
.nav-links a.active { color: var(--primary); font-weight: 600; }
.nav-links a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.nav-cta { margin-left: 8px; }
/* mobile hamburger + dropdown menu */
.nav-burger { display:none; width:42px; height:42px; border-radius:11px; border:1px solid var(--line); background:var(--surface); flex-direction:column; align-items:center; justify-content:center; gap:5px; flex-shrink:0; }
.nav-burger span { display:block; width:18px; height:2px; background:var(--text); border-radius:2px; transition: transform .25s ease, opacity .2s ease; }
.nav.menu-open .nav-burger span:nth-child(1){ transform: translateY(3.5px) rotate(45deg); }
.nav.menu-open .nav-burger span:nth-child(2){ transform: translateY(-3.5px) rotate(-45deg); }
.nav-burger:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
.nav-book { display:none; }
@media (max-width: 860px){
  .nav-burger { display:flex; }
  .nav-links { position:absolute; top:calc(100% + 6px); left:0; right:0; flex-direction:column; align-items:stretch; gap:2px; padding:12px; background:var(--surface); border:1px solid var(--line); border-radius:16px; box-shadow:var(--shadow-lg); transform:translateY(-10px); opacity:0; pointer-events:none; transition:opacity .22s ease, transform .22s ease; }
  .nav-links.open { transform:none; opacity:1; pointer-events:auto; }
  .nav-links a.lk { font-size:16px; padding:13px 14px; border-radius:10px; color:var(--text); }
  .nav-links a.lk:hover { background:var(--bg-2); }
  .nav-links a.lk.active { background:var(--bg-2); color:var(--primary); }
  .nav-cta { margin:6px 0 0; justify-content:center; width:100%; }
  .nav-book { display:inline-flex; margin-top:6px; justify-content:center; width:100%; }
}

/* hero — soft landscape horizon instead of a hard glow */
.hero { position: relative; padding: 158px 0 64px; overflow: hidden; }
.hero-grid-bg { position:absolute; inset:0; background:
   linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--accent) 5%, transparent) 62%, color-mix(in srgb, var(--accent) 9%, transparent) 78%, transparent 100%);
   -webkit-mask-image: radial-gradient(ellipse 110% 80% at 50% 10%, #000 40%, transparent 85%); mask-image: radial-gradient(ellipse 110% 80% at 50% 10%, #000 40%, transparent 85%); pointer-events:none; }
.hero-glow { position:absolute; top:-180px; left:50%; transform:translateX(-50%); width:900px; height:520px; background: radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 10%, transparent), transparent 68%); filter: blur(24px); pointer-events:none; }
.hero-in { position: relative; display:grid; grid-template-columns: 1.35fr 0.85fr; gap: 56px; align-items:center; }
.hero-col { min-width:0; }
.hero-portrait { position:relative; }
.hero-portrait image-slot { width:100%; height:auto; aspect-ratio: 4/5; display:block; border-radius: var(--r-card); box-shadow: var(--shadow-lg); }
.hero-portrait .tagchip { position:absolute; left:-14px; bottom:24px; background:var(--surface); border:1px solid var(--line); border-radius:9999px; padding:9px 16px; font-family:var(--mono); font-size:11.5px; letter-spacing:.06em; color:var(--muted); box-shadow:var(--shadow-md); display:flex; align-items:center; gap:8px; }
.hero-portrait .tagchip i { width:7px;height:7px;border-radius:50%; background:var(--accent); }
@media (max-width: 900px){ .hero-in { grid-template-columns:1fr; gap:44px; } .hero-portrait { max-width:340px; } }
.hero-status { display:inline-flex; align-items:center; gap:10px; font-family:var(--mono); font-size:11.5px; letter-spacing:.02em; color:var(--muted); border:1px solid var(--line); background: var(--surface); padding:8px 16px; border-radius:9999px; margin-bottom:30px; white-space:nowrap; max-width:100%; box-shadow: var(--shadow-sm); }
.dot { width:7px; height:7px; border-radius:50%; background: var(--accent); box-shadow: 0 0 0 0 var(--accent); animation: pulse 2.4s infinite; }
@keyframes pulse { 0%{ box-shadow:0 0 0 0 color-mix(in srgb,var(--accent) 60%,transparent);} 70%{ box-shadow:0 0 0 9px transparent;} 100%{ box-shadow:0 0 0 0 transparent;} }
.hero h1 { font-family: var(--serif); font-weight: 500; font-size: clamp(40px, 5.6vw, 74px); line-height: 1.04; letter-spacing: -0.025em; max-width: 15ch; }
.hero h1 em { font-style: normal; color: var(--accent); }
.hero-sub { color: var(--muted); font-size: clamp(16px,1.4vw,19px); max-width: 56ch; margin-top: 28px; line-height:1.65; }
.hero-cta { display: flex; gap: 14px; margin-top: 36px; flex-wrap: wrap; }
.hero-meta { display:flex; gap: 34px; margin-top: 48px; flex-wrap: wrap; }
.hero-meta .mi b { font-family: var(--serif); font-size: 30px; font-weight: 600; letter-spacing:-0.02em; }
.hero-meta .mi span { display:block; font-family: var(--mono); font-size: 11px; letter-spacing:.08em; text-transform:uppercase; color: var(--faint); margin-top:2px; }

/* marquee */
.marquee { margin-top: 60px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 15px 0; overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.marquee-track { display: flex; gap: 38px; width: max-content; animation: scroll 42s linear infinite; }
.marquee:hover .marquee-track { animation-play-state: paused; }
.marquee-track span { font-family: var(--mono); font-size: 13px; color: var(--muted); white-space: nowrap; display:inline-flex; align-items:center; gap:38px; }
.marquee-track span::after { content:"✦"; color: var(--accent); opacity:.55; }
@keyframes scroll { to { transform: translateX(-50%); } }

/* proof — Duna cards on warm container */
.proof { display:grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--line); border:1px solid var(--line); border-radius:var(--r-card); overflow:hidden; box-shadow: var(--shadow-sm); }
.proof .cell { background: var(--surface); padding: 30px 26px; }
.proof .cell b { font-family: var(--serif); font-size: clamp(38px,4vw,54px); font-weight:600; line-height:1; display:block; letter-spacing:-0.025em; }
.proof .cell .l { font-size: 14px; margin-top: 12px; max-width: 22ch; color: var(--text); }
.proof .cell .n { font-family: var(--mono); font-size: 11px; color: var(--faint); margin-top: 8px; letter-spacing:.04em; }
@media (max-width: 760px){ .proof { grid-template-columns: repeat(2,1fr);} }

/* work cards */
.work-list { display: grid; gap: 22px; }
.pcard { position: relative; display: grid; grid-template-columns: 1.05fr 1fr; gap: 0; border: 1px solid var(--line); border-radius: var(--r-card); overflow: hidden; background: var(--surface); cursor: pointer; transition: border-color .3s, transform .3s, box-shadow .3s; box-shadow: var(--shadow-sm); }
.pcard:hover { border-color: var(--line-2); transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.pcard:focus-within { outline: 2px solid var(--accent); outline-offset: 2px; }
.pcard:hover .pcard-cover-fig { transform: scale(1.03); }
.pcard-body { padding: 38px 38px 34px; display:flex; flex-direction:column; }
.pcard-top { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom: 26px; }
.pchip { font-family: var(--mono); font-size: 11px; letter-spacing:.06em; text-transform:uppercase; color: var(--muted); border:1px solid var(--line); padding: 5px 11px; border-radius: 9999px; background: var(--bg-2); }
.pcard h3 { font-family: var(--serif); font-size: clamp(30px, 3.4vw, 42px); font-weight:600; line-height:1.04; letter-spacing:-0.025em; }
.pcard .kick { color: var(--cAccent); font-size: 13px; font-family: var(--mono); margin-top: 10px; }
.pcard .psum { color: var(--muted); margin-top: 18px; font-size: 15.5px; line-height: 1.65; max-width: 46ch; }
.pcard .pstack { display:flex; flex-wrap:wrap; gap:8px; margin-top: auto; padding-top: 26px; }
.pstack .t { font-size: 12px; font-family: var(--mono); color: var(--faint); border:1px solid var(--line); padding: 4px 10px; border-radius: var(--r-input); }
.pcard-open { margin-top: 22px; display:inline-flex; align-items:center; gap:9px; font-weight:600; font-size:14px; color: var(--cAccent); }
.pcard-open svg { transition: transform .25s; }
.pcard:hover .pcard-open svg { transform: translate(3px,-3px); }
.pcard-cover { position: relative; overflow:hidden; background: linear-gradient(150deg, var(--bg-2), var(--surface-container, #dbd9cd)); border-left: 1px solid var(--line); min-height: 340px; }
.pcard-cover image-slot { position:absolute; inset:0; width:100%; height:100%; }
.pcard-cover-fig { position:absolute; inset:0; transition: transform .5s ease; }
@media (max-width: 880px){ .pcard { grid-template-columns: 1fr; } .pcard-cover { min-height: 220px; border-left:none; border-top:1px solid var(--line);} }

/* branded project cover (logo + visit link, replaces screenshots) */
.pcard-brand { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; text-decoration:none;
  background: radial-gradient(120% 85% at 50% 8%, color-mix(in srgb, var(--cAccent) 18%, transparent), transparent 72%); transition: background .35s; }
.pcard-brand:focus-visible { outline:2px solid var(--cAccent); outline-offset:-4px; }
.brandmark { width:100px; height:100px; border-radius:24px; background:var(--surface); display:grid; place-items:center; overflow:hidden; box-shadow: var(--shadow-lg); transition: transform .35s ease; }
.brandmark img { width:100%; height:100%; object-fit:cover; display:block; }
.pcard:hover .brandmark { transform: translateY(-4px) scale(1.05); }
.brandmeta { text-align:center; display:flex; flex-direction:column; gap:7px; }
.brand-name { font-family:var(--serif); font-size:24px; font-weight:600; letter-spacing:-0.02em; color:var(--text); }
.brand-visit { display:inline-flex; align-items:center; justify-content:center; gap:7px; font-family:var(--mono); font-size:12px; letter-spacing:.02em; color:var(--cAccent); }
.pcard-brand:hover .brand-visit { text-decoration:underline; text-underline-offset:3px; }

/* overlay / case study — Duna xl-radius sheet, 40-60% scrim */
.ov { position: fixed; inset: 0; z-index: 120; display:flex; justify-content:center; align-items:flex-start; background: rgba(26,24,22,.5); backdrop-filter: blur(8px); overflow-y: auto; padding: 0; animation: ovf .3s ease; }
@keyframes ovf { from{ opacity:0;} to{opacity:1;} }
.ov-sheet { background: var(--bg); width: min(960px, 100%); min-height: 100vh; border-left:1px solid var(--line); border-right:1px solid var(--line); animation: ovs .4s cubic-bezier(.2,.7,.2,1); }
@keyframes ovs { from{ transform: translateY(26px); opacity:.4;} to{transform:none;opacity:1;} }
.ov-bar { position: sticky; top:0; z-index:5; display:flex; align-items:center; justify-content:space-between; padding: 18px 36px; background: rgba(247,247,245,.88); backdrop-filter: blur(12px); border-bottom:1px solid var(--line); }
.ov-bar .nm { font-weight:600; display:flex; align-items:center; gap:12px; }
.ov-bar .nm i { width:9px; height:9px; border-radius:50%; background: var(--cAccent); display:inline-block; }
.ov-close { width:40px; height:40px; border-radius:var(--r-input); border:1px solid var(--line); display:grid;place-items:center; transition: all .2s; background: var(--surface); }
.ov-close:hover { border-color: var(--primary); color: var(--primary); }
.ov-close:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.ov-hero { padding: 50px 56px 40px; border-bottom:1px solid var(--line); position:relative; overflow:hidden; }
.ov-hero .htag { font-family:var(--mono); font-size:12px; letter-spacing:.08em; text-transform:uppercase; color: var(--cAccent); }
.ov-hero h2 { font-family: var(--serif); font-weight:600; font-size: clamp(40px, 6vw, 64px); line-height:1.03; letter-spacing:-0.025em; margin: 16px 0 14px; }
.ov-hero .hsum { color: var(--muted); max-width: 60ch; font-size: 17px; line-height:1.65; }
.ov-hero .hmeta { display:flex; gap:26px; margin-top: 26px; flex-wrap:wrap; font-family:var(--mono); font-size:12px; color:var(--faint); }
.ov-hero .hmeta a { color: var(--cAccent); }
.ov-glow { position:absolute; top:-160px; right:-120px; width:480px; height:380px; background: radial-gradient(ellipse, color-mix(in srgb, var(--cAccent) 16%, transparent), transparent 70%); filter: blur(12px); pointer-events:none;}
.ov-body { padding: 12px 56px 90px; }
.cs-block { display: grid; grid-template-columns: 220px 1fr; gap: 30px; padding: 30px 0; border-bottom: 1px solid var(--line); }
.cs-block:last-child { border-bottom:none; }
.cs-block .lab { font-family: var(--mono); font-size: 12px; letter-spacing:.08em; text-transform:uppercase; color: var(--faint); padding-top: 4px; display:flex; gap:12px; }
.cs-block .lab span.no { color: var(--cAccent); }
.ov-hero .cover-wide { margin-top:30px; }
.ov-hero .cover-wide image-slot { width:100%; height:auto; aspect-ratio: 16/8; display:block; border:1px solid var(--line); border-radius: var(--r-card); }
.cover-brand { display:flex; align-items:center; gap:24px; margin-top:30px; padding:30px 34px; text-decoration:none; border:1px solid var(--line); border-radius: var(--r-card);
  background: linear-gradient(120deg, color-mix(in srgb, var(--cAccent) 14%, var(--surface)), var(--surface)); box-shadow: var(--shadow-sm); transition: box-shadow .25s, transform .25s; }
.cover-brand:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.cover-brand:focus-visible { outline:2px solid var(--cAccent); outline-offset:3px; }
.cover-brand .brandmark { width:76px; height:76px; border-radius:18px; }
.cover-brand .brandmeta { text-align:left; align-items:flex-start; }
.cover-brand .brand-name { font-size:27px; }
.cover-brand .brand-visit { color:var(--cAccent); }
.cover-brand:hover .brand-visit { text-decoration:underline; text-underline-offset:3px; }
.cs-block .txt { font-size: 17px; line-height: 1.72; color: var(--muted); max-width: 62ch; }
.cs-block.hl .txt { color: var(--text); font-size: 18.5px; }
@media (max-width: 720px){ .ov-hero,.ov-body{ padding-left:26px; padding-right:26px;} .ov-bar{ padding-left:22px; padding-right:22px;} .cs-block{ grid-template-columns:1fr; gap:10px; } }

/* stack */
.stack-grid { display:grid; grid-template-columns: repeat(2,1fr); gap: 1px; background: var(--line); border:1px solid var(--line); border-radius:var(--r-card); overflow:hidden; box-shadow: var(--shadow-sm); }
.stack-cell { background: var(--surface); padding: 30px 32px; }
.stack-cell h4 { font-family: var(--mono); font-size:12.5px; letter-spacing:.1em; text-transform:uppercase; color: var(--accent); margin-bottom:18px; display:flex; align-items:center; gap:10px; }
.stack-cell h4 .ix { color: var(--faint); }
.chips { display:flex; flex-wrap:wrap; gap:9px; }
.chips .c { font-size:14px; color:var(--muted); border:1px solid var(--line); background: var(--bg-2); padding:7px 13px; border-radius:9999px; transition: all .2s; }
.chips .c:hover { border-color: var(--accent); color: var(--accent); background: var(--surface); }
@media (max-width: 720px){ .stack-grid{ grid-template-columns:1fr; } }

/* experience */
.xp { display:grid; grid-template-columns: 1fr; gap: 0; }
.xrow { display:grid; grid-template-columns: 240px 1fr; gap: 32px; padding: 34px 0; border-top:1px solid var(--line); }
.xrow:last-child { border-bottom:1px solid var(--line); }
.xrow .when { font-family:var(--mono); font-size:13px; color: var(--faint); }
.xrow .when .here { color: var(--accent); display:inline-flex; align-items:center; gap:7px; }
.xrow .when .here i { width:7px;height:7px;border-radius:50%;background:var(--accent); }
.xhead { display:flex; align-items:center; gap:18px; }
.xlogo { width:60px; height:60px; border-radius:14px; flex-shrink:0; display:grid; place-items:center; background:#fff; border:1px solid var(--line); overflow:hidden; box-shadow:var(--shadow-sm); }
.xlogo img { width:100%; height:100%; object-fit:contain; padding:9px; }
.xlogo-mono { font-family:var(--serif); font-weight:600; font-size:24px; color:var(--accent); letter-spacing:-0.01em; }
.xrow h3 { font-size: 21px; font-weight:600; letter-spacing:-0.015em; }
.xrow .org { color: var(--muted); font-size:15px; margin-top:3px; }
.xrow .org .pl { color: var(--faint); }
.xrow ul { list-style:none; margin-top:16px; display:grid; gap:9px; }
.xrow ul li { position:relative; padding-left:20px; color:var(--muted); font-size:15px; line-height:1.55; }
.xrow ul li::before { content:""; position:absolute; left:2px; top:10px; width:5px; height:5px; border-radius:50%; background: var(--accent); }
@media (max-width: 720px){ .xrow{ grid-template-columns:1fr; gap:14px; } }

/* builder */
.builder { background: var(--bg-2); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
.builder-head { max-width: 24ch; }
.builder-statement { font-family: var(--serif); font-weight:500; font-size: clamp(26px, 3.4vw, 40px); line-height: 1.3; letter-spacing:-0.02em; max-width: 24ch; }
.builder-statement b { color: var(--accent); font-style: normal; font-weight:500; }
.prin { display:grid; grid-template-columns: repeat(2,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:var(--r-card); overflow:hidden; margin-top:48px; box-shadow: var(--shadow-sm); }
.prin .p { background: var(--surface); padding: 32px 30px; }
.prin .p .num { font-family:var(--mono); font-size:12px; color:var(--accent); }
.prin .p h4 { font-size: 20px; font-weight:600; margin:14px 0 10px; letter-spacing:-0.015em; }
.prin .p p { color: var(--muted); font-size:15px; line-height:1.6; }
@media (max-width: 720px){ .prin{ grid-template-columns:1fr; } }
.lovebadge { display:inline-flex; align-items:center; gap:9px; font-family:var(--mono); font-size:12px; letter-spacing:.06em; color: var(--muted); border:1px solid var(--line); border-radius:9999px; padding:7px 14px; margin-top:40px; background: var(--surface); }
.lovebadge b { color: var(--accent); font-weight:600; }

/* about / more / contact */
.about-grid { display:grid; grid-template-columns: 1.3fr 1fr; gap: 60px; align-items:start; }
.about-grid p { color:var(--muted); font-size: 18px; line-height:1.72; margin-bottom:18px; max-width: 52ch; }
.about-grid p .accent { color: var(--text); font-weight:600; }
.about-portrait { margin-bottom: 26px; }
.about-portrait image-slot { width:100%; height:auto; aspect-ratio: 5/4; display:block; border-radius: var(--r-card); box-shadow: var(--shadow-md); }
/* snapshot facts card (replaces the candid photo) */
.about-card { margin-bottom: 36px; border:1px solid var(--line); border-radius: var(--r-card); background:
  linear-gradient(150deg, color-mix(in srgb, var(--accent) 7%, var(--surface)), var(--surface)); box-shadow: var(--shadow-sm); overflow:hidden; }
.ac-row { display:flex; align-items:baseline; justify-content:space-between; gap:18px; padding:15px 20px; border-bottom:1px solid var(--line); }
.ac-row:last-child { border-bottom:none; }
.ac-k { font-family:var(--mono); font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); flex-shrink:0; }
.ac-v { font-size:14.5px; color:var(--text); text-align:right; font-weight:500; }
.ac-v.hl { color:var(--accent); }
.side h4 { font-family:var(--mono); font-size:12px; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); margin-bottom:16px; }
.morelist { display:grid; gap:10px; margin-bottom: 36px; }
.morelist .m { border:1px solid var(--line); border-radius:var(--r-input); padding:16px 18px; background:var(--surface); transition: border-color .2s, box-shadow .2s; }
.morelist .m:hover { border-color: var(--line-2); box-shadow: var(--shadow-sm); }
.morelist .m b { font-size:15px; }
.morelist .m p { color: var(--muted); font-size:13.5px; margin:5px 0 0; line-height:1.5; }
.ach { list-style:none; display:grid; gap:11px; }
.ach li { position:relative; padding-left:24px; color:var(--muted); font-size:14.5px; line-height:1.5; }
.ach li::before { content:"→"; position:absolute; left:0; color:var(--accent); }
.edu { border:1px solid var(--line); border-radius:var(--r-input); padding:18px; margin-top: 26px; background: var(--surface); }
.edu b { font-size:15px; } .edu .d { color:var(--muted); font-size:13.5px; margin-top:4px;} .edu .g { font-family:var(--mono); font-size:12px; color:var(--accent); margin-top:6px; }
@media (max-width: 820px){ .about-grid{ grid-template-columns:1fr; gap:40px; } }

/* contact */
.contact { text-align:center; padding: clamp(90px,13vh,160px) 0; }
.contact h2 { font-family:var(--serif); font-weight:600; font-size: clamp(40px,7vw,84px); line-height:1.02; letter-spacing:-0.03em; }
.contact h2 em { font-style:normal; color:var(--accent); }
.contact .csub { color:var(--muted); max-width:48ch; margin: 24px auto 0; font-size:18px; }
.contact-cta { display:flex; gap:14px; justify-content:center; margin-top:40px; flex-wrap:wrap; }
.contact-links { display:flex; gap:28px; justify-content:center; margin-top:48px; flex-wrap:wrap; font-family:var(--mono); font-size:13px; }
.contact-links a { color:var(--muted); display:inline-flex; align-items:center; gap:8px; transition:color .2s; }
.contact-links a:hover { color:var(--accent); }
.contact-links a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }
.foot { border-top:1px solid var(--line); padding: 30px 0; }
.foot-in { display:flex; justify-content:space-between; align-items:center; gap:18px; flex-wrap:wrap; font-family:var(--mono); font-size:12px; color:var(--faint); }

/* ═══════════ responsive refinements ═══════════ */
@media (max-width: 1024px){
  .hero-in { gap: 40px; }
  .about-grid { gap: 44px; }
}
@media (max-width: 760px){
  :root { --gut: 24px; }
  .hero { padding: 116px 0 48px; }
  .hero-meta { gap: 22px 30px; }
  .hero-meta .mi b { font-size: 26px; }
  .marquee { margin-top: 44px; }
  .section-head { margin-bottom: 40px; }
  .pcard-body { padding: 30px 26px; }
  .pcard-cover { min-height: 210px; }
  .brandmark { width: 84px; height: 84px; border-radius: 20px; }
  .ov-hero { padding: 40px 24px 32px; }
  .ov-body { padding: 8px 24px 64px; }
  .ov-bar { padding: 16px 22px; }
  .cover-brand { flex-direction: column; align-items: flex-start; padding: 22px 22px; }
  .cover-brand .brandmeta { text-align: left; }
}
@media (max-width: 480px){
  :root { --gut: 18px; }
  body { font-size: 16px; }
  .hero { padding: 100px 0 36px; }
  .hero-status { font-size: 11px; padding: 7px 13px; white-space: normal; }
  .hero-cta { gap: 10px; }
  .hero-cta .btn { flex: 1 1 auto; justify-content: center; }
  .hero-meta { gap: 16px 24px; }
  .proof .cell { padding: 22px 18px; }
  .proof .cell b { font-size: 38px; }
  .pcard-body { padding: 24px 20px; }
  .pcard-top { margin-bottom: 20px; }
  .brand-name { font-size: 22px; }
  /* stack the snapshot card rows so long values never get squeezed */
  .ac-row { flex-direction: column; align-items: flex-start; gap: 3px; padding: 13px 18px; }
  .ac-v { text-align: left; }
  .contact-cta { gap: 10px; }
  .contact-cta .btn { flex: 1 1 100%; justify-content: center; }
  .contact-links { gap: 14px 20px; }
  .foot-in { justify-content: center; text-align: center; }
  .xlogo { width: 54px; height: 54px; }
  .xhead { gap: 14px; }
}
@media (max-width: 360px){
  .brand small { display: none; }
  .hero-meta { gap: 14px 18px; }
}
`;

function Styles() {
  useEffect(() => {
    if (document.getElementById("__p_css")) return;
    const s = document.createElement("style");
    s.id = "__p_css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }, []);
  return null;
}

/* ----------------------------- helpers ----------------------------- */
// Mark a node revealed, then PIN its final state after the animation window by
// removing the transition — so it can never stay frozen-invisible in contexts
// that don't paint frames (print, PDF, reduced-motion, throttled capture iframes).
function markIn(n, delay) {
  if (n.dataset.revealed) return;
  n.dataset.revealed = "1";
  if (delay) n.style.transitionDelay = delay + "ms";
  requestAnimationFrame(() => n.classList.add("in"));
  setTimeout(() => {
    n.style.transition = "none";
    n.style.opacity = "1";
    n.style.transform = "none";
  }, 850 + (delay || 0));
}

function useReveal(eager) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = () => {
      const list = [...el.querySelectorAll(".reveal")];
      if (el.classList.contains("reveal")) list.push(el);
      return list;
    };
    if (eager) {
      nodes().forEach((n, i) => markIn(n, Math.min(i * 90, 600)));
      return;
    }
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      nodes().forEach((n) => {
        if (n.dataset.revealed) return;
        const r = n.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) markIn(n);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    const t1 = setTimeout(check, 60);
    const t2 = setTimeout(check, 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t1); clearTimeout(t2); if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

const Arrow = (p) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

/* ----------------------------- project covers (SVG placeholders) ----------------------------- */
function Cover({ kind, accent }) {
  const a = accent;
  if (kind === "api") {
    return (
      <svg viewBox="0 0 440 360" preserveAspectRatio="xMidYMid slice" style={{width:"100%",height:"100%"}}>
        <defs><linearGradient id="ga" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} stopOpacity="0.16"/><stop offset="1" stopColor={a} stopOpacity="0"/></linearGradient></defs>
        <rect width="440" height="360" fill="url(#ga)"/>
        {/* image grid panel */}
        <g transform="translate(40,52)" opacity="0.9">
          <rect width="120" height="120" rx="8" fill="none" stroke={a} strokeOpacity="0.5"/>
          {[0,1,2].map(r=>[0,1,2].map(c=>(<rect key={r+'-'+c} x={8+c*36} y={8+r*36} width="30" height="30" rx="3" fill={a} fillOpacity={0.08+((r+c)%3)*0.07}/>)))}
        </g>
        {/* waveform */}
        <g transform="translate(40,210)">
          <text x="0" y="-10" fontFamily="monospace" fontSize="11" fill={a} fillOpacity="0.8">voice · 600+ langs</text>
          {Array.from({length:34}).map((_,i)=>{const h=10+Math.abs(Math.sin(i*0.7))*46;return <rect key={i} x={i*10} y={48-h/2} width="4" height={h} rx="2" fill={a} fillOpacity="0.55"/>;})}
        </g>
        {/* video frames */}
        <g transform="translate(250,52)">
          <text x="0" y="-10" fontFamily="monospace" fontSize="11" fill={a} fillOpacity="0.8">text-to-video</text>
          {[0,1,2].map(i=>(<rect key={i} x={i*22} y={i*14} width="120" height="74" rx="6" fill="#0a0b0d" stroke={a} strokeOpacity={0.35+i*0.18}/>))}
          <circle cx="318" cy="100" r="14" fill="none" stroke={a} strokeOpacity="0.8"/>
          <path d="M313 93 L313 107 L324 100 Z" fill={a}/>
        </g>
        <g transform="translate(250,232)" fontFamily="monospace" fontSize="11" fill={a} fillOpacity="0.7">
          <text x="0" y="0">POST /v1/generate</text>
          <text x="0" y="20" fillOpacity="0.4">{"{ modality: \"image|voice|video\" }"}</text>
        </g>
      </svg>
    );
  }
  if (kind === "kids") {
    return (
      <svg viewBox="0 0 440 360" preserveAspectRatio="xMidYMid slice" style={{width:"100%",height:"100%"}}>
        <defs><linearGradient id="gk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} stopOpacity="0.18"/><stop offset="1" stopColor={a} stopOpacity="0"/></linearGradient></defs>
        <rect width="440" height="360" fill="url(#gk)"/>
        {/* slide */}
        <g transform="translate(44,56)">
          <rect width="180" height="120" rx="10" fill="#0a0b0d" stroke={a} strokeOpacity="0.5"/>
          <rect x="16" y="18" width="92" height="9" rx="4" fill={a} fillOpacity="0.7"/>
          <rect x="16" y="36" width="148" height="6" rx="3" fill={a} fillOpacity="0.25"/>
          <rect x="16" y="50" width="120" height="6" rx="3" fill={a} fillOpacity="0.25"/>
          <circle cx="40" cy="92" r="20" fill={a} fillOpacity="0.18"/>
          <text x="40" y="98" fontSize="20" textAnchor="middle">🏏</text>
        </g>
        {/* quiz */}
        <g transform="translate(250,56)">
          <text x="0" y="-8" fontFamily="monospace" fontSize="11" fill={a} fillOpacity="0.8">quiz</text>
          {[0,1,2].map(i=>(<g key={i}><rect y={i*30} width="146" height="22" rx="11" fill="#0a0b0d" stroke={a} strokeOpacity={i===1?0.9:0.3}/><circle cx="13" cy={i*30+11} r="5" fill={i===1?a:"none"} stroke={a} strokeOpacity="0.6"/><rect x="26" y={i*30+7} width={70-i*12} height="7" rx="3.5" fill={a} fillOpacity="0.3"/></g>))}
        </g>
        {/* voice bubble */}
        <g transform="translate(44,210)">
          <rect width="356" height="92" rx="14" fill="#0a0b0d" stroke={a} strokeOpacity="0.4"/>
          <text x="20" y="30" fontFamily="monospace" fontSize="11" fill={a} fillOpacity="0.8">narrated in parent's voice</text>
          {Array.from({length:40}).map((_,i)=>{const h=6+Math.abs(Math.sin(i*0.55))*30;return <rect key={i} x={20+i*8} y={62-h/2} width="3.5" height={h} rx="2" fill={a} fillOpacity="0.5"/>;})}
        </g>
      </svg>
    );
  }
  // fashion
  return (
    <svg viewBox="0 0 440 360" preserveAspectRatio="xMidYMid slice" style={{width:"100%",height:"100%"}}>
      <defs><linearGradient id="gf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} stopOpacity="0.18"/><stop offset="1" stopColor={a} stopOpacity="0"/></linearGradient></defs>
      <rect width="440" height="360" fill="url(#gf)"/>
      {/* before */}
      <g transform="translate(40,60)">
        <text x="0" y="-12" fontFamily="monospace" fontSize="11" fill={a} fillOpacity="0.6">input</text>
        <rect width="150" height="200" rx="12" fill="#0a0b0d" stroke={a} strokeOpacity="0.3"/>
        <rect x="45" y="30" width="60" height="60" rx="30" fill={a} fillOpacity="0.12"/>
        <path d="M40 170 Q75 120 110 170 L110 190 L40 190 Z" fill={a} fillOpacity="0.12"/>
      </g>
      {/* arrow */}
      <g transform="translate(206,160)"><path d="M0 0 H26 M26 0 L18 -7 M26 0 L18 7" stroke={a} strokeWidth="2" fill="none" strokeLinecap="round"/></g>
      {/* after */}
      <g transform="translate(250,60)">
        <text x="0" y="-12" fontFamily="monospace" fontSize="11" fill={a} fillOpacity="0.9">magic swap</text>
        <rect width="150" height="200" rx="12" fill="#0a0b0d" stroke={a} strokeOpacity="0.7"/>
        <rect x="45" y="30" width="60" height="60" rx="30" fill={a} fillOpacity="0.3"/>
        <path d="M40 170 Q75 110 110 170 L110 190 L40 190 Z" fill={a} fillOpacity="0.35"/>
        <g transform="translate(112,16)"><path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z" fill={a}/></g>
      </g>
    </svg>
  );
}

window.Cover = Cover;
window.Styles = Styles;
window.useReveal = useReveal;
window.Arrow = Arrow;
window.P = P;

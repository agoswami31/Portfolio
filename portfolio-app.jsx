/* global window, React, ReactDOM */
const { useState, useEffect, useRef, useCallback } = React;
const { Cover, Styles, useReveal, Arrow, P } = window;
const { useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio } = window;

/* ----------------------------- NAV ----------------------------- */
const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "builder", label: "Builder" },
  { id: "about", label: "About" },
];

function Nav({ active }) {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  // Auto-close the mobile menu once the viewport grows back to desktop width.
  useEffect(() => {
    const on = () => { if (window.innerWidth > 860) setMenu(false); };
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  const close = () => setMenu(false);
  return (
    <nav className={"nav" + (solid || menu ? " solid" : "") + (menu ? " menu-open" : "")}>
      <div className="nav-in">
        <a href="#top" className="brand" onClick={close}>
          <span className="brand-mono">{P.person.monogram}</span>
          <span>{P.person.name}<small>{P.person.role}</small></span>
        </a>
        <button className="nav-burger" aria-label="Toggle navigation menu" aria-expanded={menu}
                onClick={() => setMenu((m) => !m)}>
          <span></span><span></span>
        </button>
        <div className={"nav-links" + (menu ? " open" : "")}>
          {SECTIONS.map((s) => (
            <a key={s.id} href={"#" + s.id} onClick={close} className={"lk" + (active === s.id ? " active" : "")}>{s.label}</a>
          ))}
          <a className="btn btn-ghost nav-cta" href={P.person.resume} target="_blank" rel="noopener" onClick={close}>Résumé <Arrow/></a>
          <a className="btn btn-primary nav-book" href={P.person.calendlyUrl} target="_blank" rel="noopener" onClick={close}>Book a call</a>
        </div>
      </div>
    </nav>
  );
}

/* ----------------------------- HERO ----------------------------- */
function Hero() {
  const ref = useReveal(true);
  const caps = [...P.capabilities, ...P.capabilities];
  return (
    <header className="hero" id="top" ref={ref}>
      <div className="hero-grid-bg"></div>
      <div className="hero-glow"></div>
      <div className="wrap hero-in">
        <div className="hero-col">
          <div className="hero-status reveal">
            <span className="dot"></span> Open to AI Builder roles
          </div>
          <h1 className="reveal">I build <em>generative-AI</em> products. The model, the inference, and the app people actually use.</h1>
          <p className="hero-sub reveal">{P.person.sub}</p>
          <div className="hero-cta reveal">
            <a className="btn btn-primary" href="#work">See what I've shipped <Arrow/></a>
            <a className="btn btn-ghost" href="#builder">How I build</a>
          </div>
          <div className="hero-meta reveal">
            {P.proof.map((m, i) => (
              <div className="mi" key={i}><b>{m.n}</b><span>{m.label}</span></div>
            ))}
          </div>
        </div>
        <div className="hero-col reveal">
          <div className="hero-portrait">
            <image-slot id="headshot" shape="rounded" radius="20" src="uploads/headshot.jpg" placeholder="Drop your headshot"></image-slot>
            <div className="tagchip"><i></i> {P.person.role}</div>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="marquee reveal">
          <div className="marquee-track">
            {caps.map((c, i) => (<span key={i}>{c}</span>))}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ----------------------------- WORK ----------------------------- */
function WorkCard({ p, onOpen }) {
  return (
    <article className="pcard reveal" style={{ "--cAccent": p.accent }} onClick={() => onOpen(p)}>
      <div className="pcard-body">
        <div className="pcard-top">
          <span className="pchip">{p.tag}</span>
          <span className="pchip">{p.year}</span>
        </div>
        <h3>{p.name}</h3>
        <div className="kick" style={{ color: p.accent }}>{p.kicker}</div>
        <p className="psum">{p.summary}</p>
        <div className="pstack">
          {p.stack.map((t, i) => (<span className="t" key={i}>{t}</span>))}
        </div>
        <span className="pcard-open" style={{ color: p.accent }}>Read the case study <Arrow/></span>
      </div>
      <div className="pcard-cover">
        <a className="pcard-brand" href={p.url} target="_blank" rel="noopener"
           aria-label={"Visit " + p.name + " — " + p.domain}
           onClick={(e) => e.stopPropagation()}>
          <span className="brandmark">
            <img src={"uploads/logo-" + p.id + ".png"} alt={p.name + " logo"} loading="lazy" />
          </span>
          <span className="brandmeta">
            <span className="brand-name">{p.name}</span>
            <span className="brand-visit">{p.domain} <Arrow/></span>
          </span>
        </a>
      </div>
    </article>
  );
}

function Work({ onOpen }) {
  const ref = useReveal();
  return (
    <section className="section" id="work" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <h2 className="section-title">Three products. All <em>shipped</em>, all live.</h2>
          <span className="section-idx">01 — Featured work</span>
        </div>
        <div className="work-list">
          {P.projects.map((p) => (<WorkCard key={p.id} p={p} onOpen={onOpen} />))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CASE STUDY OVERLAY ----------------------------- */
const CS_FIELDS = [
  ["overview", "Overview"],
  ["problem", "Problem"],
  ["why", "Why it matters"],
  ["solution", "Solution"],
  ["role", "My role"],
  ["architecture", "Architecture"],
  ["ai", "AI / ML components"],
  ["challenges", "Engineering challenges"],
  ["product", "Product decisions"],
  ["scale", "Deploy & scale"],
  ["lessons", "Lessons learned"],
  ["roadmap", "Roadmap"],
  ["impact", "Impact"],
];

function CaseStudy({ p, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  if (!p) return null;
  const d = p.detail;
  return (
    <div className="ov" style={{ "--cAccent": p.accent }} onClick={(e) => { if (e.target.classList.contains("ov")) onClose(); }}>
      <div className="ov-sheet">
        <div className="ov-bar">
          <span className="nm"><i></i> {p.name}</span>
          <button className="ov-close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="ov-hero">
          <div className="ov-glow"></div>
          <div className="htag">{p.tag} · {p.year}</div>
          <h2>{p.name}</h2>
          <p className="hsum">{p.kicker}. {p.summary}</p>
          <div className="hmeta">
            <span>↗ <a href={p.url} target="_blank" rel="noopener">{p.domain}</a></span>
            <span>{p.stack.slice(0, 4).join(" · ")}</span>
          </div>
          <a className="cover-brand" href={p.url} target="_blank" rel="noopener">
            <span className="brandmark">
              <img src={"uploads/logo-" + p.id + ".png"} alt={p.name + " logo"} loading="lazy" />
            </span>
            <span className="brandmeta">
              <span className="brand-name">{p.name}</span>
              <span className="brand-visit">Visit {p.domain} <Arrow/></span>
            </span>
          </a>
        </div>
        <div className="ov-body">
          {CS_FIELDS.map(([key, label], i) => (
            <div className={"cs-block" + (key === "overview" ? " hl" : "")} key={key}>
              <div className="lab"><span className="no">{String(i + 1).padStart(2, "0")}</span> {label}</div>
              <div className="txt">{d[key]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- STACK ----------------------------- */
function Stack() {
  const ref = useReveal();
  return (
    <section className="section" id="stack" ref={ref} style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="section-head reveal">
          <h2 className="section-title">A stack that goes <em>all the way down.</em></h2>
          <span className="section-idx">02 — Technical profile</span>
        </div>
        <div className="stack-grid reveal">
          {P.stack.map((g, i) => (
            <div className="stack-cell" key={i}>
              <h4><span className="ix">{String(i + 1).padStart(2, "0")}</span> {g.group}</h4>
              <div className="chips">
                {g.items.map((it, j) => (<span className="c" key={j}>{it}</span>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- EXPERIENCE ----------------------------- */
// Company logo badge. Falls back to a monogram of the org's initials when no
// logo is set or the image fails to load — so a broken URL never shows.
function OrgLogo({ name, src, mono }) {
  const [failed, setFailed] = useState(false);
  const initials = mono || name
    .replace(/\(.*?\)/g, "")              // drop parentheticals e.g. "(UnternehmerTUM)"
    .trim().split(/\s+/).slice(0, 2)
    .map((w) => w[0]).join("").toUpperCase();
  if (!src || failed) {
    return <span className="xlogo xlogo-mono" aria-hidden="true">{initials}</span>;
  }
  return (
    <span className="xlogo">
      <img src={src} alt={name + " logo"} loading="lazy" onError={() => setFailed(true)} />
    </span>
  );
}

function Experience() {
  const ref = useReveal();
  return (
    <section className="section" id="experience" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <h2 className="section-title">Built across <em>four countries.</em></h2>
          <span className="section-idx">03 — Experience</span>
        </div>
        <div className="xp reveal">
          {P.experience.map((x, i) => (
            <div className="xrow" key={i}>
              <div>
                <div className="when">
                  {x.now ? <span className="here"><i></i> {x.time}</span> : x.time}
                </div>
              </div>
              <div>
                <div className="xhead">
                  <OrgLogo name={x.org} src={x.logo} mono={x.mono} />
                  <div>
                    <h3>{x.role}</h3>
                    <div className="org">{x.org} <span className="pl">· {x.place}</span></div>
                  </div>
                </div>
                <ul>{x.points.map((pt, j) => (<li key={j}>{pt}</li>))}</ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- BUILDER (LOVE × AI) ----------------------------- */
function Builder() {
  const ref = useReveal();
  const b = P.builder;
  return (
    <section className="section builder" id="builder" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <h2 className="section-title">{b.lead}: <em>ship first, polish later.</em></h2>
          <span className="section-idx">04 — The builder</span>
        </div>
        <p className="builder-statement reveal">
          I'd rather ship a rough version to <b>real users</b> than polish a demo nobody touches. Find the real problem, build the smallest thing that <b>proves it works</b>, and let the feedback decide what comes next.
        </p>
        <div className="prin reveal">
          {b.principles.map((p, i) => (
            <div className="p" key={i}>
              <div className="num">P{i + 1}</div>
              <h4>{p.t}</h4>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
        <div className="lovebadge reveal">Built for <b>LOVE × AI Builder's Day</b>.</div>
      </div>
    </section>
  );
}

/* ----------------------------- ABOUT ----------------------------- */
function About() {
  const ref = useReveal();
  return (
    <section className="section" id="about" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <h2 className="section-title">More <em>about me.</em></h2>
          <span className="section-idx">05 — About</span>
        </div>
        <div className="about-grid reveal">
          <div>
            <p>I'm a <span className="accent">generative-AI engineer and founder</span>, and I like working on the whole problem instead of just the model. A typical week might be tuning attention kernels for throughput, wiring up an agent that breaks a task apart and calls tools, then writing the onboarding copy users actually read.</p>
            <p>I started out <span className="accent">co-founding a robotics community</span> and building a humanoid robot. Since then I've shipped ML for football analytics in Korea, generative platforms in the US, enterprise AI in Munich, and production GenAI in Toronto.</p>
            <p>These days I build products: an <span className="accent">agent-native media API</span>, an <span className="accent">AI tutor for kids</span>, and a <span className="accent">creative studio for brands</span>. Three that look nothing alike, built for developers, parents, and brands.</p>
          </div>
          <div className="side">
            <div className="about-card">
              <div className="ac-row"><span className="ac-k">Based in</span><span className="ac-v">Bangalore, Karnataka</span></div>
              <div className="ac-row"><span className="ac-k">Now</span><span className="ac-v">{P.person.role} · IntellifAI Labs</span></div>
              <div className="ac-row"><span className="ac-k">Shipped</span><span className="ac-v">3 live products to real users</span></div>
              <div className="ac-row"><span className="ac-k">Across</span><span className="ac-v">Canada · Germany · USA · South Korea</span></div>
              <div className="ac-row"><span className="ac-k">Open to</span><span className="ac-v hl">AI Builder roles</span></div>
            </div>
            <h4>Selected projects</h4>
            <div className="morelist">
              {P.more.map((m, i) => (
                <div className="m" key={i}><b>{m.t}</b><p>{m.d}</p></div>
              ))}
            </div>
            <h4>Leadership & achievements</h4>
            <ul className="ach">
              {P.achievements.map((a, i) => (<li key={i}>{a}</li>))}
            </ul>
            <div className="edu">
              <b>{P.education.school}</b>
              <div className="d">{P.education.degree} · {P.education.time}</div>
              <div className="g">{P.education.grade}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CONTACT ----------------------------- */
function Contact() {
  const ref = useReveal();
  const pr = P.person;
  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="wrap">
        <h2 className="reveal">Let's <em>build</em> something.</h2>
        <p className="csub reveal">I'm after AI Builder roles where what you ship matters more than what you pitch. If that sounds like your team, let's talk.</p>
        <div className="contact-cta reveal">
          <a className="btn btn-primary" href={pr.calendlyUrl} target="_blank" rel="noopener">Book a 30-min call <Arrow/></a>
          <a className="btn btn-ghost" href={"mailto:" + pr.email}>Email me</a>
          <a className="btn btn-ghost" href={pr.resume} target="_blank" rel="noopener">Résumé</a>
        </div>
        <div className="contact-links reveal">
          <a href={pr.calendlyUrl} target="_blank" rel="noopener">↗ Book a call</a>
          <a href={"mailto:" + pr.email}>✉ {pr.email}</a>
          <a href={pr.githubUrl} target="_blank" rel="noopener">↗ {pr.github}</a>
          <a href={pr.linkedinUrl} target="_blank" rel="noopener">↗ {pr.linkedin}</a>
          <a href={"tel:" + pr.phone.replace(/\s/g, "")}>☎ {pr.phone}</a>
        </div>
      </div>
      <footer className="foot">
        <div className="wrap foot-in">
          <span>© 2026 {pr.name}</span>
          <span>Generative AI Engineer · Founder · Builder</span>
        </div>
      </footer>
    </section>
  );
}

/* ----------------------------- APP ----------------------------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#45848d",
  "weight": "regular"
}/*EDITMODE-END*/;

function App() {
  const [open, setOpen] = useState(null);
  const [active, setActive] = useState("");
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const onOpen = useCallback((p) => setOpen(p), []);
  const onClose = useCallback(() => setOpen(null), []);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);
  useEffect(() => {
    document.body.classList.toggle("headline-bold", t.weight === "bold");
  }, [t.weight]);

  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    let raf = 0;
    const check = () => {
      raf = 0;
      const mid = window.innerHeight * 0.4;
      let cur = "";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) cur = id;
      });
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // GSAP ScrollTrigger enhancements — additive, and fully gated on
  // prefers-reduced-motion. Uses gsap.context() so a single revert() on
  // unmount tears down every tween + ScrollTrigger it created.
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gsap = window.gsap, ST = window.ScrollTrigger;
    if (reduce || !gsap || !ST) return;
    gsap.registerPlugin(ST);

    const ctx = gsap.context(() => {
      // 1. Scroll progress bar tracks page scroll.
      gsap.to(".scroll-progress", {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });

      // 2. Hero parallax — portrait drifts up, ambient glow drifts down + breathes.
      gsap.to(".hero-portrait", {
        y: 70, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-glow", {
        y: 130, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-glow", { scale: 1.12, opacity: 0.8, duration: 6, ease: "sine.inOut", repeat: -1, yoyo: true });

      // 3. Stat count-up when the proof bar enters view (skips non-numeric like "Full").
      gsap.utils.toArray(".proof .cell b").forEach((el) => {
        const m = el.textContent.trim().match(/^(\d+)(\D*)$/);
        if (!m) return;
        const end = +m[1], suffix = m[2] || "", o = { v: 0 };
        el.textContent = "0" + suffix;
        ST.create({
          trigger: el, start: "top 92%", once: true,
          onEnter: () => gsap.to(o, {
            v: end, duration: 1.1, ease: "power2.out",
            onUpdate: () => { el.textContent = Math.round(o.v) + suffix; },
          }),
        });
      });

      // 4. Section headings rise in as they enter the viewport.
      gsap.utils.toArray(".section-title").forEach((el) => {
        gsap.from(el, {
          y: 26, opacity: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    });

    // Recompute trigger positions once async assets (logos, headshot) settle.
    const refresh = () => ST.refresh();
    const t = setTimeout(refresh, 400);
    window.addEventListener("load", refresh);
    return () => { clearTimeout(t); window.removeEventListener("load", refresh); ctx.revert(); };
  }, []);

  return (
    <React.Fragment>
      <Styles />
      <div className="scroll-progress" aria-hidden="true"></div>
      <Nav active={active} />
      <Hero />
      <Proof />
      <Work onOpen={onOpen} />
      <Stack />
      <Experience />
      <Builder />
      <About />
      <Contact />
      {open && <CaseStudy p={open} onClose={onClose} />}
      <TweaksPanel>
        <TweakSection label="Accent" />
        <TweakColor label="Signal color" value={t.accent}
          options={["#45848d", "#1b0624", "#160e0b", "#8a5a2b"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Headline weight" />
        <TweakRadio label="Headlines" value={t.weight}
          options={["regular", "bold"]}
          onChange={(v) => setTweak("weight", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

/* proof bar between hero & work */
function Proof() {
  const ref = useReveal();
  return (
    <section className="section" ref={ref} style={{ paddingTop: 0, paddingBottom: "clamp(40px,7vh,90px)" }}>
      <div className="wrap">
        <div className="proof reveal">
          {P.proof.map((m, i) => (
            <div className="cell" key={i}>
              <b>{m.n}</b>
              <div className="l">{m.label}</div>
              <div className="n">{m.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

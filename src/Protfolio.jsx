import { useState, useEffect, useRef } from "react";
import "./Portfolio.css";

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  "About",
  "Skills",
  "Projects",
  "Why Me",
  "Education",
  "Contact",
];

const SKILLS = {
  Frontend: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "REST APIs"],
  Database: ["SQL Server", "MySQL"],
  Tools: ["Git", "GitHub", "Postman", "Figma", "VS Code"],
};

const SKILL_ICONS = {
  "React.js": "⚛️",
  JavaScript: "🟨",
  HTML5: "🟧",
  CSS3: "🔷",
  "Tailwind CSS": "🌊",
  "Node.js": "🟢",
  "Express.js": "🚂",
  "REST APIs": "🔗",
  "SQL Server": "🗄️",
  MySQL: "🐬",
  Git: "🔀",
  GitHub: "🐙",
  Postman: "📮",
  Figma: "🎨",
  "VS Code": "💙",
};

const SKILL_ACCENT = {
  Frontend: "#06b6d4",
  Backend: "#10b981",
  Database: "#8b5cf6",
  Tools: "#f97316",
};

const SKILL_CLASS = {
  Frontend: "frontend",
  Backend: "backend",
  Database: "database",
  Tools: "tools",
};

const PROJECTS = [
  {
    title: "Ride Sharing App(Final Year Project)",
    desc: "A web-based ride sharing platform connecting drivers and passengers with intelligent route searching, real-time scheduling, and dynamic pricing.",
    tech: ["React", ".Net", "SQL Server", "Node.js", "Google Maps API"],
    emoji: "🚗",
    headerClass: "blue-cyan",
    github: "https://github.com/harismirza14/Ride-Share-App",
    // demo: "#",
  },
  {
    title: "Chat Application(Semester Project)",
    desc: "Real-time messaging application with user authentication, chat rooms, typing indicators, and instant message delivery using WebSockets.",
    tech: ["React", "Socket.io", "Node.js", "Express"],
    emoji: "💬",
    headerClass: "violet-purple",
    // github: "#",
    // demo: "#",
  },
  {
    title: "Task Manager(Semester Project)",
    desc: "Productivity web application to manage daily tasks with full CRUD functionality, priority filters, due dates, and drag-and-drop reordering.",
    tech: ["React", "Tailwind CSS", "REST API", "MySQL"],
    emoji: "✅",
    headerClass: "emerald-teal",
    // github: "#",
    // demo: "#",
  },
  {
    title: "E-commerce Website(Semester Project)",
    desc: "Online store with product browsing, category filters, shopping cart, wishlist, and a clean checkout interface built for conversion.",
    tech: ["React", "JavaScript", "CSS3", "REST APIs"],
    emoji: "🛍️",
    headerClass: "rose-orange",
    // github: "#",
    // demo: "#",
  },
];

const WHY_ITEMS = [
  {
    icon: "🧠",
    title: "Strong Problem Solver",
    desc: "I break down complex challenges into clean, logical solutions that scale.",
  },
  {
    icon: "✨",
    title: "Clean Code",
    desc: "Readable, maintainable, and well-documented code following best practices.",
  },
  {
    icon: "🔗",
    title: "Full-Stack Experience",
    desc: "From database schemas to pixel-perfect UIs — I handle the full spectrum.",
  },
  {
    icon: "⚡",
    title: "Quick Learner",
    desc: "I rapidly adapt to new frameworks, tools, and technologies as needed.",
  },
  {
    icon: "🎯",
    title: "User-First Mindset",
    desc: "Building interfaces that are intuitive, accessible, and performant.",
  },
  {
    icon: "🤝",
    title: "Team Player",
    desc: "Collaborative, communicative, and reliable in both solo and team environments.",
  },
];

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Components ────────────────────────────────────────────────────────────────
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx];
    const timer = setTimeout(
      () => {
        if (!del) {
          setText(word.slice(0, text.length + 1));
          if (text.length + 1 === word.length)
            setTimeout(() => setDel(true), 1200);
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length === 0) {
            setDel(false);
            setIdx((idx + 1) % words.length);
          }
        }
      },
      del ? 55 : 90,
    );
    return () => clearTimeout(timer);
  }, [text, del, idx, words]);
  return (
    <span className="typewriter-text">
      {text}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = () => {
      start += Math.ceil(to / 40);
      if (start >= to) {
        setVal(to);
        return;
      }
      setVal(start);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`fade-up ${inView ? "visible" : "hidden"} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return <div className="section-label">{children}</div>;
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

const handleSend = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setSent(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setSent(false);
      }, 3000);
    } else {
      alert("Error sending message");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  const theme = dark ? "dark" : "light";

  return (
    <div className={theme} style={{ width: "100%", minHeight: "100vh" }}>
      {/* ── NAVBAR ── */}
      <nav
        className={`navbar ${scrolled ? "scrolled" : "transparent"} ${theme}`}
      >
        <div className="nav-container">
          <div className="logo">
            <span className="gradient-text">MH</span>
            <span className="logo-sub subtext">/ dev</span>
          </div>

          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))}
                className="nav-link"
              >
                {l}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button onClick={() => setDark(!dark)} className="theme-toggle">
              {dark ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-primary btn-hire"
            >
              Hire Me ✦
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="menu-button"
            >
              <span className="menu-bar"></span>
              <span className="menu-bar"></span>
              <span className="menu-bar"></span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase().replace(" ", "-"))}
                className="mobile-link"
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => {
                scrollTo("contact");
                setMenuOpen(false);
              }}
              className="btn-primary mobile-hire"
            >
              Hire Me
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="hero mesh dots">
        <div className="hero-orb hero-orb-1 float1"></div>
        <div className="hero-orb hero-orb-2 float2"></div>
        <div className="hero-orb hero-orb-3 float3"></div>

        <div className="hero-container">
          {/* Left */}
          <div>
            <div className="availability-badge">
              <span className="status-dot cyan"></span>
              Available for hire · Islamabad,Rawalpindi, PK
            </div>

            <h1 className="hero-title syne">
              Muhammad
              <br />
              <span className="gradient-text">Haris</span>
            </h1>

            <div className="hero-typewriter syne">
              <Typewriter
                words={[
                  "Software Engineer",
                  "Web Developer",
                  "React Specialist",
                  "Full-Stack Builder",
                ]}
              />
            </div>

            <p className="hero-description subtext dm">
              I build{" "}
              <strong style={{ color: "var(--cyan-400)", fontWeight: 600 }}>
                scalable web applications
              </strong>{" "}
              and modern user interfaces using React and cutting-edge web
              technologies.
            </p>

            <div className="hero-buttons">
              <button
                onClick={() => scrollTo("projects")}
                className="btn-primary"
              >
                View Projects →
              </button>
              <a
                href="/cv/Muhammad_Haris_CV.pdf"
                download="Muhammad_Haris_CV.pdf"
                className="btn-outline"
              >
                Download CV ⬇
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="btn-outline"
              >
                Contact Me
              </button>
            </div>

            <div className="social-links">
              {[
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/muhammad-haris-b18615247/",
                  icon: "💼",
                },
                {
                  label: "GitHub",
                  href: "https://github.com/harismirza14",
                  icon: "🐙",
                },
                {
                  label: "Email",
                  href: "mailto:mirzaharis973@gmail.com",
                  icon: "✉️",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="social-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Profile Card */}
          <div className="profile-card">
            <div style={{ position: "relative" }}>
              <div className="card-3d">
                <span className="avatar float1">👨‍💻</span>
                <div className="card-name">Muhammad Haris</div>
                <div className="card-subtitle subtext">Software Engineer</div>
                <div className="spin-ring-1"></div>
                <div className="spin-ring-2"></div>
              </div>
              <div className="stats-badge bottom">
                <div className="stats-number">
                  <Counter to={10} suffix="+" />
                </div>
                <div className="stats-label subtext">Projects</div>
              </div>
              <div className="stats-badge top">
                <div className="stats-number emerald">
                  <Counter to={1} suffix="+" />
                </div>
                <div className="stats-label subtext">Years Exp</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* ── ABOUT ── */}
      <section id="about" className="mesh2">
        <div className="container">
          <div className="about-grid">
            <FadeUp>
              <SectionLabel>✦ About Me</SectionLabel>
              <h2
                className="section-title syne"
                style={{ marginBottom: "1.5rem" }}
              >
                Passionate about
                <br />
                <span className="gradient-text">crafting digital</span>
                <br />
                experiences
              </h2>
              <div className="about-text dm">
                <p className="subtext">
                  I'm a Computer Science graduate with a deep passion for
                  building real-world web applications that make a difference.
                  My journey in software development has been driven by
                  curiosity and a genuine love for solving complex problems
                  through elegant code.
                </p>
                <p className="subtext">
                  With hands-on experience in{" "}
                  <strong style={{ color: "var(--cyan-400)", fontWeight: 600 }}>
                    React, JavaScript, REST APIs, and SQL Server
                  </strong>
                  , I thrive at the intersection of design and engineering —
                  building full-stack applications that are both technically
                  sound and visually compelling.
                </p>
                <p className="subtext">
                  I believe great software solves real problems. Whether it's a
                  ride-sharing platform or a productivity tool, I approach every
                  project with the same commitment: clean architecture,
                  maintainable code, and a user-first mindset.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="stats-grid">
                {[
                  { val: "React", label: "Primary Stack" },
                  { val: "SQL", label: "Database Exp" },
                  { val: "Full", label: "Stack Dev" },
                  { val: "CS", label: "Graduate" },
                ].map((s, i) => (
                  <div key={i} className="stat-card">
                    <div className="stat-value">{s.val}</div>
                    <div className="stat-label subtext">{s.label}</div>
                  </div>
                ))}
                <div className="focus-card">
                  <div className="focus-title subtext">Focus Areas</div>
                  <div className="focus-tags">
                    {[
                      "React.js",
                      "Node.js",
                      "SQL Server",
                      "REST APIs",
                      "JavaScript",
                      "Tailwind CSS",
                    ].map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* ── SKILLS ── */}
      <section id="skills">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <SectionLabel>⚡ Skills</SectionLabel>
              <h2 className="section-title syne">
                My Tech <span className="gradient-text">Arsenal</span>
              </h2>
              <p className="section-desc subtext dm">
                A curated set of tools and technologies I use to build
                exceptional digital products.
              </p>
            </div>
          </FadeUp>

          <div className="skills-grid">
            {Object.entries(SKILLS).map(([cat, skills], ci) => (
              <FadeUp key={cat} delay={ci * 0.1}>
                <div className={`skill-card ${SKILL_CLASS[cat]}`}>
                  <div
                    className="skill-category syne"
                    style={{ color: SKILL_ACCENT[cat] }}
                  >
                    {cat}
                  </div>
                  <div className="skill-count subtext">
                    {skills.length} technologies
                  </div>
                  <div className="skill-tags">
                    {skills.map((skill) => (
                      <div key={skill} className="skill-tag dm">
                        <span>{SKILL_ICONS[skill]}</span>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* ── PROJECTS ── */}
      <section id="projects" className="mesh">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <SectionLabel>🚀 Projects</SectionLabel>
              <h2 className="section-title syne">
                Featured <span className="gradient-text">Work</span>
              </h2>
              <p className="section-desc subtext dm">
                Real projects solving real problems — built with care, shipped
                with confidence.
              </p>
            </div>
          </FadeUp>

          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.1}>
                <div className="project-card">
                  <div className={`project-header ${p.headerClass}`}>
                    <span
                      className="project-emoji float1"
                      style={{ animationDelay: `${i * 1.5}s` }}
                    >
                      {p.emoji}
                    </span>
                    <div className="project-overlay"></div>
                    <div className="project-tech-badges">
                      {p.tech.slice(0, 2).map((t) => (
                        <span key={t} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="project-content">
                    <h3 className="project-title syne">{p.title}</h3>
                    <p className="project-description subtext dm">{p.desc}</p>
                    <div className="project-tech">
                      {p.tech.map((t) => (
                        <span key={t} className="tech-item dm">
                          {t}
                        </span>
                      ))}
                    </div>
                    {/* <div className="project-links">
                      <a href={p.github} className="project-link" target="_blank" rel="noreferrer">
                        GitHub →
                      </a>
                      <a href={p.demo} className="project-link primary">
                        Live Demo ↗
                      </a>
                    </div> */}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* ── WHY ME ── */}
      <section id="why-me">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <SectionLabel>🎯 Why Hire Me</SectionLabel>
              <h2 className="section-title syne">
                What I Bring to
                <br />
                <span className="gradient-text">Your Team</span>
              </h2>
              <p className="section-desc subtext dm">
                Beyond the code — the qualities that make working with me a
                genuine advantage.
              </p>
            </div>
          </FadeUp>

          <div className="why-grid">
            {WHY_ITEMS.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div className="why-card">
                  <span className="why-icon">{item.icon}</span>
                  <h3 className="why-title syne">{item.title}</h3>
                  <p className="why-desc subtext dm">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* ── EDUCATION ── */}
      <section id="education" className="mesh2">
        <div className="container" style={{ maxWidth: "56rem" }}>
          <FadeUp>
            <div className="section-header">
              <SectionLabel>🎓 Education</SectionLabel>
              <h2 className="section-title syne">
                Academic <span className="gradient-text">Background</span>
              </h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="education-card">
              <div className="education-bg-blur"></div>
              <div className="education-content">
                <div className="education-icon-wrap">🏛️</div>
                <div className="education-body">
                  <div className="education-badge">Bachelor of Science</div>
                  <h3 className="education-title syne">Computer Science</h3>
                  <p className="education-meta subtext">
                    Barani Institute of Information and Technology · 2022 – 2026
                  </p>
                  <p className="education-desc subtext dm">
                    Studied core computer science fundamentals including data
                    structures, algorithms, software engineering, database
                    management, and web development. Developed strong analytical
                    and problem-solving skills through rigorous coursework and
                    real-world projects. Focused on software engineering and
                    modern web technologies throughout the degree.
                  </p>
                  <div className="course-tags">
                    {[
                      "Data Structures",
                      "Algorithms",
                      "Software Engineering",
                      "Database Systems",
                      "Web Development",
                      "OOP",
                      "Networks",
                    ].map((c) => (
                      <span key={c} className="course-tag dm">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="divider"></div>

      {/* ── CONTACT ── */}
      <section id="contact" className="mesh">
        <div className="container" style={{ maxWidth: "72rem" }}>
          <FadeUp>
            <div className="section-header">
              <SectionLabel>📬 Contact</SectionLabel>
              <h2 className="section-title syne">
                Let's Build
                <br />
                <span className="gradient-text">Something Great</span>
              </h2>
              <p className="section-desc subtext dm">
                Whether you have a project in mind, a role to fill, or just want
                to connect — I'm always open to a conversation.
              </p>
            </div>
          </FadeUp>

          <div className="contact-grid">
            <FadeUp>
              <h3 className="contact-subtitle syne">Get in Touch</h3>
              <div className="contact-list">
                {[
                  {
                    icon: "✉️",
                    label: "Email",
                    val: "mirzaharis973@gmail.com",
                    href: "mailto:mirzaharis973@gmail.com",
                  },
                  {
                    icon: "💼",
                    label: "LinkedIn",
                    val: "linkedin.com/in/muhammad-haris",
                    href: "https://www.linkedin.com/in/muhammad-haris-b18615247/",
                  },
                  {
                    icon: "🐙",
                    label: "GitHub",
                    val: "github.com/harismirza14",
                    href: "https://github.com/harismirza14",
                  },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="contact-item"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="contact-icon">{c.icon}</span>
                    <div className="contact-info">
                      <div className="contact-label subtext">{c.label}</div>
                      <div className="contact-value">{c.val}</div>
                    </div>
                    <span className="contact-arrow subtext">↗</span>
                  </a>
                ))}
              </div>

              <div className="availability-banner">
                <div className="availability-header">
                  <span className="status-dot emerald"></span>
                  <span className="availability-status">
                    Available for work
                  </span>
                </div>
                <p className="availability-text subtext dm">
                  Open to full-time roles, internships, and freelance projects.
                  Response within 24 hours.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="contact-form">
                <h3 className="form-title syne">Send a Message</h3>
                <div className="form-group">
                  <label className="form-label subtext">Your Name</label>
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Haris Mirza"
                    className="form-input dm"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label subtext">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="mirzaharis973@gmail.com"
                    className="form-input dm"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label subtext">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project or opportunity..."
                    rows="4"
                    className="form-textarea dm"
                  />
                </div>
                <button
                  onClick={handleSend}
                  className={`form-button dm ${sent ? "disabled" : ""}`}
                >
                  {sent
                    ? "✓ Message Sent! I'll be in touch soon."
                    : "Send Message →"}
                </button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-container">
          <p className="copyright subtext dm">
            © {new Date().getFullYear()}{" "}
            <span className="copyright-name">Muhammad Haris</span>. Crafted with Passion in Islamabad, PK.
          </p>
          <div className="footer-links">
            {[
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/muhammad-haris-b18615247/",
              },
              { label: "GitHub", href: "https://github.com/harismirza14" },
              { label: "Email", href: "mailto:mirzaharis973@gmail.com" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="footer-link"
                target="_blank"
                rel="noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

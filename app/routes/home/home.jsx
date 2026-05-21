import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import profileImg from '~/assets/profile.jpg';
import civicDash from '~/assets/civic-admin-dashboard.png';
import civicLogin from '~/assets/civic-admin-login.png';
import civicFeed from '~/assets/civic-community-feed.png';
import moviesScreen from '~/assets/movieshouse-screenshot.png';
import moviesScreen2 from '~/assets/movieshouse-screenshot2.png';
import parakramShot from '~/assets/parakram-screenshot.png';
import parakramJersey from '~/assets/parakram-jersey.png';
import parakramSports from '~/assets/parakram-sports.png';

export const meta = () => [
  { title: 'Aniket Adhav — Full Stack & Android Developer' },
  {
    name: 'description',
    content:
      'Portfolio of Aniket Adhav — Full Stack Web & Android Developer from Maharashtra, India.',
  },
];

export const links = () => [];

export const handle = { hideNavbar: true };

// ─── Reusable Components ─────────────────────────────────────────

function ContactButton({ href = 'mailto:aniketadhav2006@gmail.com', label = 'Contact Me' }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-block',
        padding: 'clamp(10px,1.2vw,16px) clamp(28px,3.5vw,48px)',
        borderRadius: '9999px',
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181,1,167,0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
        color: 'white',
        fontFamily: "'Kanit', sans-serif",
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        fontSize: 'clamp(0.7rem, 1vw, 1rem)',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
    >
      {label}
    </a>
  );
}

function LiveProjectButton({ href, label = 'Live Project' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        padding: 'clamp(7px,0.9vw,13px) clamp(20px,2vw,36px)',
        borderRadius: '9999px',
        border: '2px solid #D7E2EA',
        color: '#D7E2EA',
        fontFamily: "'Kanit', sans-serif",
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        fontSize: 'clamp(0.65rem, 0.9vw, 0.95rem)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
        background: 'transparent',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e =>
        (e.currentTarget.style.background = 'rgba(215,226,234,0.1)')
      }
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      {label}
    </a>
  );
}

function FadeIn({ children, delay = 0, y = 0, x = 0, duration = 0.7, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function FadeInWhenVisible({
  children,
  delay = 0,
  y = 40,
  x = 0,
  duration = 0.8,
  style = {},
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function MagnetWrapper({ children, strength = 4 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMouseMove = useCallback(
    e => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setPos({ x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength });
    },
    [strength]
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        setActive(false);
        setPos({ x: 0, y: 0 });
      }}
      style={{ display: 'inline-block' }}
    >
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={
          active
            ? { type: 'spring', stiffness: 200, damping: 15 }
            : { type: 'spring', stiffness: 100, damping: 20 }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: '600px',
        background: '#0C0C0C',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'clip',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding:
              'clamp(20px,3vw,32px) clamp(24px,4.5vw,56px)',
          }}
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: '#D7E2EA',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontSize: 'clamp(0.8rem, 1.2vw, 1.4rem)',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.55')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <div style={{ overflow: 'hidden' }}>
        <FadeIn delay={0.15} y={50}>
          <h1
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              width: '100%',
              fontSize: 'clamp(10vw, 17.5vw, 17.5vw)',
              marginTop: 'clamp(-8px, -1vw, 0px)',
              paddingLeft: 'clamp(16px, 3vw, 48px)',
              background:
                'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Hi, I&apos;m Aniket
          </h1>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding:
            'clamp(16px, 2vw, 28px) clamp(24px, 4.5vw, 56px)',
          marginTop: 'auto',
        }}
      >
        <FadeIn delay={0.35} y={20}>
          <p
            style={{
              color: '#D7E2EA',
              fontFamily: "'Kanit', sans-serif",
              fontWeight: 300,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              lineHeight: 1.45,
              fontSize: 'clamp(0.7rem, 1.3vw, 1.4rem)',
              maxWidth: 'clamp(160px, 22vw, 280px)',
            }}
          >
            A full stack web &amp; android developer building fast, scalable apps
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Portrait — centered absolutely */}
      <FadeIn
        delay={0.6}
        y={30}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 0,
          zIndex: 10,
        }}
      >
        <MagnetWrapper strength={4}>
          <img
            src={profileImg}
            alt="Aniket Adhav"
            style={{
              width: 'clamp(200px, 28vw, 420px)',
              display: 'block',
              objectFit: 'cover',
              objectPosition: 'top',
              borderRadius: '24px 24px 0 0',
              filter:
                'drop-shadow(0 -8px 48px rgba(182,0,168,0.3))',
              transition: 'transform 0.3s ease',
            }}
          />
        </MagnetWrapper>
      </FadeIn>
    </section>
  );
}

// ─── Marquee Section ─────────────────────────────────────────────

const GIF_URLS = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const ROW1 = GIF_URLS.slice(0, 11);
const ROW2 = GIF_URLS.slice(11);

function MarqueeSection() {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(200);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const val =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(val);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tripled = arr => [...arr, ...arr, ...arr];

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#0C0C0C',
        paddingTop: 'clamp(64px, 10vw, 160px)',
        paddingBottom: '40px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '12px',
          willChange: 'transform',
          transform: `translateX(${offset - 200}px)`,
        }}
      >
        {tripled(ROW1).map((url, i) => (
          <img
            key={i}
            src={url}
            alt=""
            loading="lazy"
            style={{
              width: '420px',
              height: '270px',
              borderRadius: '16px',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          willChange: 'transform',
          transform: `translateX(${-(offset - 200)}px)`,
        }}
      >
        {tripled(ROW2).map((url, i) => (
          <img
            key={i}
            src={url}
            alt=""
            loading="lazy"
            style={{
              width: '420px',
              height: '270px',
              borderRadius: '16px',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}

// ─── About Section ───────────────────────────────────────────────

const ABOUT_TEXT =
  "With a passion for building fast, scalable web apps and polished Android experiences, I'm a Full Stack Developer from Maharashtra, India — currently pursuing B.E. Computer Engineering with a 9.74 CGPA. I love solving hard problems through competitive programming, leading cross-functional teams, and shipping open-source work. From hackathon victories to 1800+ LeetCode ratings, I'm always pushing the edge. Let's build something incredible together!";

function AnimatedChar({ char, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

function AnimatedAboutText() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.25'],
  });

  const chars = ABOUT_TEXT.split('');

  return (
    <p
      ref={ref}
      style={{
        color: '#D7E2EA',
        fontFamily: "'Kanit', sans-serif",
        fontWeight: 400,
        textAlign: 'center',
        lineHeight: 1.7,
        maxWidth: '600px',
        fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
        margin: '0 auto',
      }}
    >
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = start + 1.5 / chars.length;
        return (
          <AnimatedChar
            key={i}
            char={char}
            progress={scrollYProgress}
            range={[Math.max(0, start - 0.04), Math.min(1, end + 0.04)]}
          />
        );
      })}
    </p>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      style={{
        minHeight: '100svh',
        background: '#0C0C0C',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding:
          'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 60px)',
        fontFamily: "'Kanit', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Decorative corner elements */}
      <FadeInWhenVisible
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        style={{
          position: 'absolute',
          top: '4%',
          left: 'clamp(8px, 4vw, 80px)',
          pointerEvents: 'none',
        }}
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          style={{ width: 'clamp(70px, 11vw, 210px)', opacity: 0.8 }}
        />
      </FadeInWhenVisible>

      <FadeInWhenVisible
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        style={{
          position: 'absolute',
          bottom: '8%',
          left: 'clamp(16px, 10vw, 160px)',
          pointerEvents: 'none',
        }}
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          style={{ width: 'clamp(60px, 9vw, 180px)', opacity: 0.8 }}
        />
      </FadeInWhenVisible>

      <FadeInWhenVisible
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        style={{
          position: 'absolute',
          top: '4%',
          right: 'clamp(8px, 4vw, 80px)',
          pointerEvents: 'none',
        }}
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          style={{ width: 'clamp(70px, 11vw, 210px)', opacity: 0.8 }}
        />
      </FadeInWhenVisible>

      <FadeInWhenVisible
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        style={{
          position: 'absolute',
          bottom: '8%',
          right: 'clamp(16px, 10vw, 160px)',
          pointerEvents: 'none',
        }}
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          style={{ width: 'clamp(80px, 12vw, 220px)', opacity: 0.8 }}
        />
      </FadeInWhenVisible>

      {/* Heading */}
      <FadeInWhenVisible delay={0} y={40}>
        <h2
          style={{
            fontFamily: "'Kanit', sans-serif",
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textAlign: 'center',
            fontSize: 'clamp(3.5rem, 12vw, 160px)',
            background:
              'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 'clamp(40px, 6vw, 80px)',
          }}
        >
          About me
        </h2>
      </FadeInWhenVisible>

      {/* Animated paragraph */}
      <AnimatedAboutText />

      {/* Stats row */}
      <FadeInWhenVisible
        delay={0.15}
        y={30}
        style={{ marginTop: 'clamp(40px, 5vw, 72px)' }}
      >
        <div
          style={{
            display: 'flex',
            gap: 'clamp(24px, 4vw, 80px)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            { num: '9.74', label: 'CGPA' },
            { num: '700+', label: 'DSA Solved' },
            { num: '1800+', label: 'LeetCode Rating' },
            { num: '3', label: 'Projects Shipped' },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: "'Kanit', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 3.5vw, 3.8rem)',
                  background:
                    'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                }}
              >
                {num}
              </div>
              <div
                style={{
                  color: '#D7E2EA',
                  fontFamily: "'Kanit', sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(0.65rem, 0.9vw, 0.95rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginTop: '8px',
                  opacity: 0.65,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </FadeInWhenVisible>

      {/* CTA */}
      <FadeInWhenVisible
        delay={0.25}
        y={20}
        style={{ marginTop: 'clamp(48px, 6vw, 96px)' }}
      >
        <ContactButton />
      </FadeInWhenVisible>
    </section>
  );
}

// ─── Skills Section ───────────────────────────────────────────────

const SKILLS = [
  {
    num: '01',
    name: 'Web Development',
    desc: 'Building fast, scalable full-stack web apps with React, Next.js, Node.js, Express, and modern databases — from concept to production deployment.',
  },
  {
    num: '02',
    name: 'Android Development',
    desc: 'Crafting polished, production-ready Android apps using Kotlin, Jetpack Compose, MVVM architecture, Retrofit, Paging 3, Hilt, and Room DB.',
  },
  {
    num: '03',
    name: 'Backend Engineering',
    desc: 'Designing robust REST APIs and server-side systems with Node.js, Express, Spring Boot, FastAPI, and Hibernate — built for scale and reliability.',
  },
  {
    num: '04',
    name: 'Database Architecture',
    desc: 'Architecting efficient data models across MongoDB, PostgreSQL, MySQL, Firebase, and Room DB — with a focus on performance and consistency.',
  },
  {
    num: '05',
    name: 'Competitive Programming',
    desc: 'Solving complex algorithmic challenges in C++ and Java — 700+ DSA problems solved, 1800+ LeetCode rating, and hackathon victories to prove it.',
  },
];

function SkillsSection() {
  return (
    <section
      id="skills"
      style={{
        background: '#FFFFFF',
        borderRadius:
          'clamp(40px, 5vw, 60px) clamp(40px, 5vw, 60px) 0 0',
        padding:
          'clamp(56px, 8vw, 128px) clamp(24px, 5vw, 56px)',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      <FadeInWhenVisible delay={0} y={40}>
        <h2
          style={{
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textAlign: 'center',
            fontSize: 'clamp(3.5rem, 12vw, 160px)',
            color: '#0C0C0C',
            marginBottom: 'clamp(48px, 6vw, 112px)',
          }}
        >
          Skills
        </h2>
      </FadeInWhenVisible>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {SKILLS.map((skill, i) => (
          <FadeInWhenVisible key={skill.num} delay={i * 0.1} y={30}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'clamp(16px, 3vw, 48px)',
                padding: 'clamp(24px, 4vw, 48px) 0',
                borderTop:
                  i === 0 ? '1px solid rgba(12,12,12,0.15)' : 'none',
                borderBottom: '1px solid rgba(12,12,12,0.15)',
              }}
            >
              <span
                style={{
                  fontWeight: 900,
                  fontSize: 'clamp(2.5rem, 8vw, 9rem)',
                  color: '#0C0C0C',
                  lineHeight: 1,
                  flexShrink: 0,
                  minWidth: 'clamp(60px, 10vw, 140px)',
                }}
              >
                {skill.num}
              </span>
              <div style={{ paddingTop: 'clamp(4px, 0.5vw, 14px)' }}>
                <div
                  style={{
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    fontSize: 'clamp(1rem, 2.2vw, 2.1rem)',
                    color: '#0C0C0C',
                    marginBottom: '10px',
                  }}
                >
                  {skill.name}
                </div>
                <div
                  style={{
                    fontWeight: 300,
                    fontSize: 'clamp(0.8rem, 1.5vw, 1.25rem)',
                    color: '#0C0C0C',
                    opacity: 0.6,
                    lineHeight: 1.65,
                    maxWidth: '560px',
                  }}
                >
                  {skill.desc}
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────

const PROJECTS = [
  {
    num: '01',
    category: 'Full Stack · React · Node.js · MongoDB',
    name: 'Civic Assist Platform',
    live: 'https://civicassist-beta.vercel.app/',
    github: 'https://github.com/aniketadhav/civic-assist',
    col1img1: civicLogin,
    col1img2: civicFeed,
    col2img: civicDash,
  },
  {
    num: '02',
    category: 'Android · Kotlin · Jetpack Compose · MVVM',
    name: 'Movies House App',
    live: null,
    github: 'https://github.com/aniket-adhav/Movies-House-App',
    col1img1: moviesScreen,
    col1img2: moviesScreen2,
    col2img: moviesScreen2,
  },
  {
    num: '03',
    category: 'Full Stack · 1500+ Users · Google OAuth',
    name: 'Parakram Sports Platform',
    live: 'https://www.parakram.site',
    github: 'https://github.com/aniketadhav/parakram',
    col1img1: parakramJersey,
    col1img2: parakramSports,
    col2img: parakramShot,
  },
];

function ProjectCard({ project, index, totalCards, progress }) {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(
    progress,
    [index / totalCards, 1],
    [1, targetScale]
  );

  return (
    <div
      style={{
        position: 'sticky',
        top: `calc(80px + ${index * 28}px)`,
        height: '85svh',
        paddingBottom: '16px',
      }}
    >
      <motion.div
        style={{
          scale,
          height: '100%',
          borderRadius: 'clamp(24px, 4vw, 60px)',
          border: '2px solid rgba(215,226,234,0.5)',
          background: '#111111',
          padding: 'clamp(16px, 2vw, 32px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(10px, 1.5vw, 20px)',
          overflow: 'hidden',
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(8px, 1.5vw, 24px)',
            flexWrap: 'wrap',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 7vw, 9rem)',
              background:
                'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {project.num}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                color: '#D7E2EA',
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(0.6rem, 0.9vw, 0.95rem)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                opacity: 0.65,
                marginBottom: '2px',
              }}
            >
              {project.category}
            </div>
            <div
              style={{
                color: '#D7E2EA',
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1rem, 2.5vw, 2.8rem)',
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {project.name}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              flexShrink: 0,
            }}
          >
            {project.live && (
              <LiveProjectButton href={project.live} label="Live Project" />
            )}
            <LiveProjectButton href={project.github} label="GitHub" />
          </div>
        </div>

        {/* Image grid */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(8px, 1.2vw, 16px)',
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* Left col — 40% */}
          <div
            style={{
              width: '40%',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(8px, 1.2vw, 16px)',
            }}
          >
            <img
              src={project.col1img1}
              alt=""
              style={{
                width: '100%',
                height: 'clamp(100px, 13vw, 210px)',
                objectFit: 'cover',
                borderRadius: 'clamp(14px, 2.5vw, 44px)',
                flexShrink: 0,
              }}
            />
            <img
              src={project.col1img2}
              alt=""
              style={{
                width: '100%',
                flex: 1,
                minHeight: 'clamp(100px, 15vw, 280px)',
                objectFit: 'cover',
                borderRadius: 'clamp(14px, 2.5vw, 44px)',
              }}
            />
          </div>
          {/* Right col — 60% */}
          <div style={{ width: '60%' }}>
            <img
              src={project.col2img}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 'clamp(14px, 2.5vw, 44px)',
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      style={{
        background: '#0C0C0C',
        borderRadius:
          'clamp(40px, 5vw, 60px) clamp(40px, 5vw, 60px) 0 0',
        marginTop: 'clamp(-40px, -3vw, -56px)',
        position: 'relative',
        zIndex: 10,
        padding:
          'clamp(40px, 6vw, 96px) clamp(16px, 3vw, 48px) clamp(56px, 7vw, 120px)',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      <FadeInWhenVisible delay={0} y={40}>
        <h2
          style={{
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textAlign: 'center',
            fontSize: 'clamp(3.5rem, 12vw, 160px)',
            background:
              'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 'clamp(24px, 3vw, 48px)',
          }}
        >
          Projects
        </h2>
      </FadeInWhenVisible>

      <div>
        {PROJECTS.map((project, i) => (
          <div key={project.num} style={{ height: '85svh' }}>
            <ProjectCard
              project={project}
              index={i}
              totalCards={PROJECTS.length}
              progress={scrollYProgress}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Contact / Footer Section ─────────────────────────────────────

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/aniket-adhav' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aniket-adhav-a70182312/',
  },
  { label: 'LeetCode', href: 'https://leetcode.com/u/aniket_adhav/' },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/aniket_adhav_07',
  },
];

const ACHIEVEMENTS = [
  '🥉  National 48-Hr Hackathon — Amity University',
  '🏆  1st Place — Civic Assist (550+ teams)',
  '⭐  SGPA Rank 1 — 10 / 10',
  '📍  Maharashtra, India',
];

function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        background: '#0C0C0C',
        padding:
          'clamp(60px, 8vw, 128px) clamp(24px, 5vw, 64px) clamp(40px, 5vw, 72px)',
        fontFamily: "'Kanit', sans-serif",
        textAlign: 'center',
      }}
    >
      <FadeInWhenVisible delay={0} y={40}>
        <h2
          style={{
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            fontSize: 'clamp(3.5rem, 12vw, 160px)',
            background:
              'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 'clamp(16px, 2vw, 32px)',
          }}
        >
          Let&apos;s Talk
        </h2>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1} y={20}>
        <p
          style={{
            color: '#D7E2EA',
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontSize: 'clamp(0.8rem, 1.4vw, 1.35rem)',
            maxWidth: '500px',
            margin: '0 auto clamp(28px, 3vw, 48px)',
            opacity: 0.75,
            lineHeight: 1.55,
          }}
        >
          Have a project in mind or just want to say hi?
          <br />
          Reach out — I&apos;d love to connect.
        </p>
      </FadeInWhenVisible>

      <FadeInWhenVisible
        delay={0.18}
        y={20}
        style={{ marginBottom: 'clamp(40px, 5vw, 80px)' }}
      >
        <ContactButton
          href="mailto:aniketadhav2006@gmail.com"
          label="Send Me an Email"
        />
      </FadeInWhenVisible>

      {/* Social links */}
      <FadeInWhenVisible delay={0.25} y={20}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(20px, 3vw, 56px)',
            flexWrap: 'wrap',
            marginBottom: 'clamp(40px, 5vw, 72px)',
          }}
        >
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#D7E2EA',
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: 'clamp(0.75rem, 1.1vw, 1.1rem)',
                textDecoration: 'none',
                opacity: 0.65,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e =>
                (e.currentTarget.style.opacity = '0.65')
              }
            >
              {s.label}
            </a>
          ))}
        </div>
      </FadeInWhenVisible>

      {/* Achievements */}
      <FadeInWhenVisible delay={0.3} y={20}>
        <div
          style={{
            borderTop: '1px solid rgba(215,226,234,0.12)',
            paddingTop: 'clamp(24px, 3vw, 48px)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(12px, 2vw, 32px)',
            maxWidth: '760px',
            margin: '0 auto',
          }}
        >
          {ACHIEVEMENTS.map(a => (
            <span
              key={a}
              style={{
                color: '#D7E2EA',
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(0.7rem, 0.95vw, 0.95rem)',
                opacity: 0.55,
                textAlign: 'center',
              }}
            >
              {a}
            </span>
          ))}
        </div>
      </FadeInWhenVisible>

      {/* Footer line */}
      <div
        style={{
          marginTop: 'clamp(48px, 6vw, 96px)',
          borderTop: '1px solid rgba(215,226,234,0.08)',
          paddingTop: 'clamp(20px, 2.5vw, 32px)',
          color: '#D7E2EA',
          fontFamily: "'Kanit', sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(0.65rem, 0.85vw, 0.9rem)',
          opacity: 0.35,
          letterSpacing: '0.06em',
        }}
      >
        © {new Date().getFullYear()} Aniket Adhav &middot; All rights reserved &middot; aniketadhav.dev
      </div>
    </section>
  );
}

// ─── Home (exported) ─────────────────────────────────────────────

export function Home() {
  return (
    <div
      style={{
        background: '#0C0C0C',
        minHeight: '100svh',
        overflowX: 'clip',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}

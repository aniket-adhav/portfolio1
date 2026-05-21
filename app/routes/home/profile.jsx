import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Transition } from '~/components/transition';
import { Fragment, useState, useEffect, useRef } from 'react';
import profileEn from './profile-en.svg';
import styles from './profile.module.css';

/* ─────────────────────────────────────────────
   TYPING CARD
───────────────────────────────────────────── */
const TYPING_LINES = [
  'Building Civic Assist v2 ...',
  'Solving DSA problems ...',
  'Open to collaborations ...',
  'Crafting Android apps ...',
  'Contributing to open source ...',
  'Always learning something new ...',
];

function LiveTypingCard({ visible }) {
  const [displayed, setDisplayed] = useState('');
  const [lineIdx, setLineIdx]     = useState(0);
  const [typing, setTyping]       = useState(true);
  const timeoutRef                = useRef(null);

  useEffect(() => {
    if (!visible) return;
    const target = TYPING_LINES[lineIdx];
    if (typing) {
      if (displayed.length < target.length) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)), 52
        );
      } else {
        timeoutRef.current = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)), 30
        );
      } else {
        setLineIdx(i => (i + 1) % TYPING_LINES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeoutRef.current);
  }, [visible, displayed, typing, lineIdx]);

  return (
    <div className={styles.typingCard} data-visible={visible}>
      <span className={styles.typingPrompt}>~$</span>
      <span className={styles.typingText}>{displayed}</span>
      <span className={styles.typingCursor} aria-hidden="true" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const education = [
  {
    degree: 'B.E. Computer Engineering',
    institute: 'Dr. D. Y. Patil Institute of Technology, Pune',
    period: 'Aug 2023 – June 2027',
    score: '9.74 / 10',
    scoreLabel: 'CGPA',
    icon: '🎓',
  },
  {
    degree: 'HSC — Science (Class XII)',
    institute: 'SGJC Korhale, Shirdi',
    period: '2023',
    score: '84.17%',
    scoreLabel: 'Percentage',
    icon: '📘',
  },
  {
    degree: 'SSC (Class X)',
    institute: 'CSV Kolpewadi',
    period: '2021',
    score: '84.20%',
    scoreLabel: 'Percentage',
    icon: '📗',
  },
];

const achievements = [
  { value: '1800+', label: 'LeetCode Rating',   icon: '⚡' },
  { value: '700+',  label: 'DSA Problems',       icon: '🧠' },
  { value: '290',   label: 'Day Streak',          icon: '🔥' },
  { value: '10/10', label: 'SGPA — Rank 1',       icon: '🏅' },
];

const honours = [
  {
    emoji: '🥉',
    title: '2nd Runner-up',
    desc: 'National 48-Hour Hackathon · Amity University Mumbai',
  },
  {
    emoji: '🥇',
    title: '1st Place',
    desc: 'Civic Assist Platform · 1st among 550+ teams, College Competition',
  },
];

/* ─────────────────────────────────────────────
   PROFILE COMPONENT
───────────────────────────────────────────── */
export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.profileWrapper} ref={nodeRef}>

            {/* ══════════════════════════════
                BLOCK 1 — Intro (2-col)
            ══════════════════════════════ */}
            <div className={styles.introGrid}>

              {/* Left: bio */}
              <div className={styles.introLeft}>
                <div className={styles.tag} aria-hidden>
                  <Divider
                    notchWidth="64px"
                    notchHeight="8px"
                    collapsed={!visible}
                    collapseDelay={1000}
                  />
                  <div className={styles.tagText} data-visible={visible}>
                    About me
                  </div>
                </div>

                <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
                  <DecoderText text="Hi, I'm Aniket" start={visible} delay={500} />
                </Heading>

                <p className={styles.bio} data-visible={visible}>
                  A passionate <strong>Full Stack Web &amp; Android Developer</strong> from
                  Maharashtra, India. I build fast, scalable web apps and polished Android
                  experiences — and I love solving hard problems through competitive
                  programming and open-source work.
                </p>

                <ul className={styles.summaryList} data-visible={visible}>
                  <li>🚀 Currently pursuing B.E. Computer Engineering with <strong>9.74 CGPA</strong></li>
                  <li>💡 Technical Head · led cross-functional teams on full-stack products</li>
                  <li>🏆 Hackathon winner &amp; top DSA performer with <strong>1800+ LeetCode rating</strong></li>
                </ul>

              </div>

              {/* Right: photo */}
              <div className={styles.introRight}>
                <div className={styles.imageWrap} data-visible={visible}>
                  <span className={styles.glowOrb} aria-hidden="true" />
                  <span className={styles.borderRing} aria-hidden="true" />
                  <span className={styles.p1} aria-hidden="true" />
                  <span className={styles.p2} aria-hidden="true" />
                  <span className={styles.p3} aria-hidden="true" />
                  <span className={styles.p4} aria-hidden="true" />
                  <span className={styles.p5} aria-hidden="true" />
                  <div className={styles.photoClip}>
                    <img
                      src="/profile.jpg"
                      alt="Aniket Adhav — Full Stack Web and Android Developer"
                      className={styles.photo}
                    />
                  </div>
                  <span className={styles.shimmer} aria-hidden="true" />
                  <span className={styles.cornerTL} aria-hidden="true" />
                  <span className={styles.cornerTR} aria-hidden="true" />
                  <span className={styles.cornerBL} aria-hidden="true" />
                  <span className={styles.cornerBR} aria-hidden="true" />
                  <svg className={styles.svg} data-visible={visible} viewBox="0 0 80 760">
                    <use href={`${profileEn}#profile-en`} />
                  </svg>
                </div>

                <div className={styles.badge} data-visible={visible}>
                  <span className={styles.badgeName}>Aniket Adhav</span>
                  <span className={styles.badgeDivider} aria-hidden="true" />
                  <span className={styles.badgeRole}>
                    <span className={styles.badgeDot} />
                    Full Stack &amp; Android Dev
                  </span>
                </div>

                <LiveTypingCard visible={visible} />
              </div>
            </div>

            {/* ══════════════════════════════
                BLOCK 2 — Education (full-width)
            ══════════════════════════════ */}
            <div className={styles.fullSection} data-visible={visible}>
              <div className={styles.fullSectionHeader}>
                <span className={styles.fullSectionLine} />
                <span className={styles.fullSectionTitle}>🎓 Education</span>
                <span className={styles.fullSectionLine} />
              </div>

              <div className={styles.eduCardsRow}>
                {education.map((e, i) => (
                  <div key={i} className={styles.eduCardFull} style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
                    <div className={styles.eduCardTop}>
                      <span className={styles.eduCardIcon}>{e.icon}</span>
                      <div className={styles.eduScoreBadge}>
                        <span className={styles.eduScoreValFull}>{e.score}</span>
                        <span className={styles.eduScoreLabelFull}>{e.scoreLabel}</span>
                      </div>
                    </div>
                    <div className={styles.eduCardDegree}>{e.degree}</div>
                    <div className={styles.eduCardInstitute}>{e.institute}</div>
                    <div className={styles.eduCardPeriod}>{e.period}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ══════════════════════════════
                BLOCK 3 — Achievements (full-width)
            ══════════════════════════════ */}
            <div className={styles.fullSection} data-visible={visible}>
              <div className={styles.fullSectionHeader}>
                <span className={styles.fullSectionLine} />
                <span className={styles.fullSectionTitle}>🏆 Achievements</span>
                <span className={styles.fullSectionLine} />
              </div>

              <div className={styles.statsRowFull}>
                {achievements.map((a, i) => (
                  <div key={i} className={styles.statCardFull} style={{ animationDelay: `${0.08 + i * 0.1}s` }}>
                    <span className={styles.statIconFull}>{a.icon}</span>
                    <span className={styles.statValueFull}>{a.value}</span>
                    <span className={styles.statLabelFull}>{a.label}</span>
                  </div>
                ))}
              </div>

              <div className={styles.honourCardsRow}>
                {honours.map((h, i) => (
                  <div key={i} className={styles.honourCardFull}>
                    <span className={styles.honourEmoji}>{h.emoji}</span>
                    <div className={styles.honourCardBody}>
                      <div className={styles.honourCardTitle}>{h.title}</div>
                      <div className={styles.honourCardDesc}>{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </Transition>
    </Section>
  );
};

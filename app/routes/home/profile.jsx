import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import profileEn from './profile-en.svg';
import styles from './profile.module.css';

const education = [
  {
    degree: 'B.E. Computer Engineering',
    institute: 'Dr. D. Y. Patil Institute of Technology, Pune',
    period: 'Aug 2023 – June 2027',
    score: '9.74 / 10',
    scoreLabel: 'CGPA',
  },
  {
    degree: 'HSC – Science',
    institute: 'SGJC Korhale, Shirdi',
    period: '2023',
    score: '84.17%',
    scoreLabel: 'Percentage',
  },
  {
    degree: 'SSC',
    institute: 'CSV Kolpewadi',
    period: '2021',
    score: '84.20%',
    scoreLabel: 'Percentage',
  },
];

const achievements = [
  { value: '1800+', label: 'LeetCode Rating' },
  { value: '650+',  label: 'DSA Problems' },
  { value: '290',   label: 'Day Streak' },
  { value: '10/10', label: 'SGPA — Rank 1' },
];

const honours = [
  '🥉 2nd Runner-up · National 48-Hour Hackathon, Amity University Mumbai',
  '🥇 1st Place among 550+ teams · Civic Assist Platform, College Competition',
];

const ProfileText = ({ visible, titleId }) => (
  <Fragment>

    {/* ── Heading ── */}
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hi, I'm Aniket" start={visible} delay={500} />
    </Heading>

    <p className={styles.bio} data-visible={visible}>
      A passionate <strong>Full Stack Web &amp; Android Developer</strong> from Maharashtra, India.
      I build fast, scalable web apps and polished Android experiences — and I love solving hard
      problems through competitive programming and open-source work.
    </p>

    {/* ── Education ── */}
    <div className={styles.sectionBlock} data-visible={visible}>
      <div className={styles.blockHeader}>
        <span className={styles.blockIcon}>🎓</span>
        <span className={styles.blockTitle}>Education</span>
      </div>

      <div className={styles.eduList}>
        {education.map((e, i) => (
          <div key={i} className={styles.eduCard}>
            <div className={styles.eduLeft}>
              <div className={styles.eduDot} />
              {i < education.length - 1 && <div className={styles.eduLine} />}
            </div>
            <div className={styles.eduRight}>
              <div className={styles.eduDegree}>{e.degree}</div>
              <div className={styles.eduInstitute}>{e.institute}</div>
              <div className={styles.eduMeta}>
                <span className={styles.eduPeriod}>{e.period}</span>
                <span className={styles.eduScore}>
                  <span className={styles.eduScoreVal}>{e.score}</span>
                  <span className={styles.eduScoreLabel}>{e.scoreLabel}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ── Achievement stats ── */}
    <div className={styles.sectionBlock} data-visible={visible}>
      <div className={styles.blockHeader}>
        <span className={styles.blockIcon}>🏆</span>
        <span className={styles.blockTitle}>Achievements</span>
      </div>

      <div className={styles.statsGrid}>
        {achievements.map((a, i) => (
          <div key={i} className={styles.statCard}>
            <span className={styles.statValue}>{a.value}</span>
            <span className={styles.statLabel}>{a.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.honourList}>
        {honours.map((h, i) => (
          <div key={i} className={styles.honourItem}>{h}</div>
        ))}
      </div>
    </div>

    <Button
      secondary
      className={styles.button}
      data-visible={visible}
      href="/contact"
      icon="send"
    >
      Send me a message
    </Button>

  </Fragment>
);

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
          <div className={styles.content} ref={nodeRef}>

            {/* ── Left: text ── */}
            <div className={styles.column}>
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
              <ProfileText visible={visible} titleId={titleId} />
            </div>

            {/* ── Right: photo + name ── */}
            <div className={styles.column}>

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

              {/* Name badge */}
              <div className={styles.badge} data-visible={visible}>
                <span className={styles.badgeName}>Aniket Adhav</span>
                <span className={styles.badgeDivider} aria-hidden="true" />
                <span className={styles.badgeRole}>
                  <span className={styles.badgeDot} />
                  Full Stack &amp; Android Dev
                </span>
              </div>

              {/* Social links */}
              <div className={styles.socialRow} data-visible={visible}>
                <a
                  className={styles.socialLink}
                  href="https://github.com/aniketadhav"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a
                  className={styles.socialLink}
                  href="https://leetcode.com/aniketadhav"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                  </svg>
                  <span>LeetCode</span>
                </a>
                <a
                  className={styles.socialLink}
                  href="https://linkedin.com/in/aniketadhav"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>

              {/* Skill tags */}
              <div className={styles.skillCloud} data-visible={visible}>
                {['React', 'Node.js', 'Kotlin', 'Next.js', 'MongoDB', 'C++', 'Jetpack Compose', 'Express'].map(skill => (
                  <span key={skill} className={styles.skillTag}>{skill}</span>
                ))}
              </div>

            </div>

          </div>
        )}
      </Transition>
    </Section>
  );
};

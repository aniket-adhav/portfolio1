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


            </div>

          </div>
        )}
      </Transition>
    </Section>
  );
};

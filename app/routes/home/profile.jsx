import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import profileEn from './profile-en.svg';
import styles from './profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hi, I'm Aniket" start={visible} delay={500} />
    </Heading>

    <Text className={styles.description} data-visible={visible} size="l" as="p">
      A passionate <strong>Full Stack Web &amp; Android Developer</strong> who loves building
      fast, scalable, and user-friendly applications. I craft everything from responsive
      web apps with React and Node.js to polished native Android experiences with Kotlin
      and Jetpack Compose.
    </Text>

    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I thrive on competitive programming, open-source contributions, and turning
      real-world problems into clean, maintainable code. Always eager to learn,
      collaborate, and ship products that matter.
    </Text>

    <div className={styles.infoGrid} data-visible={visible}>
      <div className={styles.infoCard}>
        <span className={styles.infoIcon}>🎓</span>
        <div>
          <div className={styles.infoLabel}>Education</div>
          <div className={styles.infoValue}>B.Tech Computer Science</div>
        </div>
      </div>
      <div className={styles.infoCard}>
        <span className={styles.infoIcon}>📍</span>
        <div>
          <div className={styles.infoLabel}>Location</div>
          <div className={styles.infoValue}>Maharashtra, India</div>
        </div>
      </div>
      <div className={styles.infoCard}>
        <span className={styles.infoIcon}>💻</span>
        <div>
          <div className={styles.infoLabel}>Focus</div>
          <div className={styles.infoValue}>Web &amp; Android Dev</div>
        </div>
      </div>
      <div className={styles.infoCard}>
        <span className={styles.infoIcon}>🏆</span>
        <div>
          <div className={styles.infoLabel}>LeetCode</div>
          <div className={styles.infoValue}>1800+ Rating</div>
        </div>
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

            {/* ── Right: photo ── */}
            <div className={styles.column}>
              <div className={styles.imageWrap} data-visible={visible}>

                {/* Background glow orb behind photo */}
                <span className={styles.glowOrb} aria-hidden="true" />

                {/* Rotating border ring */}
                <span className={styles.borderRing} aria-hidden="true" />

                {/* Floating particles */}
                <span className={styles.p1} aria-hidden="true" />
                <span className={styles.p2} aria-hidden="true" />
                <span className={styles.p3} aria-hidden="true" />
                <span className={styles.p4} aria-hidden="true" />
                <span className={styles.p5} aria-hidden="true" />

                {/* Photo */}
                <img
                  src="/aniket-photo.png"
                  alt="Aniket Adhav — Full Stack Web and Android Developer"
                  className={styles.photo}
                />

                {/* English vertical text */}
                <svg className={styles.svg} data-visible={visible} viewBox="0 0 136 766">
                  <use href={`${profileEn}#profile-en`} />
                </svg>

                {/* Name badge */}
                <div className={styles.badge} data-visible={visible}>
                  <span className={styles.badgeName}>Aniket Adhav</span>
                  <span className={styles.badgeRole}>Full Stack &amp; Android Dev</span>
                </div>

              </div>
            </div>

          </div>
        )}
      </Transition>
    </Section>
  );
};

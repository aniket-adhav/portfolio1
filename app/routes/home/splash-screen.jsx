import { useEffect, useRef, useState } from 'react';
import styles from './splash-screen.module.css';

const greetings = [
  'Hello',
  'নমস্কার',
  'வணக்கம்',
  'నమస్కారం',
  'ನಮಸ್ಕಾರ',
  'નમસ્તે',
  'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
  'नमस्कार',
  'नमस्ते',
];

const MARQUEE_ITEMS = ['Android Developer', 'Full Stack Developer', 'aniketadhav.dev'];
const REPEAT = 4;

const INTERVAL = 220;
const TOTAL_DURATION = 1500;

function MarqueeRow({ reverse }) {
  const slots = Array.from({ length: REPEAT }, (_, i) =>
    MARQUEE_ITEMS.map((label, j) => ({ label, key: `${i}-${j}` }))
  ).flat();
  return (
    <div className={styles.marqueeRow} aria-hidden>
      <div className={styles.marqueeTrack} data-reverse={reverse || undefined}>
        {slots.map(({ label, key }) => (
          <span key={key} className={styles.marqueeItem}>
            {label}
            <span className={styles.marqueeDot}>·</span>
          </span>
        ))}
        {slots.map(({ label, key }) => (
          <span key={`b${key}`} className={styles.marqueeItem}>
            {label}
            <span className={styles.marqueeDot}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SplashScreen() {
  const [phase, setPhase] = useState('idle');
  const [index, setIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const seen = sessionStorage.getItem('splashShown');

    if (!seen) {
      setPhase('greeting');
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i >= greetings.length) {
          clearInterval(interval);
          setTimeout(() => {
            setLeaving(true);
            setTimeout(() => {
              sessionStorage.setItem('splashShown', '1');
              setPhase('done');
            }, 900);
          }, 350);
        } else {
          setIndex(i);
        }
      }, INTERVAL);
      return () => clearInterval(interval);
    } else {
      const navType = performance.getEntriesByType?.('navigation')[0]?.type;
      if (navType !== 'reload') { setPhase('done'); return; }
      setPhase('loader');
      const start = performance.now();
      const tick = now => {
        const pct = Math.min(100, Math.round(((now - start) / TOTAL_DURATION) * 100));
        setPercent(pct);
        if (pct < 100) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setTimeout(() => {
            setLeaving(true);
            setTimeout(() => setPhase('done'), 700);
          }, 120);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={styles.splash} data-leaving={leaving} suppressHydrationWarning>

      {/* ── Top marquee rows ── */}
      <div className={styles.marqueeGroup} data-pos="top">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>

      {/* ── Centre greeting / percentage ── */}
      <div className={styles.centre} suppressHydrationWarning>
        {phase === 'greeting' && (
          <span className={styles.word} key={index}>
            {greetings[index]}
          </span>
        )}
        {phase === 'loader' && (
          <div className={styles.loaderWrap}>
            <span className={styles.loaderPercent}>{percent}</span>
            <span className={styles.loaderSign}>%</span>
          </div>
        )}
      </div>

      {/* ── Bottom marquee rows ── */}
      <div className={styles.marqueeGroup} data-pos="bottom">
        <MarqueeRow reverse />
        <MarqueeRow />
      </div>

      {/* ── Progress bar (greeting phase only) ── */}
      {phase === 'greeting' && (
        <div className={styles.bar}>
          <div
            className={styles.barFill}
            style={{ width: `${Math.round(((index + 1) / greetings.length) * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}

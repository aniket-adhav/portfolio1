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

const MARQUEE_ITEMS = [
  'AI Engineer',
  'Full Stack Developer',
  'Android Developer',
  'Problem Solver',
];

const INTERVAL = 220;
const TOTAL_DURATION = 1500;

function MarqueeTrack({ reverse }) {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className={styles.marqueeOuter} data-reverse={reverse || undefined}>
      <div className={styles.marqueeTrack}>
        {items.map((item, i) => (
          <span key={i} className={styles.marqueeItem}>
            {item}
            <span className={styles.marqueeDot} aria-hidden>·</span>
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

      {/* ── Top marquee ── */}
      <div className={styles.marqueeTop}>
        <MarqueeTrack />
      </div>

      {/* ── Centre: greeting or percentage ── */}
      <div className={styles.centre}>
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

      {/* ── Bottom marquee (reversed) ── */}
      <div className={styles.marqueeBottom}>
        <MarqueeTrack reverse />
      </div>

      {/* ── Progress bar (greeting only) ── */}
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

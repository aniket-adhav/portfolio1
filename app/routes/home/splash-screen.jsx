import { useEffect, useRef, useState } from 'react';
import styles from './splash-screen.module.css';

const greetings = [
  'Hello',
  'नमस्कार',
  'নমস্কার',
  'வணக்கம்',
  'నమస్కారం',
  'ನಮಸ್ಕಾರ',
  'નમસ્તે',
  'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
  'നമസ്കാരം',
  'नमस्ते',
];

const INTERVAL = 220;
const TOTAL_DURATION = 1500;

export function SplashScreen() {
  // 'idle' on SSR → covers content. Client sets 'greeting', 'loader', or 'done'
  const [phase, setPhase] = useState('idle');
  const [index, setIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const seen = sessionStorage.getItem('splashShown');

    if (!seen) {
      // ── FIRST VISIT: greeting splash ──────────────────────
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
      // ── REFRESH: percentage loader ────────────────────────
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

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={styles.splash} data-leaving={leaving}>
      {phase === 'greeting' && (
        <div className={styles.inner}>
          <span className={styles.word} key={index}>
            {greetings[index]}
          </span>
        </div>
      )}

      {phase === 'loader' && (
        <div className={styles.loaderWrap}>
          <span className={styles.loaderPercent}>{percent}</span>
          <span className={styles.loaderSign}>%</span>
        </div>
      )}

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

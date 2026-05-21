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
const TOTAL_DURATION = greetings.length * INTERVAL;

export function SplashScreen() {
  const [index, setIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem('splashShown')) {
      setDone(true);
      return;
    }

    startTimeRef.current = performance.now();

    const animatePercent = now => {
      const elapsed = now - startTimeRef.current;
      const pct = Math.min(100, Math.round((elapsed / TOTAL_DURATION) * 100));
      setPercent(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(animatePercent);
      }
    };
    rafRef.current = requestAnimationFrame(animatePercent);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= greetings.length) {
        clearInterval(interval);
        setTimeout(() => {
          setLeaving(true);
          setTimeout(() => {
            sessionStorage.setItem('splashShown', '1');
            setDone(true);
          }, 900);
        }, 350);
      } else {
        setIndex(i);
      }
    }, INTERVAL);

    return () => {
      clearInterval(interval);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (done) return null;

  return (
    <div className={styles.splash} data-leaving={leaving}>
      <div className={styles.inner}>
        <span className={styles.word} key={index}>
          {greetings[index]}
        </span>
      </div>

      <div className={styles.bar}>
        <div className={styles.barFill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

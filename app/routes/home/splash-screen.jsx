import { useEffect, useRef, useState } from 'react';
import { useHydrated } from '~/hooks/useHydrated';
import styles from './splash-screen.module.css';

let greetingStarted = false;

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

const INTERVAL = 220;
const TOTAL_DURATION = 1500;

export function SplashScreen() {
  const isHydrated = useHydrated();
  const [phase, setPhase] = useState('idle');
  const [index, setIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const seen = sessionStorage.getItem('splashShown');

    if (!seen && !greetingStarted) {
      greetingStarted = true;
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
    } else if (!seen && greetingStarted) {
      setPhase('done');
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

  if (!isHydrated || phase === 'done') return null;

  return (
    <div className={styles.splash} data-leaving={leaving}>
      <div className={styles.inner}>
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

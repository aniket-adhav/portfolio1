import { useEffect, useRef, useState } from 'react';
import { useHydrated } from '~/hooks/useHydrated';
import config from '~/config.json';
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

const INTERVAL = 240;
const TOTAL_DURATION = 1800;
const PANEL_COUNT = 5;

export function SplashScreen() {
  const isHydrated = useHydrated();
  const [phase, setPhase] = useState('idle');
  const [index, setIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const navType = performance.getEntriesByType?.('navigation')[0]?.type;

    if (navType === 'reload') {
      setPhase('loader');
      const start = performance.now();
      const tick = now => {
        if (cancelled) return;
        const pct = Math.min(100, Math.round(((now - start) / TOTAL_DURATION) * 100));
        setPercent(pct);
        if (pct < 100) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setTimeout(() => {
            if (cancelled) return;
            setLeaving(true);
            setTimeout(() => { if (!cancelled) setPhase('done'); }, 1100);
          }, 200);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    } else {
      setPhase('greeting');
      let i = 0;
      const interval = setInterval(() => {
        if (cancelled) return;
        i++;
        if (i >= greetings.length) {
          clearInterval(interval);
          setTimeout(() => {
            if (cancelled) return;
            setLeaving(true);
            setTimeout(() => { if (!cancelled) setPhase('done'); }, 1100);
          }, 400);
        } else {
          setIndex(i);
        }
      }, INTERVAL);
      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isHydrated || phase === 'idle' || phase === 'done') return null;

  const progress =
    phase === 'greeting'
      ? (index + 1) / greetings.length
      : percent / 100;

  const indexLabel =
    phase === 'greeting'
      ? `${String(index + 1).padStart(2, '0')} — ${String(greetings.length).padStart(2, '0')}`
      : `${percent} %`;

  return (
    <div className={styles.splash} aria-hidden="true">
      {Array.from({ length: PANEL_COUNT }).map((_, i) => (
        <div
          key={i}
          className={styles.panel}
          data-leaving={leaving}
          style={{ '--i': i }}
        />
      ))}

      <div className={styles.center} data-leaving={leaving}>
        {phase === 'greeting' && (
          <div className={styles.clip} key={index}>
            <span className={styles.word}>{greetings[index]}</span>
          </div>
        )}
        {phase === 'loader' && (
          <div className={styles.clip} key="pct">
            <span className={styles.word}>
              {percent}
              <span className={styles.pctSign}>%</span>
            </span>
          </div>
        )}
      </div>

      <div className={styles.footer} data-leaving={leaving}>
        <span className={styles.footerName}>{config.name}</span>
        <span className={styles.footerIndex}>{indexLabel}</span>
      </div>

      <div className={styles.bar}>
        <div
          className={styles.barFill}
          style={{ transform: `scaleX(${progress})` }}
          data-leaving={leaving}
        />
      </div>
    </div>
  );
}

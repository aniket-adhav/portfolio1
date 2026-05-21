import { useEffect, useState } from 'react';
import styles from './splash-screen.module.css';

const greetings = [
  'Hello',
  'नमस्ते',
  'Hola',
  'নমস্কার',
  'வணக்கம்',
  'Bonjour',
  'నమస్కారం',
  'Ciao',
  'नमस्कार',
  'Hallo',
  'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
  'Olá',
  'ನಮಸ್ಕಾರ',
  'Привет',
  'નમસ્તે',
  'നമസ്കാരം',
  'مرحبا',
  'Hello',
];

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setMounted(true);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= greetings.length) {
        clearInterval(interval);
        setTimeout(() => {
          setLeaving(true);
          setTimeout(() => {
            setDone(true);
          }, 900);
        }, 350);
      } else {
        setIndex(i);
      }
    }, 140);

    return () => clearInterval(interval);
  }, []);

  if (!mounted || done) return null;

  return (
    <div className={styles.splash} data-leaving={leaving}>
      <div className={styles.inner}>
        <span className={styles.word} key={index}>
          {greetings[index]}
        </span>
      </div>
      <div className={styles.bar} />
    </div>
  );
}

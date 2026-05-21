import { useEffect, useState } from 'react';
import styles from './splash-screen.module.css';

const greetings = [
  'Hello',
  'Hola',
  'Bonjour',
  'Ciao',
  'Hallo',
  'Olá',
  'Привет',
  'مرحبا',
  'नमस्कार',
  'নমস্কার',
  'ನಮಸ್ಕಾರ',
  'வணக்கம்',
  'నమస్కారం',
  'नमस्ते',
];

export function SplashScreen() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
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
    }, 220);

    return () => clearInterval(interval);
  }, []);

  if (done) return null;

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

import { useEffect, useState } from 'react';

export default function useCountdown(time) {
  const [timer, setTimer] = useState({
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined
  });
  const { days, hours, minutes, seconds } = timer;
  useEffect(() => {
    const interval = setInterval(() => {
      const then = new Date(time);
      const now = new Date();
      const difference = then.getTime() - now.getTime();
      if (difference <= 0) {
        clearInterval(interval);
        setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimer({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return { days, hours, minutes, seconds };
}

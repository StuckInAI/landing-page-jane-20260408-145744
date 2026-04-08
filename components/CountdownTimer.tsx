'use client';

import { useState, useEffect, FormEvent } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const targetDate = new Date('2025-12-31T00:00:00');
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

function pad(num: number): string {
  return String(num).padStart(2, '0');
}

const features = [
  { icon: '\u{1F680}', title: 'Fast Delivery' },
  { icon: '\u{1F381}', title: 'Gift Wrapping' },
  { icon: '\u2B50', title: 'Top Quality' },
  { icon: '\u{1F6E1}\uFE0F', title: 'Safe & Secure' },
];

const stars = [
  { size: 16, top: '8%', left: '15%', delay: '0s' },
  { size: 12, top: '12%', left: '80%', delay: '0.5s' },
  { size: 20, top: '35%', left: '90%', delay: '1s' },
  { size: 14, top: '60%', left: '5%', delay: '1.5s' },
  { size: 18, top: '80%', left: '85%', delay: '2s' },
  { size: 10, top: '45%', left: '50%', delay: '0.8s' },
  { size: 22, top: '90%', left: '30%', delay: '1.2s' },
  { size: 12, top: '25%', left: '40%', delay: '2.5s' },
];

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLaunched, setIsLaunched] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initial = calculateTimeLeft();
    setTimeLeft(initial);
    if (initial.days === 0 && initial.hours === 0 && initial.minutes === 0 && initial.seconds === 0) {
      setIsLaunched(true);
    }

    const timer = setInterval(() => {
      const tl = calculateTimeLeft();
      setTimeLeft(tl);
      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        setIsLaunched(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  }

  return (
    <>
      {/* Floating shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="shape shape-4" />
        <div className="shape shape-5" />
        <div className="shape shape-6" />
      </div>

      {/* Stars */}
      <div className="stars">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: star.size,
              height: star.size,
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="page-wrapper">
        <div className="content">
          {/* Logo */}
          <div className="logo-area">
            <span className="logo-icon">&#x1F9F8;</span>
          </div>

          {/* Headings */}
          <h1 className="shop-name">Toy Wonderland</h1>
          <p className="coming-soon-text">&#x2728; Coming Soon &#x2728;</p>
          <p className="tagline">Where imagination comes to life &mdash; a magical world of toys for every child!</p>

          {/* Countdown */}
          <div className="countdown-container">
            <p className="countdown-label-top">&#x1F389; We launch in...</p>

            {!mounted ? (
              <div className="countdown-grid">
                {['Days', 'Hours', 'Mins', 'Secs'].map((unit) => (
                  <div className="countdown-item" key={unit}>
                    <div className="countdown-box">00</div>
                    <span className="countdown-unit">{unit}</span>
                  </div>
                ))}
              </div>
            ) : isLaunched ? (
              <div className="launched-message">&#x1F38A; We Are LIVE! Welcome to Toy Wonderland! &#x1F38A;</div>
            ) : (
              <div className="countdown-grid">
                <div className="countdown-item">
                  <div className="countdown-box">{pad(timeLeft.days)}</div>
                  <span className="countdown-unit">Days</span>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                  <div className="countdown-box">{pad(timeLeft.hours)}</div>
                  <span className="countdown-unit">Hours</span>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                  <div className="countdown-box">{pad(timeLeft.minutes)}</div>
                  <span className="countdown-unit">Mins</span>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                  <div className="countdown-box">{pad(timeLeft.seconds)}</div>
                  <span className="countdown-unit">Secs</span>
                </div>
              </div>
            )}

            <p className="launch-date">
              Official Launch: <span>31st December 2025</span> &#x1F680;
            </p>
          </div>

          {/* Features */}
          <div className="features">
            {features.map((f) => (
              <div className="feature-card" key={f.title}>
                <span className="feature-icon">{f.icon}</span>
                <p className="feature-title">{f.title}</p>
              </div>
            ))}
          </div>

          {/* Notify section */}
          <div className="notify-section">
            <p className="notify-title">&#x1F514; Get notified when we launch!</p>
            {!submitted ? (
              <form className="notify-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="notify-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="notify-btn">
                  Notify Me!
                </button>
              </form>
            ) : (
              <p className="success-msg">&#x1F389; Woohoo! You&apos;re on the list! We&apos;ll notify you soon!</p>
            )}
          </div>

          {/* Social */}
          <div className="social-links">
            <button className="social-link" title="Facebook" aria-label="Facebook">&#x1F4D8;</button>
            <button className="social-link" title="Instagram" aria-label="Instagram">&#x1F4F8;</button>
            <button className="social-link" title="Twitter" aria-label="Twitter">&#x1F426;</button>
            <button className="social-link" title="Pinterest" aria-label="Pinterest">&#x1F4CC;</button>
          </div>

          {/* Footer */}
          <p className="footer">
            Made with <span>&#x2665;</span> for little ones &mdash; &copy; {new Date().getFullYear()} Toy Wonderland
          </p>
        </div>
      </div>
    </>
  );
}

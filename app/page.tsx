"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const WEDDING_DATE = new Date("2026-09-13T08:35:00+05:30");
const MUSIC_AVAILABLE = true;

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(): Countdown {
  const distance = Math.max(0, WEDDING_DATE.getTime() - Date.now());

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  useEffect(() => {
  if (!opened) return;

  const elements = document.querySelectorAll<HTMLElement>(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  elements.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}, [opened]);

  useEffect(() => {
    setCountdown(getCountdown());
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const countdownItems = useMemo(
    () => [
      ["Days", countdown.days],
      ["Hours", countdown.hours],
      ["Minutes", countdown.minutes],
      ["Seconds", countdown.seconds],
    ],
    [countdown],
  );

  async function playMusic() {
    if (!MUSIC_AVAILABLE || !audioRef.current) return;

    try {
      await audioRef.current.play();
      setMusicPlaying(true);
    } catch {
      setMusicPlaying(false);
    }
  }

  function openInvitation() {
    setOpening(true);
    void playMusic();
    window.setTimeout(() => setOpened(true), 700);
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await playMusic();
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  }

  function shareInvitation() {
    const url = window.location.href;
    const message = encodeURIComponent(
      `You are warmly invited to the wedding of Sreekkuttan & Athira on 13 September 2026. ${url}`,
    );
    window.open(`https://wa.me/?text=${message}`, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      {!opened && (
        <section
          className={`welcome-screen ${opening ? "welcome-screen--opening" : ""}`}
          aria-label="Open wedding invitation"
        >
          <div className="welcome-cover">
            <Image
              src="/wedding-cover.jpeg"
              alt="Wedding invitation cover for Sreekkuttan and Athira"
              width={1132}
              height={1600}
              className="welcome-cover-image"
              priority
              unoptimized
            />
            <div className="welcome-cover-actions">
              <button
                type="button"
                className="open-button"
                onClick={openInvitation}
                disabled={opening}
              >
                <span aria-hidden="true">❦</span>
                {opening ? "Opening…" : "Open invitation"}
              </button>
            </div>
          </div>
        </section>
      )}

      {MUSIC_AVAILABLE && (
        <audio ref={audioRef} src="/Sita-Kalyanam.mp3" loop preload="auto" />
      )}

      <main className={`site-shell ${opened ? "site-shell--visible" : ""}`}>
        <section className="hero" id="home">
          <div className="hero-frame">
            <div className="temple-stripe" aria-hidden="true" />
            <p className="malayalam-mark hero-mark" aria-hidden="true">
              ശ്രീ
            </p>
            <p className="eyebrow">Together with their families</p>
            <p className="hero-intro">
              We cordially invite your esteemed presence with family for the
              wedding of our beloved son
            </p>
            <div className="hero-names" aria-label="Sreekkuttan and Athira">
              <span>Sreekkuttan</span>
              <em>&amp;</em>
              <span>Athira</span>
            </div>
            <div className="hero-divider" aria-hidden="true">
              <span />
              <b>❦</b>
              <span />
            </div>
            <p className="hero-date">Sunday, 13 September 2026</p>
            <p className="hero-venue">Guruvayur Sreekrishna Temple</p>
            <a className="primary-link" href="#celebration">
              View wedding details
            </a>
          </div>
        </section>

        <section className="countdown-section reveal" aria-labelledby="countdown-title">
          <p className="eyebrow">Counting every beautiful moment</p>
          <h2 id="countdown-title">Until we say “I do”</h2>
          <div className="countdown-grid">
            {countdownItems.map(([label, value]) => (
              <div className="countdown-item" key={label}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="family-section reveal" aria-labelledby="couple-title">
          <div className="section-heading">
            <p className="eyebrow">Two families, one celebration</p>
            <h2 id="couple-title">The happy couple</h2>
          </div>
          <div className="couple-grid">
            <article className="person-card">
              <div className="monogram" aria-hidden="true">
                S
              </div>
              <p className="role">The groom</p>
              <h3>Sreekkuttan</h3>
              <p>S/O of Late Sreedharan &amp; Mrs. Leena Sreedharan</p>
              <address>
                Moorkathukulangara House, P.O. Chentrappinni,
                <br />
                Thrissur, Kerala 680 687
              </address>
            </article>
            <div className="union-mark" aria-hidden="true">
              <span />
              <b>&amp;</b>
              <span />
            </div>
            <article className="person-card">
              <div className="monogram" aria-hidden="true">
                A
              </div>
              <p className="role">The bride</p>
              <h3>Athira</h3>
              <p>D/O of Mr. Unnikrishnan &amp; Mrs. Sheeja Unnikrishnan</p>
              <address>
                Ayinikkal House, Karayamvattam P.O.,
                <br />
                Thrissur, Kerala 680 567
              </address>
            </article>
          </div>
        </section>

        <section className="celebration-section reveal" id="celebration" aria-labelledby="celebration-title">
          <div className="section-heading section-heading--light">
            <p className="eyebrow">Save the date</p>
            <h2 id="celebration-title">Wedding celebrations</h2>
          </div>
          <div className="event-grid">
            <article className="event-card event-card--featured">
              <span className="event-number">01</span>
              <p className="event-kicker">Muhurtham</p>
              <h3>Wedding Ceremony</h3>
              <p className="event-time">8:35 AM – 9:50 AM</p>
              <p>Sunday, 13 September 2026</p>
              <p>Guruvayur Sreekrishna Temple</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Guruvayur+Sreekrishna+Temple"
                target="_blank"
                rel="noreferrer"
              >
                Open temple in Maps ↗
              </a>
            </article>
            <article className="event-card">
              <span className="event-number">02</span>
              <p className="event-kicker">Following the ceremony</p>
              <h3>Wedding Lunch</h3>
              <p className="event-time">With love and celebration</p>
              <p>Grand Auditorium</p>
              <p>Kaipamangalam, Thrissur</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Grand+Auditorium+Kaipamangalam+Thrissur"
                target="_blank"
                rel="noreferrer"
              >
                Open auditorium in Maps ↗
              </a>
            </article>
          </div>
        </section>

        <section className="blessing-section reveal" aria-labelledby="blessing-title">
          <div className="blessing-ornament" aria-hidden="true">
            ❦
          </div>
          <p className="eyebrow">Your blessings mean the world</p>
          <h2 id="blessing-title">Come celebrate with us</h2>
          <blockquote>
            “As our families come together in celebration, your presence and
            blessings will make this special day truly complete.”
          </blockquote>
          <button type="button" className="share-button" onClick={shareInvitation}>
            Share on WhatsApp
          </button>
        </section>

        <section className="card-section" aria-labelledby="card-title">
          <div className="section-heading">
            <p className="eyebrow">With best compliments from dear and near</p>
            <h2 id="card-title">The wedding invitation</h2>
          </div>
          <div className="invitation-image-wrap">
            <Image
              src="/invitation-card.jpeg"
              alt="Wedding invitation card for Sreekkuttan and Athira"
              width={1132}
              height={1600}
              sizes="(max-width: 720px) 92vw, 680px"
              loading="eager"
              unoptimized
            />
          </div>
        </section>

        <footer>
          <p className="footer-names">Sreekkuttan <span>&amp;</span> Athira</p>
          <p>13 · 09 · 2026</p>
          <p>We look forward to celebrating with you.</p>
        </footer>

        {MUSIC_AVAILABLE && opened && (
          <button
            type="button"
            className="music-toggle"
            onClick={toggleMusic}
            aria-label={musicPlaying ? "Pause background music" : "Play background music"}
          >
            <span aria-hidden="true">{musicPlaying ? "Ⅱ" : "♪"}</span>
            {musicPlaying ? "Pause music" : "Play music"}
          </button>
        )}
      </main>
    </>
  );
}

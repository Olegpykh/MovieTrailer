import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const CURRENT_YEAR = new Date().getFullYear();

const exploreLinks = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/series', label: 'TV Shows' },
  { to: '/discover', label: 'Discover' },
  { to: '/trending', label: 'Trending' },
  { to: '/favorites', label: 'Watchlist' },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 dark:border-ivory/10">
      <div className="grid gap-10 px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold tracking-wide text-ink dark:text-ivory">
            Stream
            <span className="text-champagne-dim dark:text-champagne">
              Verse
            </span>
          </p>
          <p className="max-w-xs mt-3 text-sm leading-relaxed text-ink/60 dark:text-ivory/60">
            A movie &amp; TV explorer built as a portfolio project — trailers,
            cast, similar titles, and a personal watchlist, powered by the TMDB
            API.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted">
            Explore
          </p>
          <ul className="grid grid-cols-2 mt-4 gap-x-4 gap-y-2.5">
            {exploreLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm transition-colors text-ink/70 dark:text-ivory/70 hover:text-champagne-dim dark:hover:text-champagne"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted">
            Connect
          </p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href="https://github.com/Olegpykh/MovieTrailer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm transition-colors text-ink/70 dark:text-ivory/70 hover:text-champagne-dim dark:hover:text-champagne"
              >
                <FaGithub className="w-4 h-4" />
                Source on GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/oleg-pykhonin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm transition-colors text-ink/70 dark:text-ivory/70 hover:text-champagne-dim dark:hover:text-champagne"
              >
                <FaLinkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:opykhonin@gmail.com"
                className="inline-flex items-center gap-2 text-sm transition-colors text-ink/70 dark:text-ivory/70 hover:text-champagne-dim dark:hover:text-champagne"
              >
                <FaEnvelope className="w-4 h-4" />
                opykhonin@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/10 dark:border-ivory/10">
        <div className="flex flex-col items-center justify-between gap-3 px-4 py-6 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 sm:flex-row sm:text-left">
          <p className="text-xs text-muted">
            © {CURRENT_YEAR} Oleg Pykhonin. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Built with React, TypeScript &amp; the TMDB API
          </p>
        </div>
      </div>
    </footer>
  );
}

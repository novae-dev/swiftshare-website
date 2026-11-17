import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="SwiftShare home">
      <svg width="32" height="32" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1740C9" />
            <stop offset="1" stopColor="#19B8E6" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#lg)" />
        <path d="M18 24h22l-6-6m6 6-6 6M46 40H24l6 6m-6-6 6-6" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>SwiftShare</span>
    </Link>
  );
}

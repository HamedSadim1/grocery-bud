import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';
import type { ThemePreference } from '../types';

interface HeaderProps {
  preference: ThemePreference;
  setPreference: (p: ThemePreference) => void;
  remaining: number;
  total: number;
}

const Header = ({
  preference,
  setPreference,
  remaining,
  total,
}: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-row">
        <h1 className="title-main">
          <span className="title-emoji" aria-hidden="true">
            🛒
          </span>
          Groceries
        </h1>
        <div
          className="theme-toggle"
          role="radiogroup"
          aria-label="Theme preference"
        >
          <button
            type="button"
            className={`theme-btn ${preference === 'light' ? 'active' : ''}`}
            aria-pressed={preference === 'light'}
            aria-label="Light theme"
            onClick={() => setPreference('light')}
          >
            <FaSun />
          </button>
          <button
            type="button"
            className={`theme-btn ${preference === 'system' ? 'active' : ''}`}
            aria-pressed={preference === 'system'}
            aria-label="System theme"
            onClick={() => setPreference('system')}
          >
            <FaDesktop />
          </button>
          <button
            type="button"
            className={`theme-btn ${preference === 'dark' ? 'active' : ''}`}
            aria-pressed={preference === 'dark'}
            aria-label="Dark theme"
            onClick={() => setPreference('dark')}
          >
            <FaMoon />
          </button>
        </div>
      </div>

      {total > 0 && (
        <div className="stats" aria-live="polite">
          <span className="stats-pill">
            {remaining} {remaining === 1 ? 'item' : 'items'} left
          </span>
          <span className="stats-divider">·</span>
          <span className="stats-total">{total} total</span>
        </div>
      )}
    </header>
  );
};

export default Header;

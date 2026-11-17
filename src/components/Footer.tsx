import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-row">
        <div>
          <Logo />
          <p className="copy">© {new Date().getFullYear()} SwiftShare. All rights reserved.</p>
        </div>
        <nav aria-label="Footer">
          <Link to="/#download">Download</Link>
          <Link to="/#features">Features</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
        </nav>
      </div>
    </footer>
  );
}

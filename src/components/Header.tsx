import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/#features", label: "Features" },
  { to: "/#download", label: "Download" },
  { to: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="header">
      <div className="wrap header-row">
        <Logo />
        <nav id="nav" className={`nav ${open ? "open" : ""}`} aria-label="Main">
          {links.map((l) => (
            <Link key={l.label} to={l.to} onClick={close}>
              {l.label}
            </Link>
          ))}
          <Link to="/#download" className="btn btn-primary nav-cta" onClick={close}>
            Download
          </Link>
        </nav>
        <button className="menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

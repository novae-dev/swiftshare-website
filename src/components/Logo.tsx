import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="SwiftShare home">
      <img
        src="/swiftshare-logo.png"
        alt=""
        width="36"
        height="36"
        style={{ objectFit: "contain" }}
      />
      <span>SwiftShare</span>
    </Link>
  );
}

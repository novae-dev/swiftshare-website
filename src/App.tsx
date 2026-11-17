import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ReleaseProvider } from "./release";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Privacy, Terms } from "./pages/Legal";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // wait a tick so the target section has rendered
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 0);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <ReleaseProvider>
      <ScrollManager />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </ReleaseProvider>
  );
}

import Hero from "../components/Hero";
import Features from "../components/Features";
import Download from "../components/Download";
import Install from "../components/Install";
import Security from "../components/Security";
import Faq from "../components/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Download />
      <Install />
      <Security />
      <Faq />
    </>
  );
}

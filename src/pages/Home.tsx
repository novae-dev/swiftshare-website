import Hero from "../components/Hero";
import Screenshots from "../components/Screenshots";
import Features from "../components/Features";
import DownloadStats from "../components/DownloadStats";
import Download from "../components/Download";
import Install from "../components/Install";
import Security from "../components/Security";
import Faq from "../components/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Screenshots />
      <Features />
      <DownloadStats />
      <Download />
      <Install />
      <Security />
      <Faq />
    </>
  );
}

import LimitypeHero from "./components/LimitypeHero";
import TabSection from "./components/TabSection";
import BioSection from "./components/BioSection";

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <LimitypeHero />

      <div className="relative w-full px-4 py-8 sm:px-6 sm:py-12 md:py-24 flex justify-center bg-bg">
        <div className="w-full max-w-2xl flex flex-col gap-8 sm:gap-10 relative z-10">
          <BioSection />

          <TabSection />

          <section className="flex flex-col pt-4 border-t border-border">
            <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium sm:gap-6">
              <a href="https://github.com/natnaelesk" target="_blank" rel="noopener noreferrer" className="hover:text-fg text-muted transition-colors">
                GitHub ↗
              </a>
              <a href="https://www.linkedin.com/in/natnaelesk" target="_blank" rel="noopener noreferrer" className="hover:text-fg text-muted transition-colors">
                LinkedIn ↗
              </a>
              <a href="mailto:natnaelesk@gmail.com" className="hover:text-fg text-muted transition-colors">
                Email ↗
              </a>
              <a href="https://t.me/natnael_esk" target="_blank" rel="noopener noreferrer" className="hover:text-fg text-muted transition-colors">
                Telegram ↗
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

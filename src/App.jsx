import TabSection from "./components/TabSection";
import BioSection from "./components/BioSection";

const ASCII_NAME = `
███╗   ██╗ █████╗ ████████╗███╗   ██╗███████╗██╗     
████╗  ██║██╔══██╗╚══██╔══╝████╗  ██║██╔════╝██║     
██╔██╗ ██║███████║   ██║   ██╔██╗ ██║█████╗  ██║     
██║╚██╗██║██╔══██║   ██║   ██║╚██╗██║██╔══╝  ██║     
██║ ╚████║██║  ██║   ██║   ██║ ╚████║███████╗███████╗
╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═══╝╚══════╝╚══════╝
                                                     
███████╗███████╗██╗  ██╗                             
██╔════╝██╔════╝██║ ██╔╝                             
█████╗  ███████╗█████╔╝                              
██╔══╝  ╚════██║██╔═██╗                              
███████╗███████║██║  ██╗                             
╚══════╝╚══════╝╚═╝  ╚═╝                             
`;

export default function App() {
  return (
    <div className="relative min-h-screen w-full px-4 py-8 sm:px-6 sm:py-12 md:py-24 flex justify-center overflow-hidden">
      {/* Background Flares */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] h-[400px] w-[400px] rounded-full bg-accent opacity-0 mix-blend-screen blur-[120px] animate-flare-1" />
        <div className="absolute bottom-[20%] right-[10%] h-[300px] w-[300px] rounded-full bg-accent opacity-0 mix-blend-screen blur-[100px] animate-flare-2" />
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-8 sm:gap-10 relative z-10">
        <header className="relative flex flex-col gap-4 sm:gap-6">
          <pre className="font-mono text-[9px] sm:text-xs md:text-sm leading-none text-fg overflow-x-auto overflow-y-hidden whitespace-pre selection:bg-fg selection:text-bg max-w-full">
            {ASCII_NAME.replace(/^\n/, "")}
          </pre>
          <div className="font-mono text-[11px] sm:text-xs text-muted flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1 mt-1 sm:mt-2">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Welcome
            </span>
            <span className="hidden sm:inline">|</span>
            <span>Full-stack developer</span>
            <span className="hidden sm:inline">|</span>
            <span>AI Engineer</span>
            <span className="hidden sm:inline">|</span>
            <span>based in Ethiopia</span>
          </div>
        </header>

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
  );
}

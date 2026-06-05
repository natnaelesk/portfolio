import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import content from "../data/content.json";

const PAGE_SIZE = content.pagination?.pageSize ?? 3;
const PROJECTS_VISIBLE = PAGE_SIZE;
const TABS = content.tabsOrder ?? ["Projects", "Education", "Work"];

function getTotalPages(items) {
  return Math.max(1, Math.ceil((items?.length ?? 0) / PAGE_SIZE));
}

function paginate(items, page) {
  const safeItems = items ?? [];
  const start = (page - 1) * PAGE_SIZE;
  return safeItems.slice(start, start + PAGE_SIZE);
}

const navIconClass = "block h-4 w-4";

function NavButtons({ onPrev, onNext, canPrev, canNext }) {
  return (
    <div className="mt-2 flex items-center justify-end gap-3 text-muted">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous"
        className="border-0 bg-transparent p-1 leading-none transition hover:text-fg disabled:cursor-not-allowed disabled:opacity-25"
      >
        <svg className={navIconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next"
        className="border-0 bg-transparent p-1 leading-none transition hover:text-fg disabled:cursor-not-allowed disabled:opacity-25"
      >
        <svg className={navIconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

function Pagination({ page, totalPages, onPrev, onNext }) {
  if (totalPages <= 1) return null;
  return (
    <NavButtons
      onPrev={onPrev}
      onNext={onNext}
      canPrev={page > 1}
      canNext={page < totalPages}
    />
  );
}

// ---- Project Modal ----
function ProjectModal({ project, onClose, onPrev, onNext, canPrev, canNext }) {
  useEffect(() => {
    const handleEsc = (e) => { 
      if (e.key === "Escape") onClose(); 
      if (e.key === "ArrowLeft" && canPrev) onPrev();
      if (e.key === "ArrowRight" && canNext) onNext();
    };
    window.addEventListener("keydown", handleEsc);
    if (project) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [project, onClose, onPrev, onNext, canPrev, canNext]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in" onClick={onClose} />
      
      {/* Prev Button (Outside) */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        disabled={!canPrev}
        className="absolute left-2 sm:left-4 md:left-8 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black hover:scale-110 disabled:opacity-0 disabled:pointer-events-none"
      >
        <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Main Modal Box - Constant size, side-by-side */}
      <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-border/50 bg-bg shadow-2xl animate-scale-up sm:flex-row">
        
        {/* Left side: Media (Strict 16:9) */}
        <div className="relative flex aspect-video w-full shrink-0 items-center justify-center bg-[#050505] sm:w-[60%] lg:w-[65%] border-b sm:border-b-0 sm:border-r border-border/50">
          {project.video ? (
            <video 
              src={project.video} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <div className="flex items-center justify-center font-mono text-xs uppercase tracking-widest text-muted/30">
              No media available
            </div>
          )}
        </div>

        {/* Right side: Content */}
        <div className="flex w-full flex-col p-6 overflow-y-auto sm:absolute sm:inset-y-0 sm:right-0 sm:w-[40%] lg:w-[35%] sm:p-8">
          <div className="flex items-start justify-between mb-4 gap-4">
            <h2 className="text-xl font-semibold text-fg leading-tight">{project.name}</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-muted transition-colors hover:bg-border/50 hover:text-fg -mt-1 -mr-2 shrink-0"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 pb-6">
            <p className="text-sm leading-relaxed text-muted">
              {project.desc}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-border/30 shrink-0">
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full gap-2 rounded bg-accent py-2.5 px-4 text-sm font-bold text-bg shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all hover:opacity-90 hover:scale-[1.02]"
              >
                Visit Live Link
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full gap-2 rounded border border-border/50 bg-transparent py-2.5 px-4 text-sm font-medium text-fg transition-colors hover:bg-border/30"
              >
                View Code on GitHub
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Next Button (Outside) */}
      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={!canNext}
        className="absolute right-2 sm:right-4 md:right-8 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black hover:scale-110 disabled:opacity-0 disabled:pointer-events-none"
      >
        <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
// -----------------------

function ProjectGridCard({ row, descriptionKey, isLast, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`group flex w-full sm:w-1/2 shrink-0 flex-col transition-all duration-300 hover:bg-border/10 cursor-pointer snap-start ${
        isLast ? "" : "sm:border-r border-border/30"
      }`}
    >
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-border/20">
        {row.image ? (
          <img
            src={row.image}
            alt={row.name}
            className="h-full w-full object-contain grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-widest text-muted/30">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-fg group-hover:text-white transition-colors">{row.name}</p>
          {row[descriptionKey] ? (
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted transition-colors group-hover:text-muted/90">{row[descriptionKey]}</p>
          ) : null}
        </div>
        <div className="mt-auto shrink-0 pt-3 flex items-center justify-between text-muted group-hover:text-accent transition-colors">
          <span className="text-[11px] font-mono uppercase tracking-wider">Expand</span>
          <svg className="h-4 w-4 transform transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ProjectGridCarousel({ rows, descriptionKey = "desc", onProjectClick }) {
  const scrollRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(rows.length > PROJECTS_VISIBLE);

  const updateButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 1);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [rows, updateButtons]);

  const scrollByStep = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth / (window.innerWidth < 640 ? 1 : 2);
    el.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto border border-border/30 scrollbar-hide snap-x snap-mandatory rounded-xl touch-pan-x"
      >
        {rows.map((row, index) => (
          <ProjectGridCard
            key={row.id ?? row.name}
            row={row}
            descriptionKey={descriptionKey}
            isLast={index === rows.length - 1}
            onClick={() => onProjectClick(row)}
          />
        ))}
      </div>

      {rows.length > 2 ? (
        <NavButtons
          onPrev={() => scrollByStep(-1)}
          onNext={() => scrollByStep(1)}
          canPrev={canPrev}
          canNext={canNext}
        />
      ) : null}
    </div>
  );
}

function DataTable({ rows, page, setPage, descriptionKey = "desc", viewMode = "list", onProjectClick, renderRight }) {
  const totalPages = getTotalPages(rows);
  const visibleRows = useMemo(() => paginate(rows, page), [rows, page]);

  return (
    <div>
      <div className="flex flex-col">
        {visibleRows.map((row) => (
          <div
            key={row.id ?? row.name}
            onClick={onProjectClick ? () => onProjectClick(row) : undefined}
            className={`group transition-colors hover:bg-border/20 border-b border-border/30 py-4 ${
              onProjectClick ? "cursor-pointer" : ""
            }`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-fg group-hover:text-white transition-colors">{row.name}</p>
                {row[descriptionKey] ? (
                  <p className="mt-1 text-sm leading-relaxed text-muted">{row[descriptionKey]}</p>
                ) : null}
              </div>
              <div className="shrink-0 sm:pt-0.5 sm:text-right">
                {onProjectClick ? (
                  <div className="flex items-center gap-1 text-[11px] font-mono text-muted uppercase tracking-wider mt-2 sm:mt-0 group-hover:text-accent transition-colors">
                    Expand
                    <svg className="h-3 w-3 transform transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                ) : (
                  renderRight?.(row)
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
      />
    </div>
  );
}

function SubTabs({ tabs, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-4 border-b border-border/50 pb-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`text-xs font-medium transition-colors pb-1 -mb-[5px] ${
            active === tab ? "text-fg border-b border-fg" : "text-muted hover:text-fg/80"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function EducationPanel() {
  const education = content.education;
  const showCertificates = !education.certificatesHidden;
  const [subTab, setSubTab] = useState("University");
  const [certPage, setCertPage] = useState(1);

  useEffect(() => {
    setCertPage(1);
  }, [subTab]);

  const universityContent = (
    <div className="flex flex-col gap-4">
      {!education.upcoming?.hidden && (
        <div className="pb-2 border-b border-border/20">
          <p className="font-medium text-fg/35">{education.upcoming.degree}</p>
          <p className="text-sm text-muted/35 mt-1">{education.upcoming.detail}</p>
        </div>
      )}
      <div className={education.upcoming?.hidden ? "" : "pt-2"}>
        <p className="font-medium text-fg">{education.university.degree}</p>
        <p className="text-sm text-muted mt-1">{education.university.school}</p>
        <p className="text-sm font-mono text-muted mt-1">{education.university.detail}</p>
      </div>
    </div>
  );

  if (!showCertificates) {
    return <div>{universityContent}</div>;
  }

  return (
    <div>
      <SubTabs tabs={["University", "Certificates"]} active={subTab} onChange={setSubTab} />

      {subTab === "University" && universityContent}

      {subTab === "Certificates" && (
        <DataTable
          rows={education.certificates}
          page={certPage}
          setPage={setCertPage}
          descriptionKey="detail"
          renderRight={(row) =>
            row.link ? (
              <a
                href={row.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted hover:text-fg hover:underline"
              >
                View →
              </a>
            ) : (
              <span className="font-mono text-xs text-muted/50">Soon</span>
            )
          }
        />
      )}
    </div>
  );
}

export default function TabSection() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [projectPage, setProjectPage] = useState(1);
  const [workPage, setWorkPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [activeProject, setActiveProject] = useState(null);

  const activeProjectIndex = content.projects.findIndex(p => p.id === activeProject?.id);
  const handlePrevProject = useCallback(() => {
    if (activeProjectIndex > 0) {
      setActiveProject(content.projects[activeProjectIndex - 1]);
    }
  }, [activeProjectIndex]);

  const handleNextProject = useCallback(() => {
    if (activeProjectIndex < content.projects.length - 1 && activeProjectIndex !== -1) {
      setActiveProject(content.projects[activeProjectIndex + 1]);
    }
  }, [activeProjectIndex]);

  useEffect(() => {
    if (activeTab !== "Projects") setProjectPage(1);
    if (activeTab !== "Work") setWorkPage(1);
  }, [activeTab]);

  return (
    <section className="flex flex-col gap-4 relative">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-medium transition-all pb-2 -mb-[9px] sm:text-sm ${
                activeTab === tab ? "text-fg border-b-2 border-accent" : "text-muted hover:text-fg/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {activeTab === "Projects" && (
          <button
            type="button"
            onClick={() => setViewMode(prev => prev === "list" ? "grid" : "list")}
            className="text-xs font-mono text-muted hover:text-fg transition-colors"
          >
            {viewMode === "list" ? "⊞ Grid" : "≣ List"}
          </button>
        )}
      </div>

      {activeTab === "Projects" ? (
        viewMode === "grid" ? (
          <ProjectGridCarousel
            rows={content.projects}
            onProjectClick={setActiveProject}
          />
        ) : (
          <DataTable
            rows={content.projects}
            page={projectPage}
            setPage={setProjectPage}
            viewMode="list"
            onProjectClick={setActiveProject}
          />
        )
      ) : null}

      {activeTab === "Education" ? <EducationPanel /> : null}

      {activeTab === "Work" ? (
        <DataTable
          rows={content.work}
          page={workPage}
          setPage={setWorkPage}
          renderRight={(row) => <span className="font-mono text-muted text-xs">{row.duration}</span>}
        />
      ) : null}

      <ProjectModal 
        project={activeProject} 
        onClose={() => setActiveProject(null)} 
        onPrev={handlePrevProject}
        onNext={handleNextProject}
        canPrev={activeProjectIndex > 0}
        canNext={activeProjectIndex < content.projects.length - 1 && activeProjectIndex !== -1}
      />
    </section>
  );
}

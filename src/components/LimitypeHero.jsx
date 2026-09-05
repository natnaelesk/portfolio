/**
 * Limitype-style editorial hero — taupe field, tiny meta bar, massive name.
 * Layout energy matches the CARDINEL poster reference; no illustration.
 */
export default function LimitypeHero() {
  return (
    <header className="limitype-hero" aria-label="Natnael Eskinder">
      <div className="limitype-hero__meta" aria-hidden="false">
        <span className="limitype-hero__meta-left">NATNAEL</span>
        <span className="limitype-hero__meta-center">©2026</span>
        <span className="limitype-hero__meta-right">ESKINDER</span>
      </div>

      <div className="limitype-hero__stage">
        <p className="limitype-hero__sub">
          Python-first full-stack · AI automation · production backends
        </p>
        <h1 className="limitype-hero__name">NATNAEL</h1>
      </div>
    </header>
  );
}

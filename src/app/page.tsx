import { ArrowDownRight, BookOpen, Braces, Command, Sparkles } from 'lucide-react';
import { SearchBox } from '@/components/SearchBox';
import { cheatsheets } from '@/data/cheatsheets';
import { LibraryGrid } from '@/components/LibraryGrid';
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const featured = ['javascript', 'bash', 'postgresql', 'kubernetes-kubectl'].map((slug) => cheatsheets.find((sheet) => sheet.slug === slug)).filter((sheet) => sheet !== undefined);
  return <main>
    <section className="hero shell">
      <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-pulse" /> YOUR EVERYDAY DEVELOPER COMPANION</div>
        <h1>Less searching.<br /><span>More building.</span></h1>
        <p className="hero-description">The useful bits of developer documentation, all in one place. Find the syntax, commands, and patterns you need — then get back to making things.</p>
        <SearchBox />
        <div className="hero-hints"><span><kbd>Ctrl K</kbd> Focus search</span><span><kbd>↑ ↓</kbd> Choose a result</span><span><kbd>Enter</kbd> Open · <kbd>Esc</kbd> Close</span></div>
      </div>
      <div className="hero-art" aria-label="Decorative code illustration"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="code-window"><div className="window-bar"><span /><span /><span /><small>hello-world.ts</small></div><div className="code-lines"><p><i>01</i><span><b>const</b> mission = {'{'}</span></p><p><i>02</i><span>&nbsp;&nbsp;build: <em>&apos;something useful&apos;</em>,</span></p><p><i>03</i><span>&nbsp;&nbsp;learn: <em>true</em>,</span></p><p><i>04</i><span>&nbsp;&nbsp;repeat: <em>&apos;every day&apos;</em></span></p><p><i>05</i><span>{'}'};</span></p><p className="code-gap"><i>06</i><span /></p><p><i>07</i><span><b>console</b>.log(mission);<span className="cursor">▋</span></span></p></div><div className="floating-tag tag-top"><Braces size={14} /> syntax, simplified</div><div className="floating-tag tag-bottom"><Sparkles size={14} /> built for flow</div></div><div className="hero-spark spark-a">✳</div><div className="hero-spark spark-b">+</div></div>
      <div className="hero-bottom"><span>THE FIELD GUIDE FOR BUILDERS</span><a href="#explore">Explore the library <ArrowDownRight size={15} /></a></div>
    </section>

    <section className="popular-guides shell" aria-labelledby="popular-guides-heading"><div><span className="eyebrow">POPULAR REFERENCES</span><h2 id="popular-guides-heading">Start with a useful shortcut.</h2></div><div className="popular-guide-links">{featured.map((sheet) => <a href={`/cheatsheets/${sheet.slug}`} key={sheet.slug}>{sheet.title}<ArrowRight size={14} aria-hidden="true" /></a>)}</div></section>

    <section className="stats-strip"><div className="shell stats-inner"><div><strong>{cheatsheets.length}</strong><span>cheat sheets</span></div><div><strong>3 min</strong><span>to find your answer</span></div><div><strong>0 fluff</strong><span>just useful references</span></div><div className="stats-note"><Command size={17} /><span>Made for the moments<br />you forget the syntax.</span></div></div></section>

    <section className="library-section shell" id="explore"><div className="section-heading"><div><div className="eyebrow">THE LIBRARY <span className="eyebrow-line" /></div><h2>Your next <span>aha!</span> moment.</h2><p>Quick references for the tools you use every day.</p></div><span className="library-count">01 — {String(cheatsheets.length).padStart(2, '0')} <span>GUIDES</span></span></div>
      <LibraryGrid sheets={cheatsheets} />
    </section>

    <section className="bottom-cta shell" id="about"><div className="cta-icon"><BookOpen size={22} /></div><div><span className="eyebrow">BUILT FOR THE FLOW STATE</span><h2>Keep your brain for the hard problems.</h2><p>The best reference is the one that gets out of your way.</p></div><a href="#explore" className="cta-link">Browse cheat sheets <ArrowRight size={17} /></a></section>
  </main>;
}

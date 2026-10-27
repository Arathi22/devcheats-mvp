'use client';

import { useEffect, useState } from 'react';

export type TocItem = { id: string; title: string };

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState('overview');

  useEffect(() => {
    const sections = items.map(({ id }) => document.getElementById(id)).filter((section): section is HTMLElement => section !== null);
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveId(visible[0].target.id);
    }, { rootMargin: '-105px 0px -68% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  const links = items.map(({ id, title }) => <a className={`sidebar-link${activeId === id ? ' current' : ''}`} aria-current={activeId === id ? 'location' : undefined} key={id} href={`#${id}`}>{title}</a>);

  return <>
    <aside className="detail-sidebar" aria-label="Table of contents">
      <div className="sidebar-sticky"><span className="sidebar-label">ON THIS PAGE</span>{links}<div className="sidebar-tip"><p>Tip: use your browser&apos;s find shortcut to locate a term on this page.</p></div></div>
    </aside>
    <details className="mobile-toc">
      <summary>On this page</summary>
      <nav aria-label="Table of contents">{links}</nav>
    </details>
  </>;
}

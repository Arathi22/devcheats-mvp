import { codeToHtml } from 'shiki';
import { CopyButton } from '@/components/CopyButton';
import { SavedSnippetButton } from '@/components/SavedSnippetButton';

export async function CodeBlock({ language, code, title, sectionId, sourceSlug, sourceTitle }: {
  language: string;
  code: string;
  title: string;
  sectionId: string;
  sourceSlug: string;
  sourceTitle: string;
}) {
  const lineNumbers = code.split('\n').length >= 8;
  let html: string | undefined;
  try {
    html = await codeToHtml(code, { lang: language, theme: 'github-dark-default' });
  } catch {
    // Unknown grammars still render as readable, copyable plain text.
  }

  return <div className="code-card">
    <div className="code-card-top"><span className="language-dot" aria-hidden="true" /><span className="code-language">{language}</span><SavedSnippetButton id={`${sourceSlug}:${sectionId}`} sourceSlug={sourceSlug} sourceTitle={sourceTitle} sectionTitle={title} language={language} code={code} /><CopyButton code={code} /></div>
    {html
      ? <div className="highlighted-code" role="region" aria-label={`${title} code example`} dangerouslySetInnerHTML={{ __html: html }} data-line-numbers={lineNumbers || undefined} />
      : <div className="highlighted-code code-fallback" role="region" aria-label={`${title} code example`} tabIndex={0}><pre><code>{code}</code></pre></div>}
  </div>;
}

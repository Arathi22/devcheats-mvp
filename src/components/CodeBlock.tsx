import { codeToHtml } from 'shiki';
import { CopyButton } from '@/components/CopyButton';

export async function CodeBlock({ language, code }: { language: string; code: string }) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-dark-default',
  });

  return <div className="code-card">
    <div className="code-card-top"><span className="language-dot" />{language}<CopyButton code={code} /></div>
    <div className="highlighted-code" dangerouslySetInnerHTML={{ __html: html }} />
  </div>;
}

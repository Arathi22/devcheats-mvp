export type PlaygroundDraft = { html: string; css: string; javascript: string };
export type PlaygroundExample = PlaygroundDraft & { id: string; name: string; description: string };
export type PreviewMessage = { type: 'playground:ready' | 'playground:error' | 'playground:log'; token: string; message?: string };

export const STARTER_EXAMPLES: PlaygroundExample[] = [
  { id: 'hello-world', name: 'Hello World', description: 'A simple page to get started.', html: '<main class="hello">\n  <p class="eyebrow">YOUR FIRST PLAYGROUND</p>\n  <h1>Hello, world!</h1>\n  <p>Edit the HTML, CSS, and JavaScript to make it yours.</p>\n  <button id="hello-button">Say hello</button>\n</main>', css: 'body {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  font-family: system-ui, sans-serif;\n  background: #f3f5ed;\n  color: #202820;\n}\n.hello { text-align: center; padding: 2rem; }\n.eyebrow { color: #71834c; font-size: .75rem; letter-spacing: .12em; }\nbutton { padding: .7rem 1rem; border: 0; border-radius: .6rem; background: #d6fa75; cursor: pointer; }', javascript: "document.querySelector('#hello-button')?.addEventListener('click', () => {\n  console.log('Hello from the preview!');\n  alert('Hello, world!');\n});" },
  { id: 'profile-card', name: 'Profile Card', description: 'A small profile card with polished styling.', html: '<article class="profile">\n  <div class="avatar" aria-hidden="true">AM</div>\n  <p class="role">DESIGN ENGINEER</p>\n  <h1>Alex Morgan</h1>\n  <p class="bio">I make thoughtful interfaces for the web.</p>\n  <a href="mailto:alex@example.test">Get in touch</a>\n</article>', css: 'body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #eef2e8; font-family: system-ui, sans-serif; color: #202820; }\n.profile { width: min(320px, calc(100% - 40px)); padding: 30px; text-align: center; background: white; border: 1px solid #dce2d5; border-radius: 20px; box-shadow: 0 18px 45px #24351a14; }\n.avatar { display: grid; place-items: center; width: 72px; height: 72px; margin: auto; border-radius: 50%; background: #d6fa75; font-weight: 800; }\n.role { margin: 20px 0 6px; color: #71834c; font-size: 11px; letter-spacing: .12em; }\nh1 { margin: 0; font-size: 26px; }\n.bio { color: #667066; line-height: 1.6; }\na { color: #526b2f; font-weight: 700; }', javascript: '' },
  { id: 'counter', name: 'Counter', description: 'Wire up buttons with JavaScript.', html: '<main class="counter">\n  <p>YOU HAVE CLICKED</p>\n  <output id="count" aria-live="polite">0</output>\n  <div><button id="decrement" aria-label="Decrease count">−</button><button id="increment">Add one</button></div>\n</main>', css: 'body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: system-ui, sans-serif; background: #1b2422; color: #eaf0e8; }\n.counter { text-align: center; }\n.counter p { color: #a3b0a4; letter-spacing: .12em; font-size: 12px; }\noutput { display: block; margin: 10px 0 22px; font-size: 72px; font-weight: 750; }\nbutton { margin: 4px; padding: 11px 16px; border: 1px solid #47554b; border-radius: 9px; background: #26312a; color: white; cursor: pointer; }\nbutton:last-child { background: #d6fa75; color: #263516; border-color: #d6fa75; }', javascript: "let count = 0;\nconst output = document.querySelector('#count');\nfunction render() { output.textContent = String(count); }\ndocument.querySelector('#increment').addEventListener('click', () => { count += 1; render(); });\ndocument.querySelector('#decrement').addEventListener('click', () => { count -= 1; render(); });" },
  { id: 'responsive-layout', name: 'Responsive Layout', description: 'A responsive CSS Grid card layout.', html: '<main class="layout">\n  <header><p>FIELD NOTES</p><h1>Ideas in motion</h1></header>\n  <section class="cards">\n    <article><span>01</span><h2>Make space</h2><p>Give important ideas room to breathe.</p></article>\n    <article><span>02</span><h2>Find a rhythm</h2><p>Use a consistent grid to guide the eye.</p></article>\n    <article><span>03</span><h2>Stay curious</h2><p>Small experiments lead to better work.</p></article>\n  </section>\n</main>', css: 'body { margin: 0; background: #f8f8f5; color: #202820; font-family: system-ui, sans-serif; }\n.layout { width: min(900px, calc(100% - 40px)); margin: 8vh auto; }\nheader p { color: #71834c; font-size: 11px; letter-spacing: .14em; font-weight: 700; }\nh1 { margin: 8px 0 34px; font-size: clamp(34px, 7vw, 64px); letter-spacing: -.05em; }\n.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr)); gap: 14px; }\narticle { padding: 22px; background: white; border: 1px solid #e1e4dc; border-radius: 14px; }\narticle span { color: #849b51; font: 12px monospace; }\narticle p { color: #6e7772; line-height: 1.6; }', javascript: '' },
  { id: 'form-validation', name: 'Form Validation', description: 'Validate a simple form in the browser.', html: '<form id="signup" novalidate>\n  <h1>Join the list</h1>\n  <label for="email">Email address</label>\n  <input id="email" name="email" type="email" required placeholder="you@example.com">\n  <p id="message" role="status" aria-live="polite"></p>\n  <button type="submit">Sign up</button>\n</form>', css: 'body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f4f6f0; font-family: system-ui, sans-serif; color: #202820; }\nform { width: min(360px, calc(100% - 40px)); display: grid; gap: 12px; padding: 26px; background: white; border: 1px solid #e1e4dc; border-radius: 15px; }\nh1 { margin: 0 0 6px; font-size: 24px; }\nlabel { font-size: 13px; font-weight: 650; }\ninput { min-width: 0; padding: 11px; border: 1px solid #cfd6ca; border-radius: 8px; font: inherit; }\nbutton { padding: 11px; border: 0; border-radius: 8px; background: #d6fa75; font: inherit; font-weight: 700; cursor: pointer; }\n#message { min-height: 1.2em; margin: 0; color: #526b2f; font-size: 13px; }', javascript: "const form = document.querySelector('#signup');\nconst email = document.querySelector('#email');\nconst message = document.querySelector('#message');\nform.addEventListener('submit', (event) => {\n  event.preventDefault();\n  if (!email.validity.valid) {\n    message.textContent = 'Enter a valid email address.';\n    email.focus();\n    return;\n  }\n  message.textContent = 'Thanks for signing up!';\n});" },
];

export function serializeDraft(draft: PlaygroundDraft): string {
  return JSON.stringify({ version: 1, ...draft });
}

export function restoreDraft(raw: string | null): PlaygroundDraft | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return null;
    const candidate = value as Record<string, unknown>;
    if (candidate.version !== 1 || !['html', 'css', 'javascript'].every((key) => typeof candidate[key] === 'string')) return null;
    return { html: candidate.html as string, css: candidate.css as string, javascript: candidate.javascript as string };
  } catch { return null; }
}

export function exportSource(draft: PlaygroundDraft) {
  return {
    html: `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Playground export</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n${draft.html.split('\n').map((line) => `  ${line}`).join('\n')}\n  <script src="script.js"><\/script>\n</body>\n</html>`,
    css: draft.css,
    javascript: draft.javascript,
    all: `<!-- index.html -->\n${draft.html}\n\n/* style.css */\n${draft.css}\n\n// script.js\n${draft.javascript}`,
  };
}

export function hasUnsavedCode(current: PlaygroundDraft, next: PlaygroundDraft): boolean {
  return current.html !== next.html || current.css !== next.css || current.javascript !== next.javascript;
}

export function createPreviewDocument(draft: PlaygroundDraft, token: string): string {
  const safeToken = JSON.stringify(token).replace(/</g, '\\u003c');
  const safeJs = JSON.stringify(draft.javascript).replace(/</g, '\\u003c');
  const userScript = `<script>(function(){const token=${safeToken};const send=(type,message)=>parent.postMessage({type,token,message},'*');window.addEventListener('error',e=>send('playground:error',e.message||'Script error'));window.addEventListener('unhandledrejection',e=>send('playground:error',String(e.reason)));for(const level of ['log','warn','error']){const original=console[level];console[level]=(...args)=>{send(level==='error'?'playground:error':'playground:log',args.map(String).join(' '));original.apply(console,args)}}const run=()=>{send('playground:ready');const code=${safeJs};if(code){const s=document.createElement('script');s.textContent=code;document.body.appendChild(s)}};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run()})();<\/script>`;
  return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; form-action 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${draft.css}</style>${userScript}</head><body>${draft.html}</body></html>`;
}

export function isValidPreviewMessage(value: unknown, origin: string, source: MessageEventSource | null, iframeWindow: Window | null, expectedToken: string): value is PreviewMessage {
  if (origin !== 'null' || !iframeWindow || source !== iframeWindow || !value || typeof value !== 'object') return false;
  const message = value as Record<string, unknown>;
  return message.token === expectedToken && ['playground:ready', 'playground:error', 'playground:log'].includes(String(message.type)) && (message.message === undefined || typeof message.message === 'string');
}

export type Snippet = {
  title: string;
  description: string;
  language: string;
  code: string;
};

export type CheatSheet = {
  slug: string;
  title: string;
  description: string;
  category: string;
  color: string;
  tags: string[];
  snippets: Snippet[];
};

export const cheatsheets: CheatSheet[] = [
  {
    slug: "javascript", title: "JavaScript", description: "Modern syntax, arrays, objects, async code, and everyday patterns.", category: "Language", color: "#f0c94d", tags: ["js", "ecmascript", "frontend", "async"],
    snippets: [
      { title: "Variables", description: "Prefer const by default; use let when reassignment is needed.", language: "javascript", code: "const name = 'Ada';\nlet score = 0;\nscore += 10;" },
      { title: "Array methods", description: "Transform, filter, or find values without writing manual loops.", language: "javascript", code: "const numbers = [1, 2, 3, 4];\nconst doubled = numbers.map(n => n * 2);\nconst evens = numbers.filter(n => n % 2 === 0);\nconst first = numbers.find(n => n > 2);" },
      { title: "Async / await", description: "Handle promise-based work with readable control flow.", language: "javascript", code: "async function loadUser(id) {\n  const response = await fetch(`/api/users/${id}`);\n  if (!response.ok) throw new Error('Request failed');\n  return response.json();\n}" },
    ],
  },
  {
    slug: "typescript", title: "TypeScript", description: "Types, interfaces, unions, generics, and safer JavaScript APIs.", category: "Language", color: "#4c8ed9", tags: ["ts", "types", "interfaces", "generics"],
    snippets: [
      { title: "Type aliases and unions", description: "Represent a value that can be one of several known types.", language: "typescript", code: "type Status = 'idle' | 'loading' | 'success' | 'error';\n\nfunction setStatus(status: Status) {\n  return status;\n}" },
      { title: "Interfaces", description: "Describe the shape of an object passed between parts of an app.", language: "typescript", code: "interface User {\n  id: number;\n  name: string;\n  email?: string;\n}\n\nconst user: User = { id: 1, name: 'Ada' };" },
      { title: "Generics", description: "Preserve type information while writing reusable functions.", language: "typescript", code: "function identity<T>(value: T): T {\n  return value;\n}\n\nconst count = identity<number>(42);" },
    ],
  },
  {
    slug: "react", title: "React", description: "Components, props, state, effects, and common UI patterns.", category: "Framework", color: "#61dafb", tags: ["jsx", "hooks", "components", "frontend"],
    snippets: [
      { title: "Function component", description: "Build reusable UI from props.", language: "tsx", code: "type GreetingProps = { name: string };\n\nexport function Greeting({ name }: GreetingProps) {\n  return <h1>Hello, {name}!</h1>;\n}" },
      { title: "State", description: "Use state for values that change over time and affect rendering.", language: "tsx", code: "'use client';\nimport { useState } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;\n}" },
      { title: "Render a list", description: "Give each rendered item a stable key.", language: "tsx", code: "const tasks = ['Plan', 'Build', 'Ship'];\n\n<ul>\n  {tasks.map(task => <li key={task}>{task}</li>)}\n</ul>" },
    ],
  },
  {
    slug: "html", title: "HTML", description: "Semantic structure, links, forms, images, and accessible markup.", category: "Web", color: "#ef8157", tags: ["markup", "semantic", "forms", "accessibility"],
    snippets: [
      { title: "HTML document", description: "A minimal document with language, metadata, and semantic content.", language: "html", code: "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>Page title</title>\n  </head>\n  <body>\n    <main><h1>Hello, world</h1></main>\n  </body>\n</html>" },
      { title: "Accessible form", description: "Associate each input with a visible label.", language: "html", code: "<form action=\"/subscribe\" method=\"post\">\n  <label for=\"email\">Email address</label>\n  <input id=\"email\" name=\"email\" type=\"email\" required>\n  <button type=\"submit\">Subscribe</button>\n</form>" },
    ],
  },
  {
    slug: "css", title: "CSS", description: "Selectors, layout, Flexbox, Grid, responsive design, and variables.", category: "Web", color: "#7c9df2", tags: ["styles", "flexbox", "grid", "responsive"],
    snippets: [
      { title: "CSS variables", description: "Keep reusable design values in custom properties.", language: "css", code: ":root {\n  --color-primary: #635bff;\n  --space-4: 1rem;\n}\n\n.button {\n  background: var(--color-primary);\n  padding: var(--space-4);\n}" },
      { title: "Flexbox", description: "Align items along a row or column.", language: "css", code: ".toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}" },
      { title: "Responsive breakpoint", description: "Adapt a layout when the viewport is wide enough.", language: "css", code: ".cards { display: grid; grid-template-columns: 1fr; gap: 1rem; }\n\n@media (min-width: 768px) {\n  .cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n}" },
    ],
  },
  {
    slug: "nodejs", title: "Node.js", description: "Modules, environment variables, files, and HTTP server basics.", category: "Runtime", color: "#72a96b", tags: ["node", "npm", "server", "backend"],
    snippets: [
      { title: "Read environment variables", description: "Keep secrets and environment-specific configuration out of source code.", language: "javascript", code: "const port = Number(process.env.PORT ?? 3000);\nconst databaseUrl = process.env.DATABASE_URL;\n\nif (!databaseUrl) {\n  throw new Error('DATABASE_URL is required');\n}" },
      { title: "Read a file", description: "Use the promise-based filesystem API for asynchronous file access.", language: "javascript", code: "import { readFile } from 'node:fs/promises';\n\nconst text = await readFile('./notes.txt', 'utf8');\nconsole.log(text);" },
    ],
  },
  {
    slug: "python", title: "Python", description: "Collections, comprehensions, functions, and virtual environments.", category: "Language", color: "#75a7d7", tags: ["py", "pip", "venv", "backend", "data"],
    snippets: [
      { title: "List comprehension", description: "Build a list from an iterable with a concise expression.", language: "python", code: "numbers = [1, 2, 3, 4, 5]\nsquares = [n * n for n in numbers]\nevens = [n for n in numbers if n % 2 == 0]" },
      { title: "Function and type hints", description: "Document expected argument and return types.", language: "python", code: "def greet(name: str, excited: bool = False) -> str:\n    ending = '!' if excited else '.'\n    return f'Hello, {name}{ending}'" },
    ],
  },
  {
    slug: "sql", title: "SQL", description: "SELECT queries, joins, grouping, filtering, and safe updates.", category: "Database", color: "#b09ae9", tags: ["mysql", "postgresql", "database", "queries"],
    snippets: [
      { title: "Filter and sort", description: "Use explicit columns, predicates, and deterministic ordering.", language: "sql", code: "SELECT id, name, created_at\nFROM users\nWHERE active = TRUE\nORDER BY created_at DESC\nLIMIT 20;" },
      { title: "Join tables", description: "Combine related records using a key relationship.", language: "sql", code: "SELECT orders.id, customers.name\nFROM orders\nJOIN customers ON customers.id = orders.customer_id\nWHERE orders.status = 'paid';" },
      { title: "Aggregate", description: "Group rows and filter groups with HAVING.", language: "sql", code: "SELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id\nHAVING COUNT(*) > 3;" },
    ],
  },
  {
    slug: "git", title: "Git", description: "Everyday version control commands for branches, commits, and history.", category: "Tools", color: "#e77d5d", tags: ["github", "version control", "branch", "commit"],
    snippets: [
      { title: "Start and commit", description: "Inspect changes before staging and committing them.", language: "bash", code: "git status\ngit add src/\ngit commit -m \"Add search interface\"" },
      { title: "Branch workflow", description: "Create a feature branch and publish it to the remote.", language: "bash", code: "git switch -c feat/search\n# make changes, then commit\ngit push -u origin feat/search" },
      { title: "Inspect history", description: "View concise commit history and changes in a commit.", language: "bash", code: "git log --oneline --graph --decorate -12\ngit show --stat HEAD" },
    ],
  },
  {
    slug: "docker", title: "Docker", description: "Images, containers, logs, builds, and Compose commands.", category: "Tools", color: "#70a9e8", tags: ["containers", "compose", "images", "devops"],
    snippets: [
      { title: "Build and run", description: "Build an image and run it with a host-to-container port mapping.", language: "bash", code: "docker build -t my-app .\ndocker run --rm -p 3000:3000 my-app" },
      { title: "Inspect a container", description: "Check running containers and follow application logs.", language: "bash", code: "docker ps\ndocker logs -f <container_name>\ndocker exec -it <container_name> sh" },
      { title: "Docker Compose", description: "Start services in the background and stop them when finished.", language: "bash", code: "docker compose up -d\ndocker compose logs -f\ndocker compose down" },
    ],
  },
];

export function getCheatSheet(slug: string) {
  return cheatsheets.find((sheet) => sheet.slug === slug);
}

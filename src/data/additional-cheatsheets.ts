import type { CheatSheet } from '@/data/cheatsheets';

// Reviewed on 2026-10-27 against the linked upstream documentation and current examples.
export const additionalCheatsheets: CheatSheet[] = [
  {
    slug: 'bash', title: 'Bash & Shell Scripting', description: 'Quote safely, branch on command status, loop over files, and write small Bash scripts.', category: 'Tools', color: '#9eae82', tags: ['bash', 'shell', 'terminal', 'scripting', 'cli'], difficulty: 'Intermediate', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Script starter', description: 'Use a Bash shebang and fail clearly when a command fails or a variable is unset.', language: 'bash', code: '#!/usr/bin/env bash\nset -euo pipefail\n\nname="${1:-world}"\nprintf \'Hello, %s\\n\' "$name"' },
      { title: 'Variables and quoting', description: 'Quote expansions to preserve spaces and avoid accidental word splitting.', language: 'bash', code: 'project_dir="./my project"\nmkdir -p "$project_dir/build"\nprintf \'Directory: %s\\n\' "$project_dir"' },
      { title: 'Check command success', description: 'Branch on a command directly instead of inspecting localized output.', language: 'bash', code: 'if grep -q "TODO" README.md; then\n  echo "Review the TODOs"\nelse\n  echo "No TODOs found"\nfi' },
      { title: 'Loop over matching files', description: 'A nullglob avoids treating an unmatched pattern as a literal filename.', language: 'bash', code: 'shopt -s nullglob\nfor file in ./*.log; do\n  printf \'Found: %s\\n\' "$file"\ndone' },
      { title: 'Read lines safely', description: 'Preserve whitespace and process a final line without a trailing newline.', language: 'bash', code: 'while IFS= read -r line || [[ -n "$line" ]]; do\n  printf \'%s\\n\' "$line"\ndone < input.txt' },
    ],
  },
  {
    slug: 'linux-commands', title: 'Linux Commands', description: 'Find files, inspect processes, check disk usage, and read logs from a Linux shell.', category: 'Tools', color: '#90a4ae', tags: ['linux', 'shell', 'terminal', 'find', 'processes'], difficulty: 'Beginner', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'List files', description: 'Include hidden files and readable sizes when inspecting a directory.', language: 'bash', code: 'ls -lah\nls -lt -- ./logs' },
      { title: 'Find by name', description: 'Limit a recursive search to a directory and match a filename pattern.', language: 'bash', code: 'find ./src -type f -name \'*.ts\' -print' },
      { title: 'Search file contents', description: 'Use recursive grep to find a term and show matching line numbers.', language: 'bash', code: 'grep -RIn --include=\'*.ts\' \'TODO\' ./src' },
      { title: 'Inspect processes', description: 'List matching processes before deciding whether intervention is needed.', language: 'bash', code: 'ps aux | grep -i node\ntop' },
      { title: 'Check disk space', description: 'Compare filesystem capacity with the size of a particular directory.', language: 'bash', code: 'df -h\ndu -sh ./node_modules' },
    ],
  },
  {
    slug: 'regular-expressions', title: 'Regular Expressions', description: 'Build readable JavaScript regular expressions for validation, search, and replacement.', category: 'Web', color: '#b09ae9', tags: ['regex', 'regexp', 'javascript', 'validation', 'pattern'], difficulty: 'Intermediate', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Literal and flags', description: 'Use anchors for a whole-string match and the i flag for case-insensitive matching.', language: 'javascript', code: 'const isHandle = /^[a-z][a-z0-9_]{2,15}$/i.test("Ada_7");' },
      { title: 'Character classes', description: 'Use a character class and quantifier to find digit groups.', language: 'javascript', code: 'const phone = "Call 555-0134";\nconst digits = phone.match(/\\d{3}-\\d{4}/);' },
      { title: 'Capture groups', description: 'Capture named parts so later code can use them without positional indices.', language: 'javascript', code: 'const match = "2026-10-27".match(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/);\nconsole.log(match?.groups?.month);' },
      { title: 'Replace matches', description: 'Use a global replacement to normalize repeated separators.', language: 'javascript', code: 'const slug = "Hello   regex world".toLowerCase().replace(/\\s+/g, "-");' },
      { title: 'Escape dynamic text', description: 'Escape user-provided text before inserting it into a regular expression.', language: 'javascript', code: 'function escapeRegExp(value) {\n  return value.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&");\n}\nconst exact = new RegExp(escapeRegExp("a+b"), "i");' },
    ],
  },
  {
    slug: 'markdown', title: 'Markdown', description: 'Format headings, links, lists, code, tables, and task lists in common Markdown flavors.', category: 'Web', color: '#8da0b6', tags: ['markdown', 'readme', 'docs', 'gfm', 'writing'], difficulty: 'Beginner', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Headings and emphasis', description: 'Use a clear heading hierarchy and emphasis sparingly for readable documents.', language: 'markdown', code: '# Project title\n\n## Setup\n\nUse **bold** for a key term and *italics* for light emphasis.' },
      { title: 'Links and images', description: 'Give links descriptive text and images useful alternative text.', language: 'markdown', code: '[Read the API guide](https://example.com/docs)\n\n![Diagram of the request flow](request-flow.png)' },
      { title: 'Lists and task items', description: 'Use task-list syntax in GitHub Flavored Markdown issue and project files.', language: 'markdown', code: '- [x] Add validation\n- [ ] Document the response shape\n  - Add an example payload' },
      { title: 'Fenced code', description: 'Name the language after the opening fence to enable syntax highlighting.', language: 'markdown', code: '```js\nconst ready = true;\n```' },
      { title: 'Table', description: 'Use a header row and alignment markers for compact tabular notes.', language: 'markdown', code: '| Method | Use |\n| :-- | :-- |\n| GET | Read a resource |\n| POST | Create a resource |' },
    ],
  },
  {
    slug: 'npm', title: 'npm & Package Management', description: 'Install dependencies reproducibly, run package scripts, and manage version ranges with npm.', category: 'Tools', color: '#cb3837', tags: ['npm', 'node', 'package-json', 'dependencies', 'lockfile'], difficulty: 'Beginner', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Initialize a package', description: 'Create a package manifest with defaults, then edit its metadata as needed.', language: 'bash', code: 'npm init -y' },
      { title: 'Add dependencies', description: 'Install runtime packages or development-only tooling into the manifest.', language: 'bash', code: 'npm install express\nnpm install --save-dev typescript' },
      { title: 'Install from the lockfile', description: 'npm ci removes the current node_modules folder, then installs from the lockfile without rewriting it.', language: 'bash', code: 'npm ci' },
      { title: 'Define and run scripts', description: 'Store repeatable project commands in package.json scripts.', language: 'json', code: '{\n  "scripts": {\n    "dev": "next dev",\n    "lint": "eslint .",\n    "build": "next build"\n  }\n}' },
      { title: 'Inspect dependency versions', description: 'See installed versions and identify outdated direct dependencies before upgrading.', language: 'bash', code: 'npm ls --depth=0\nnpm outdated' },
    ],
  },
  {
    slug: 'rest-http', title: 'REST APIs & HTTP Status Codes', description: 'Choose resource-oriented HTTP methods, send JSON, and interpret common response status codes.', category: 'Web', color: '#5780a8', tags: ['rest', 'http', 'api', 'status-codes', 'json'], difficulty: 'Intermediate', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Resource routes', description: 'Use nouns for resources and HTTP methods to express the requested operation.', language: 'http', code: 'GET    /api/users/42\nPOST   /api/users\nPATCH  /api/users/42\nDELETE /api/users/42' },
      { title: 'Send JSON', description: 'Declare the media type and send a JSON request body for a resource update.', language: 'http', code: 'PATCH /api/users/42 HTTP/1.1\nContent-Type: application/json\n\n{"displayName":"Ada"}' },
      { title: 'Success responses', description: 'Use 200 for a returned result, 201 for creation, and 204 when no body is returned.', language: 'text', code: '200 OK       Request succeeded with a representation\n201 Created  A resource was created\n204 No Content  Request succeeded without a response body' },
      { title: 'Client and server errors', description: 'Distinguish invalid requests, missing resources, conflicts, and server failures.', language: 'text', code: '400 Bad Request\n401 Unauthorized\n403 Forbidden\n404 Not Found\n409 Conflict\n500 Internal Server Error' },
      { title: 'Retry-aware responses', description: 'Respect Retry-After for rate limits or temporary service outages.', language: 'http', code: 'HTTP/1.1 429 Too Many Requests\nRetry-After: 30\nContent-Type: application/json\n\n{"error":"rate limit exceeded"}' },
    ],
  },
  {
    slug: 'postgresql', title: 'PostgreSQL', description: 'Use PostgreSQL types, returning clauses, conflict handling, and transactions in everyday queries.', category: 'Database', color: '#6386a8', tags: ['postgres', 'postgresql', 'sql', 'database', 'jsonb'], difficulty: 'Intermediate', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Create a table', description: 'Use constraints to keep identifiers unique and required values present.', language: 'sql', code: 'CREATE TABLE users (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  email text NOT NULL UNIQUE,\n  created_at timestamptz NOT NULL DEFAULT now()\n);' },
      { title: 'Return inserted rows', description: 'Use RETURNING to get generated values without a second query.', language: 'sql', code: 'INSERT INTO users (email)\nVALUES (\'ada@example.com\')\nRETURNING id, email, created_at;' },
      { title: 'Upsert on a unique key', description: 'Handle a unique-key conflict explicitly rather than racing a separate check.', language: 'sql', code: 'INSERT INTO settings (key, value)\nVALUES (\'theme\', \'dark\')\nON CONFLICT (key) DO UPDATE\nSET value = EXCLUDED.value\nRETURNING key, value;' },
      { title: 'JSONB field lookup', description: 'Use JSONB operators when a flexible document field belongs alongside relational columns.', language: 'sql', code: 'SELECT id, profile->>\'displayName\' AS display_name\nFROM users\nWHERE profile @> \'{"active": true}\'::jsonb;' },
      { title: 'Transaction', description: 'Keep related changes atomic; roll back if validation or a later statement fails.', language: 'sql', code: 'BEGIN;\nUPDATE accounts SET balance = balance - 25 WHERE id = 1;\nUPDATE accounts SET balance = balance + 25 WHERE id = 2;\nCOMMIT;\n-- Use ROLLBACK instead of COMMIT if the transfer cannot complete.' },
    ],
  },
  {
    slug: 'mongodb', title: 'MongoDB', description: 'Query documents, update fields, aggregate records, and create indexes with mongosh.', category: 'Database', color: '#5c9c67', tags: ['mongodb', 'mongo', 'mongosh', 'document-database', 'aggregation'], difficulty: 'Intermediate', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Find documents', description: 'Filter by field values and project only the fields needed by the caller.', language: 'javascript', code: 'db.users.find(\n  { status: "active" },\n  { email: 1, createdAt: 1, _id: 0 }\n).limit(20);' },
      { title: 'Insert a document', description: 'Insert one document and keep the returned identifier for subsequent work.', language: 'javascript', code: 'const result = db.users.insertOne({\n  email: "ada@example.com",\n  status: "active",\n  createdAt: new Date()\n});\nresult.insertedId;' },
      { title: 'Update one field', description: 'Use $set to change selected fields without replacing the entire document.', language: 'javascript', code: 'db.users.updateOne(\n  { email: "ada@example.com" },\n  { $set: { status: "verified" } }\n);' },
      { title: 'Aggregate and group', description: 'Group matching documents and calculate a count per category.', language: 'javascript', code: 'db.orders.aggregate([\n  { $match: { status: "paid" } },\n  { $group: { _id: "$customerId", orderCount: { $sum: 1 } } },\n  { $sort: { orderCount: -1 } }\n]);' },
      { title: 'Create an index', description: 'Index fields used in frequent equality lookups; review write and storage costs too.', language: 'javascript', code: 'db.users.createIndex({ email: 1 }, { unique: true });' },
    ],
  },
  {
    slug: 'expressjs', title: 'Express.js', description: 'Define Express routes, parse JSON, handle errors, and organize middleware.', category: 'Framework', color: '#879176', tags: ['express', 'node', 'http', 'middleware', 'routing'], difficulty: 'Intermediate', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Create an app', description: 'Register JSON parsing before routes that read request bodies.', language: 'javascript', code: 'import express from "express";\n\nconst app = express();\napp.use(express.json());' },
      { title: 'Route parameters', description: 'Read path parameters and forward asynchronous failures to error middleware.', language: 'javascript', code: 'app.get("/users/:userId", async (req, res, next) => {\n  try {\n    const user = await findUser(req.params.userId);\n    if (!user) return res.sendStatus(404);\n    res.json(user);\n  } catch (error) {\n    next(error);\n  }\n});' },
      { title: 'Validate input', description: 'Reject malformed request data before passing it to application logic.', language: 'javascript', code: 'app.post("/users", (req, res) => {\n  const { email } = req.body ?? {};\n  if (typeof email !== "string" || !email.includes("@")) {\n    return res.status(400).json({ error: "A valid email is required" });\n  }\n  res.status(201).json({ email });\n});' },
      { title: 'Mount a router', description: 'Group related endpoints behind a route prefix to keep modules focused.', language: 'javascript', code: 'import { Router } from "express";\n\nconst router = Router();\nrouter.get("/", listUsers);\nrouter.get("/:userId", getUser);\napp.use("/api/users", router);' },
      { title: 'Error middleware', description: 'Place four-argument error middleware after routes to centralize failures.', language: 'javascript', code: 'app.use((err, req, res, next) => {\n  console.error(err);\n  if (res.headersSent) return next(err);\n  res.status(500).json({ error: "Internal server error" });\n});' },
    ],
  },
  {
    slug: 'redux-toolkit', title: 'Redux Toolkit', description: 'Configure a Redux store, define slices, select state, and handle async work with Redux Toolkit.', category: 'Framework', color: '#8069b2', tags: ['redux', 'redux-toolkit', 'react', 'state', 'createSlice'], difficulty: 'Intermediate', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Configure the store', description: 'Pass slice reducers to configureStore and keep inferred store types.', language: 'typescript', code: 'import { configureStore } from "@reduxjs/toolkit";\nimport counterReducer from "./counterSlice";\n\nexport const store = configureStore({\n  reducer: { counter: counterReducer },\n});\nexport type RootState = ReturnType<typeof store.getState>;' },
      { title: 'Create a slice', description: 'createSlice generates action creators and handles immutable updates through Immer.', language: 'typescript', code: 'import { createSlice } from "@reduxjs/toolkit";\n\nconst counterSlice = createSlice({\n  name: "counter",\n  initialState: { value: 0 },\n  reducers: {\n    increment(state) { state.value += 1; },\n    addBy(state, action: { payload: number }) { state.value += action.payload; },\n  },\n});\nexport const { increment, addBy } = counterSlice.actions;\nexport default counterSlice.reducer;' },
      { title: 'Read and dispatch state', description: 'Use typed selectors and dispatch actions from a React component.', language: 'tsx', code: 'const value = useSelector((state: RootState) => state.counter.value);\nconst dispatch = useDispatch<AppDispatch>();\n\n<button onClick={() => dispatch(increment())}>Count: {value}</button>' },
      { title: 'Create async work', description: 'createAsyncThunk dispatches pending, fulfilled, and rejected lifecycle actions.', language: 'typescript', code: 'export const loadUser = createAsyncThunk(\n  "users/load",\n  async (userId: string) => {\n    const response = await fetch(`/api/users/${userId}`);\n    if (!response.ok) throw new Error("Could not load user");\n    return response.json() as Promise<User>;\n  },\n);' },
      { title: 'Handle thunk outcomes', description: 'Use extraReducers to update loading state and data for each request outcome.', language: 'typescript', code: 'extraReducers: (builder) => {\n  builder\n    .addCase(loadUser.pending, (state) => { state.status = "loading"; })\n    .addCase(loadUser.fulfilled, (state, action) => {\n      state.status = "ready";\n      state.user = action.payload;\n    })\n    .addCase(loadUser.rejected, (state) => { state.status = "error"; });\n}' },
    ],
  },
  {
    slug: 'css-flexbox-grid', title: 'CSS Flexbox & Grid', description: 'Choose Flexbox for one-dimensional alignment and Grid for two-dimensional page or card layouts.', category: 'Web', color: '#7c9df2', tags: ['css', 'flexbox', 'grid', 'layout', 'responsive'], difficulty: 'Beginner', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Center with Flexbox', description: 'Use alignment properties to center a child along both axes.', language: 'css', code: '.center {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 12rem;\n}' },
      { title: 'Space a toolbar', description: 'Flexbox is a good fit for a row whose items need consistent gaps and flexible space.', language: 'css', code: '.toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}' },
      { title: 'Responsive card grid', description: 'auto-fit and minmax create as many useful columns as the available width permits.', language: 'css', code: '.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));\n  gap: 1rem;\n}' },
      { title: 'Named page areas', description: 'Named areas make a small application shell easier to scan and rearrange.', language: 'css', code: '.layout {\n  display: grid;\n  grid-template-columns: 16rem 1fr;\n  grid-template-areas: "sidebar main";\n}\n.sidebar { grid-area: sidebar; }\nmain { grid-area: main; }' },
      { title: 'Switch layout on small screens', description: 'Change the grid tracks at a breakpoint while retaining semantic document order.', language: 'css', code: '@media (max-width: 48rem) {\n  .layout { grid-template-columns: 1fr; grid-template-areas: "main"; }\n  .sidebar { display: none; }\n}' },
    ],
  },
  {
    slug: 'docker-compose', title: 'Docker Compose', description: 'Run a multi-container development stack with Compose services, ports, volumes, and health checks.', category: 'Tools', color: '#70a9e8', tags: ['docker', 'compose', 'containers', 'services', 'devops'], difficulty: 'Intermediate', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Define services', description: 'Describe related containers in a Compose file; images and ports make the example runnable.', language: 'yaml', code: 'services:\n  web:\n    image: nginx:alpine\n    ports:\n      - "8080:80"' },
      { title: 'Start and inspect', description: 'Start services in the background, then inspect their state and recent logs.', language: 'bash', code: 'docker compose up -d\ndocker compose ps\ndocker compose logs --tail=50' },
      { title: 'Add a database', description: 'Use a named volume for database files and a health check before dependent work.', language: 'yaml', code: 'services:\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_DB: app\n      POSTGRES_USER: app\n      POSTGRES_PASSWORD: ${DB_PASSWORD:?set DB_PASSWORD}\n    volumes:\n      - db-data:/var/lib/postgresql/data\nvolumes:\n  db-data:' },
      { title: 'Run a one-off command', description: 'Run a command in a service container using the project configuration.', language: 'bash', code: 'docker compose run --rm web sh' },
      { title: 'Stop the project', description: 'Stop and remove project containers and networks; -v also deletes named volumes and their data.', language: 'bash', code: 'docker compose down\n# Destructive: remove named volumes and stored database data too\ndocker compose down --volumes' },
    ],
  },
  {
    slug: 'vim', title: 'Vim', description: 'Navigate buffers, edit text in modal modes, search, replace, and save safely in Vim.', category: 'Tools', color: '#5b9e62', tags: ['vim', 'editor', 'terminal', 'navigation', 'search'], difficulty: 'Beginner', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Modes and escape', description: 'Press Esc to return to Normal mode before issuing navigation or command-line actions.', language: 'text', code: 'i  Insert before cursor\na  Insert after cursor\nEsc  Return to Normal mode\n:  Enter a command' },
      { title: 'Move around', description: 'Use familiar keys for character movement and jump to line boundaries.', language: 'text', code: 'h  left     j  down\nk  up       l  right\n0  line start\n$  line end\ngg first line\nG  last line' },
      { title: 'Edit text', description: 'Delete, change, or yank a line, then paste after the cursor.', language: 'text', code: 'dd  delete line\ncc  change line\nyy  copy line\np   paste after cursor\nu   undo\nCtrl-r redo' },
      { title: 'Search and replace', description: 'Search forward, then replace a term throughout the current buffer after reviewing the pattern.', language: 'vim', code: '/TODO\n:%s/oldName/newName/g' },
      { title: 'Save and quit', description: 'Use :q! only when you intentionally want to discard unsaved edits.', language: 'vim', code: ':w\n:q\n:wq\n:q!' },
    ],
  },
  {
    slug: 'curl', title: 'curl', description: 'Make HTTP requests from a terminal, inspect response headers, send JSON, and follow redirects.', category: 'Tools', color: '#658cab', tags: ['curl', 'http', 'api', 'terminal', 'request'], difficulty: 'Beginner', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'GET a URL', description: 'On curl 7.76 or later, fail-with-body returns an error status for HTTP failures while retaining the response body.', language: 'bash', code: 'curl --fail-with-body https://api.example.test/health' },
      { title: 'Show response headers', description: 'Include response headers when diagnosing caching, content types, or redirects.', language: 'bash', code: 'curl --include https://api.example.test/items' },
      { title: 'Send JSON', description: 'Set the content type and pass a JSON body to a POST endpoint.', language: 'bash', code: 'curl --fail-with-body --header "Content-Type: application/json" --data \'{"name":"notebook"}\' https://api.example.test/items' },
      { title: 'Follow redirects', description: 'Ask curl to follow Location responses when the final destination matters.', language: 'bash', code: 'curl --location https://example.test/old-path' },
      { title: 'Set a bearer token', description: 'Read a token from the environment instead of putting credentials in shell history.', language: 'bash', code: 'curl --header "Authorization: Bearer $API_TOKEN" https://api.example.test/me' },
    ],
  },
  {
    slug: 'go', title: 'Go', description: 'Write small Go programs with packages, slices, maps, explicit errors, and tests.', category: 'Language', color: '#62b6c7', tags: ['go', 'golang', 'slices', 'maps', 'errors'], difficulty: 'Intermediate', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Program entry point', description: 'A Go executable starts in package main and runs main.main.', language: 'go', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("hello, Go")\n}' },
      { title: 'Slices and iteration', description: 'Use slices for ordered collections and range for indexed iteration.', language: 'go', code: 'names := []string{"Ada", "Lin"}\nfor index, name := range names {\n    fmt.Printf("%d: %s\\n", index, name)\n}' },
      { title: 'Map lookup', description: 'The second map lookup result reports whether the key exists.', language: 'go', code: 'scores := map[string]int{"Ada": 10}\nscore, ok := scores["Ada"]\nif ok {\n    fmt.Println(score)\n}' },
      { title: 'Return errors', description: 'Return errors to the caller and handle them explicitly at the call site.', language: 'go', code: 'import "errors"\n\nfunc divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, errors.New("division by zero")\n    }\n    return a / b, nil\n}' },
      { title: 'Format and test', description: 'Format source files before running package tests.', language: 'bash', code: 'gofmt -w main.go\ngo test ./...' },
    ],
  },
  {
    slug: 'kubernetes-kubectl', title: 'Kubernetes & kubectl', description: 'Inspect Kubernetes resources, apply manifests, follow rollouts, and remove resources deliberately.', category: 'Tools', color: '#5278c1', tags: ['kubernetes', 'kubectl', 'k8s', 'containers', 'deployment'], difficulty: 'Advanced', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Inspect a namespace', description: 'List workloads and inspect one resource before changing cluster state.', language: 'bash', code: 'kubectl get deployments,pods -n staging\nkubectl describe deployment web -n staging' },
      { title: 'Read logs', description: 'Inspect a pod’s recent logs, optionally selecting a container by name.', language: 'bash', code: 'kubectl logs deployment/web -n staging --tail=100\nkubectl logs pod/web-abc123 -c app -n staging' },
      { title: 'Apply a manifest', description: 'Review the manifest and target context before applying a declarative change.', language: 'bash', code: 'kubectl config current-context\nkubectl diff -f deployment.yaml\nkubectl apply -f deployment.yaml' },
      { title: 'Watch a rollout', description: 'Wait for a deployment rollout and inspect its status if it does not complete.', language: 'bash', code: 'kubectl rollout status deployment/web -n staging\nkubectl rollout history deployment/web -n staging' },
      { title: 'Delete deliberately', description: 'Deletion changes cluster state; verify the context, namespace, and exact resource first.', language: 'bash', code: 'kubectl config current-context\nkubectl get deployment web -n staging\n# Destructive: removes this deployment from the cluster\nkubectl delete deployment web -n staging' },
    ],
  },
  {
    slug: 'javascript-array-methods', title: 'JavaScript Array Methods', description: 'Transform, filter, search, sort, and flatten JavaScript arrays without mutating them by accident.', category: 'Language', color: '#f0c94d', tags: ['javascript', 'arrays', 'map', 'filter', 'reduce'], difficulty: 'Beginner', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Transform and filter', description: 'map returns transformed values; filter keeps items whose predicate is true.', language: 'javascript', code: 'const numbers = [1, 2, 3, 4];\nconst doubled = numbers.map((n) => n * 2);\nconst evens = numbers.filter((n) => n % 2 === 0);' },
      { title: 'Find items', description: 'find returns the first match; some and every answer boolean questions.', language: 'javascript', code: 'const users = [{ id: 1 }, { id: 2 }];\nconst user = users.find((item) => item.id === 2);\nconst hasGuest = users.some((item) => item.role === "guest");\nconst allHaveIds = users.every((item) => Number.isInteger(item.id));' },
      { title: 'Reduce to a value', description: 'Provide an initial accumulator so empty arrays have a well-defined result.', language: 'javascript', code: 'const total = [4, 7, 9].reduce((sum, value) => sum + value, 0);' },
      { title: 'Sort a copy', description: 'sort mutates its receiver; copy first when the original array must stay unchanged.', language: 'javascript', code: 'const sorted = [...scores].sort((a, b) => a - b);\nconst byName = [...users].sort((a, b) => a.name.localeCompare(b.name));' },
      { title: 'Flatten and deduplicate', description: 'flatMap maps each item and flattens one level; Set preserves first-seen unique values.', language: 'javascript', code: 'const words = ["red blue", "green"];\nconst tokens = words.flatMap((value) => value.split(" "));\nconst unique = [...new Set(tokens)];' },
    ],
  },
  {
    slug: 'javascript-string-methods', title: 'JavaScript String Methods', description: 'Trim, search, split, replace, and format strings with built-in JavaScript methods.', category: 'Language', color: '#f0c94d', tags: ['javascript', 'strings', 'replace', 'split', 'includes'], difficulty: 'Beginner', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Trim and normalize', description: 'Remove surrounding whitespace before validating or comparing user input.', language: 'javascript', code: 'const name = "  Ada Lovelace  ".trim();\nconst key = name.toLowerCase();' },
      { title: 'Check and locate', description: 'Use includes for a yes/no check and indexOf when the position matters.', language: 'javascript', code: 'const message = "Build useful tools";\nconst mentionsTools = message.includes("tools");\nconst position = message.indexOf("useful");' },
      { title: 'Split and join', description: 'Convert a delimited string to parts and join parts with a chosen separator.', language: 'javascript', code: 'const tags = "js, css, html".split(", ");\nconst csv = tags.join(",");' },
      { title: 'Replace text', description: 'replace changes the first match unless a global regular expression is used.', language: 'javascript', code: 'const label = "a  b   c".replace(/\\s+/g, " ");\nconst greeting = "Hello, Ada".replace("Ada", "Lin");' },
      { title: 'Slice a substring', description: 'slice uses an inclusive start and exclusive end and supports negative offsets.', language: 'javascript', code: 'const filename = "report.final.pdf";\nconst extension = filename.slice(filename.lastIndexOf(".") + 1);\nconst lastFour = filename.slice(-4);' },
    ],
  },
  {
    slug: 'javascript-objects', title: 'JavaScript Objects', description: 'Create, copy, inspect, and safely access JavaScript objects and their properties.', category: 'Language', color: '#f0c94d', tags: ['javascript', 'objects', 'properties', 'destructuring', 'spread'], difficulty: 'Beginner', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Create and read properties', description: 'Use dot notation for known property names and brackets for computed keys.', language: 'javascript', code: 'const user = { name: "Ada", active: true };\nconst name = user.name;\nconst key = "active";\nconst isActive = user[key];' },
      { title: 'Destructure with defaults', description: 'Destructure fields and provide a fallback for missing optional values.', language: 'javascript', code: 'const { name, role = "reader" } = user;' },
      { title: 'Copy and override', description: 'Object spread makes a shallow copy; later properties replace earlier ones.', language: 'javascript', code: 'const updated = { ...user, active: false };' },
      { title: 'Enumerate entries', description: 'Object.entries is convenient when both a key and value are needed.', language: 'javascript', code: 'for (const [key, value] of Object.entries(user)) {\n  console.log(key, value);\n}' },
      { title: 'Optional chaining and nullish defaults', description: 'Avoid errors for missing nested values and default only for null or undefined.', language: 'javascript', code: 'const city = user.profile?.address?.city ?? "Unknown";' },
    ],
  },
  {
    slug: 'javascript-promises', title: 'JavaScript Promises & async/await', description: 'Compose asynchronous work, handle failures, and coordinate concurrent promises.', category: 'Language', color: '#f0c94d', tags: ['javascript', 'promises', 'async', 'await', 'concurrency'], difficulty: 'Intermediate', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Await and handle errors', description: 'Use try/catch around awaited work when the caller can recover from failure.', language: 'javascript', code: 'async function loadProfile(id) {\n  try {\n    return await fetchProfile(id);\n  } catch (error) {\n    console.error("Profile request failed", error);\n    throw error;\n  }\n}' },
      { title: 'Run independent tasks together', description: 'Promise.all runs independent tasks concurrently and rejects if any input rejects.', language: 'javascript', code: 'const [user, settings] = await Promise.all([\n  loadUser(id),\n  loadSettings(id),\n]);' },
      { title: 'Keep partial successes', description: 'allSettled reports every outcome when some independent tasks may fail.', language: 'javascript', code: 'const results = await Promise.allSettled([loadA(), loadB()]);\nconst successful = results\n  .filter((result) => result.status === "fulfilled")\n  .map((result) => result.value);' },
      { title: 'Compose a promise', description: 'Return a promise from then so the next stage waits for the nested work.', language: 'javascript', code: 'fetchConfig()\n  .then((config) => loadItems(config.endpoint))\n  .then(renderItems)\n  .catch(showError);' },
      { title: 'Add a timeout', description: 'AbortController can cancel APIs that accept an AbortSignal.', language: 'javascript', code: 'const controller = new AbortController();\nconst timeout = setTimeout(() => controller.abort(), 5000);\ntry {\n  await fetch(url, { signal: controller.signal });\n} finally {\n  clearTimeout(timeout);\n}' },
    ],
  },
  {
    slug: 'javascript-fetch-api', title: 'JavaScript Fetch API', description: 'Make HTTP requests with fetch, check response status, send JSON, and cancel requests.', category: 'Web', color: '#f0c94d', tags: ['javascript', 'fetch', 'http', 'api', 'async'], difficulty: 'Intermediate', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'GET JSON', description: 'fetch rejects on network errors, not HTTP error status codes, so check response.ok.', language: 'javascript', code: 'const response = await fetch("/api/items");\nif (!response.ok) throw new Error(`HTTP ${response.status}`);\nconst items = await response.json();' },
      { title: 'POST JSON', description: 'Set the content type and stringify the request body.', language: 'javascript', code: 'const response = await fetch("/api/items", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ name: "notebook" }),\n});' },
      { title: 'Add query parameters', description: 'Use URLSearchParams so query values are encoded correctly.', language: 'javascript', code: 'const url = new URL("/api/search", location.origin);\nurl.searchParams.set("q", "grid layout");\nconst response = await fetch(url);' },
      { title: 'Handle response types', description: 'Choose the response reader that matches the server’s content type.', language: 'javascript', code: 'const response = await fetch("/api/report");\nconst report = response.headers.get("content-type")?.includes("json")\n  ? await response.json()\n  : await response.text();' },
      { title: 'Cancel a request', description: 'Pass an AbortSignal to stop work when a component or operation is no longer needed.', language: 'javascript', code: 'const controller = new AbortController();\nconst request = fetch(url, { signal: controller.signal });\ncontroller.abort();' },
    ],
  },
  {
    slug: 'javascript-date-time', title: 'JavaScript Date & Time', description: 'Create dates, compare timestamps, format for display, and avoid ambiguous date parsing.', category: 'Language', color: '#f0c94d', tags: ['javascript', 'date', 'time', 'timezone', 'intl'], difficulty: 'Intermediate', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Measure elapsed time', description: 'performance.now is monotonic and is a better fit than wall-clock time for durations.', language: 'javascript', code: 'const startedAt = performance.now();\n// Later\nconst elapsedMs = performance.now() - startedAt;' },
      { title: 'Parse an ISO timestamp', description: 'Include a timezone in persisted timestamps to avoid local-time ambiguity.', language: 'javascript', code: 'const instant = new Date("2026-10-27T12:00:00Z");\nconst milliseconds = instant.getTime();' },
      { title: 'Format for a locale', description: 'Intl.DateTimeFormat formats a date for the chosen locale and timezone.', language: 'javascript', code: 'const formatter = new Intl.DateTimeFormat("en-GB", {\n  dateStyle: "medium",\n  timeStyle: "short",\n  timeZone: "UTC",\n});\nformatter.format(new Date());' },
      { title: 'Add a day in UTC', description: 'UTC setters avoid daylight-saving transitions when performing simple calendar arithmetic.', language: 'javascript', code: 'const nextDay = new Date("2026-10-27T00:00:00Z");\nnextDay.setUTCDate(nextDay.getUTCDate() + 1);' },
      { title: 'Compare instants', description: 'Compare numeric timestamps when deciding which instant comes first.', language: 'javascript', code: 'const earlier = new Date(first).getTime() < new Date(second).getTime();' },
    ],
  },
  {
    slug: 'javascript-es-modules', title: 'JavaScript ES Modules', description: 'Export and import JavaScript values with named exports, defaults, and dynamic imports.', category: 'Language', color: '#f0c94d', tags: ['javascript', 'modules', 'import', 'export', 'esm'], difficulty: 'Intermediate', lastReviewed: '2026-10-27',
    snippets: [
      { title: 'Named exports', description: 'Export multiple named values from a module and import exactly the values needed.', language: 'javascript', code: 'export const API_VERSION = "v1";\nexport function formatId(id) {\n  return `id:${id}`;\n}' },
      { title: 'Default export', description: 'Use a default export when a module has one primary value.', language: 'javascript', code: 'export default function createClient(baseUrl) {\n  return { baseUrl };\n}' },
      { title: 'Import values', description: 'Named imports use braces; a default import uses a local name of your choice.', language: 'javascript', code: 'import createClient, { API_VERSION, formatId } from "./client.js";' },
      { title: 'Re-export a public API', description: 'A barrel module can expose selected values while hiding internal file structure.', language: 'javascript', code: 'export { createClient } from "./client.js";\nexport { API_VERSION } from "./constants.js";' },
      { title: 'Load a module on demand', description: 'Dynamic import returns a promise and can defer optional code until it is needed.', language: 'javascript', code: 'const { default: loadEditor } = await import("./editor.js");\nloadEditor();' },
    ],
  },
];

export type PathLevel = 'Beginner' | 'Beginner to Intermediate' | 'Intermediate' | 'Advanced';

export type LearningActivity = {
  title: string;
  content: string;
  practice?: string;
};

export type LearningStep = {
  id: string;
  title: string;
  description: string;
  cheatSheetSlug?: string;
  activity?: LearningActivity;
  exerciseId?: string;
};

export type LearningPath = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  level: PathLevel;
  estimatedMinutes: number;
  objectives: string[];
  prerequisites: string[];
  steps: LearningStep[];
  recommendedTools?: { title: string; href: string; description: string }[];
};

export const learningPaths: LearningPath[] = [
  {
    id: 'path-web-fundamentals', slug: 'web-development-fundamentals', title: 'Web Development Fundamentals', category: 'Web development', level: 'Beginner', estimatedMinutes: 150,
    description: 'Build a practical foundation in the languages and browser concepts behind the web.',
    objectives: ['Structure pages with semantic HTML', 'Style responsive layouts with CSS', 'Use JavaScript to respond to browser events', 'Understand how HTTP APIs connect web applications'], prerequisites: [],
    steps: [
      { id: 'html-fundamentals', title: 'HTML fundamentals', description: 'Build semantic, accessible document structure.', cheatSheetSlug: 'html' },
      { id: 'css-fundamentals', title: 'CSS fundamentals', description: 'Use selectors, the box model, and responsive styles.', cheatSheetSlug: 'css' },
      { id: 'flexbox-and-grid', title: 'Flexbox and Grid', description: 'Choose a layout model and arrange content across screen sizes.', cheatSheetSlug: 'css-flexbox-grid' },
      { id: 'javascript-fundamentals', title: 'JavaScript fundamentals', description: 'Work with values, functions, objects, and modern syntax.', cheatSheetSlug: 'javascript' },
      { id: 'dom-manipulation', title: 'DOM manipulation', description: 'Connect browser events and document updates.', activity: { title: 'Update the page from an event', content: 'Select a button with querySelector, listen for its click event, then update a nearby element’s textContent. Keep the HTML structure in the document and use JavaScript only for the interaction.', practice: 'Try the Counter starter in the Playground and add a reset button.' } },
      { id: 'http-rest-basics', title: 'HTTP and REST API basics', description: 'Understand requests, methods, resources, and response codes.', cheatSheetSlug: 'rest-http', exerciseId: 'http-status' },
    ],
  },
  {
    id: 'path-modern-javascript', slug: 'modern-javascript', title: 'Modern JavaScript', category: 'JavaScript', level: 'Beginner to Intermediate', estimatedMinutes: 210,
    description: 'Move from core language building blocks to asynchronous browser code.',
    objectives: ['Choose appropriate JavaScript data structures', 'Transform collections with array methods', 'Organize modules and functions', 'Handle asynchronous work and failures'], prerequisites: ['Basic familiarity with a terminal and a web browser'],
    steps: [
      { id: 'js-variables-types', title: 'Variables and data types', description: 'Choose declarations and recognize JavaScript’s common value types.', cheatSheetSlug: 'javascript' },
      { id: 'js-arrays-objects', title: 'Arrays and objects', description: 'Represent ordered lists and named properties.', cheatSheetSlug: 'javascript-objects' },
      { id: 'js-functions-scope', title: 'Functions and scope', description: 'Pass values into reusable functions and understand where names are available.', cheatSheetSlug: 'javascript' },
      { id: 'js-array-methods', title: 'Array methods', description: 'Map, filter, find, and reduce collections.', cheatSheetSlug: 'javascript-array-methods', exerciseId: 'array-transform' },
      { id: 'js-es-modules', title: 'ES modules', description: 'Split code into modules with imports and exports.', cheatSheetSlug: 'javascript-es-modules' },
      { id: 'js-promises-async', title: 'Promises and async/await', description: 'Sequence asynchronous work and handle rejected promises.', cheatSheetSlug: 'javascript-promises' },
      { id: 'js-fetch-api', title: 'Fetch API', description: 'Request data and check HTTP response status.', cheatSheetSlug: 'javascript-fetch-api' },
      { id: 'js-error-handling', title: 'Error handling', description: 'Keep failures visible and recover with focused handling.', activity: { title: 'Handle a rejected request', content: 'Wrap an awaited fetch call in try/catch, check response.ok before parsing its body, and show a useful message while keeping the original error available for debugging.', practice: 'Use a deliberately invalid URL in a small fetch example and show a friendly fallback.' } },
    ],
    recommendedTools: [{ title: 'Regex Tester', href: '/tools/regex-tester', description: 'Try a pattern against sample strings.' }],
  },
  {
    id: 'path-react-developer', slug: 'react-developer', title: 'React Developer', category: 'Frontend', level: 'Intermediate', estimatedMinutes: 240,
    description: 'Learn component-based interfaces, state, events, and application data flow.',
    objectives: ['Build interfaces from reusable components', 'Model interactive UI with props and state', 'Connect forms and APIs', 'Choose a routing and state-management approach'], prerequisites: ['Comfort with JavaScript functions, arrays, objects, and modules'],
    steps: [
      { id: 'react-js-prerequisites', title: 'JavaScript prerequisites', description: 'Review the language patterns used most often in React code.', cheatSheetSlug: 'javascript' },
      { id: 'react-components-jsx', title: 'Components and JSX', description: 'Describe reusable UI with React components.', cheatSheetSlug: 'react' },
      { id: 'react-props-state', title: 'Props and state', description: 'Pass data into components and update interactive state.', cheatSheetSlug: 'react' },
      { id: 'react-hooks', title: 'Hooks', description: 'Use state and effects in function components.', cheatSheetSlug: 'react' },
      { id: 'react-forms-events', title: 'Forms and events', description: 'Handle input and submit events with controlled state.', activity: { title: 'Build a controlled form', content: 'Store an input value in component state, update it from onChange, and handle submission with onSubmit. Associate a visible label with each field.', practice: 'Add an inline validation message that updates as the user types.' } },
      { id: 'react-routing', title: 'Routing with Next.js', description: 'Connect pages using the App Router file and link conventions.', activity: { title: 'Trace a route in Next.js', content: 'In the App Router, a folder containing page.tsx defines a route segment. Use next/link for in-app navigation and dynamic route folders such as [slug] for a changing segment.', practice: 'Find the dynamic cheat-sheet route in this project and identify how its slug is read.' } },
      { id: 'react-api-integration', title: 'API integration', description: 'Load remote data, check failures, and represent loading states.', cheatSheetSlug: 'javascript-fetch-api' },
      { id: 'react-redux-toolkit', title: 'State management with Redux Toolkit', description: 'Organize shared state with a store and slices.', cheatSheetSlug: 'redux-toolkit' },
    ],
  },
  {
    id: 'path-node-backend', slug: 'backend-development-nodejs', title: 'Backend Development with Node.js', category: 'Backend', level: 'Intermediate', estimatedMinutes: 260,
    description: 'Follow a request from a Node.js server through validation, persistence, and tests.',
    objectives: ['Run and configure Node.js applications', 'Design predictable HTTP endpoints', 'Validate input and handle failures', 'Understand persistence and API testing'], prerequisites: ['Basic JavaScript and command-line familiarity'],
    steps: [
      { id: 'node-fundamentals', title: 'Node.js fundamentals', description: 'Use modules, environment variables, and server-side APIs.', cheatSheetSlug: 'nodejs' },
      { id: 'npm-packages', title: 'npm and package management', description: 'Install dependencies and define repeatable scripts.', cheatSheetSlug: 'npm' },
      { id: 'expressjs', title: 'Express.js', description: 'Build routes and middleware with Express.', cheatSheetSlug: 'expressjs' },
      { id: 'rest-api-design', title: 'REST API design', description: 'Model resources with HTTP methods and status codes.', cheatSheetSlug: 'rest-http', exerciseId: 'http-status' },
      { id: 'request-validation-errors', title: 'Request validation and error handling', description: 'Reject invalid input and return consistent errors.', activity: { title: 'Validate a create request', content: 'Check required fields and their expected types before using request data. Return a 400 response for invalid client input, and keep unexpected server failures separate from validation errors.', practice: 'Write down the response shape for one invalid request and one unexpected failure.' } },
      { id: 'authentication-concepts', title: 'Authentication concepts', description: 'Distinguish identity, permissions, sessions, and credentials.', activity: { title: 'Choose a safe authentication boundary', content: 'Authentication establishes who a caller is; authorization decides what that caller may do. Store password verifiers rather than plaintext passwords, and keep secrets in environment configuration.', practice: 'List which endpoints in a sample notes API should require an authenticated user.' } },
      { id: 'sql-databases', title: 'SQL and database fundamentals', description: 'Read relational data and connect rows with keys.', cheatSheetSlug: 'sql', exerciseId: 'sql-join' },
      { id: 'testing-apis', title: 'Testing APIs', description: 'Check expected responses and failure behavior with repeatable requests.', activity: { title: 'Plan an API test', content: 'For each endpoint, cover a successful request, invalid input, a missing resource, and an unexpected dependency failure. Assert status codes and stable response fields.', practice: 'Use curl to send one valid and one invalid JSON request to a local endpoint.' } },
    ],
  },
  {
    id: 'path-database-essentials', slug: 'database-essentials', title: 'Database Essentials', category: 'Databases', level: 'Beginner to Intermediate', estimatedMinutes: 220,
    description: 'Query relational databases and get started with document data in MongoDB.',
    objectives: ['Write and filter SQL queries', 'Combine and summarize relational data', 'Understand indexes and transactions', 'Perform MongoDB CRUD and aggregation'], prerequisites: ['No database experience required'],
    steps: [
      { id: 'sql-fundamentals', title: 'SQL fundamentals', description: 'Understand tables, rows, columns, and query structure.', cheatSheetSlug: 'sql' },
      { id: 'sql-select-where-order', title: 'SELECT, WHERE, ORDER BY', description: 'Choose fields, filter rows, and sort query results.', cheatSheetSlug: 'sql' },
      { id: 'sql-joins', title: 'JOIN operations', description: 'Combine related records through key relationships.', cheatSheetSlug: 'sql', exerciseId: 'sql-join' },
      { id: 'sql-aggregations', title: 'Aggregations', description: 'Group rows and calculate useful summaries.', cheatSheetSlug: 'sql' },
      { id: 'indexes-transactions', title: 'Indexes and transactions', description: 'Speed up selected queries and keep related writes consistent.', cheatSheetSlug: 'postgresql' },
      { id: 'postgresql', title: 'PostgreSQL', description: 'Use PostgreSQL-specific query and transaction features.', cheatSheetSlug: 'postgresql' },
      { id: 'mongodb-crud', title: 'MongoDB CRUD', description: 'Create, read, update, and delete documents.', cheatSheetSlug: 'mongodb' },
      { id: 'mongodb-aggregation', title: 'MongoDB aggregation', description: 'Process documents through an aggregation pipeline.', cheatSheetSlug: 'mongodb' },
    ],
  },
  {
    id: 'path-git-workflow', slug: 'git-developer-workflow', title: 'Git and Developer Workflow', category: 'Workflow', level: 'Beginner', estimatedMinutes: 180,
    description: 'Build a reliable daily workflow for version control and project configuration.',
    objectives: ['Track changes with Git', 'Work safely across branches', 'Review and resolve conflicts', 'Automate common project tasks'], prerequisites: [],
    steps: [
      { id: 'git-fundamentals', title: 'Git fundamentals', description: 'Inspect a working tree and make a focused commit.', cheatSheetSlug: 'git' },
      { id: 'repository-setup', title: 'Repository setup', description: 'Initialize a project and connect it to a remote repository.', cheatSheetSlug: 'git' },
      { id: 'branches-merges', title: 'Branches and merges', description: 'Isolate changes and bring completed work together.', cheatSheetSlug: 'git', exerciseId: 'git-command' },
      { id: 'commits-history', title: 'Commits and history', description: 'Write useful commit messages and inspect previous changes.', cheatSheetSlug: 'git' },
      { id: 'conflict-resolution', title: 'Conflict resolution', description: 'Resolve overlapping changes and verify the result.', activity: { title: 'Resolve a merge conflict', content: 'Inspect each conflict marker, choose or combine the intended lines, remove all markers, then run the relevant checks before staging the resolved file.', practice: 'Explain why blindly choosing “ours” or “theirs” can discard valid work.' } },
      { id: 'github-workflow', title: 'GitHub workflow', description: 'Share branches and collaborate through review.', activity: { title: 'Prepare a pull request', content: 'Push a focused branch, describe what changed and why, link related work, and include how you verified it. Respond to review comments with a follow-up commit.', practice: 'Draft a three-line pull request summary for a small bug fix.' } },
      { id: 'npm-scripts', title: 'npm scripts', description: 'Turn common project commands into repeatable scripts.', cheatSheetSlug: 'npm' },
      { id: 'environment-config', title: 'Environment variables and project configuration', description: 'Keep environment-specific values outside committed source.', cheatSheetSlug: 'nodejs' },
    ],
  },
  {
    id: 'path-docker-devops', slug: 'docker-devops-fundamentals', title: 'Docker and DevOps Fundamentals', category: 'DevOps', level: 'Intermediate', estimatedMinutes: 250,
    description: 'Go from shell basics to containers and an introduction to Kubernetes.',
    objectives: ['Navigate Linux environments', 'Build and run containers', 'Connect services with persistent data', 'Inspect basic Kubernetes resources'], prerequisites: ['Command-line basics are helpful'],
    steps: [
      { id: 'linux-cli', title: 'Linux command-line basics', description: 'Navigate files, inspect processes, and read logs.', cheatSheetSlug: 'linux-commands' },
      { id: 'devops-environment', title: 'Environment variables', description: 'Configure applications without baking secrets into images.', cheatSheetSlug: 'nodejs' },
      { id: 'docker-fundamentals', title: 'Docker fundamentals', description: 'Build images and run isolated containers.', cheatSheetSlug: 'docker', exerciseId: 'docker-command' },
      { id: 'dockerfiles', title: 'Dockerfiles', description: 'Describe how to build a repeatable application image.', activity: { title: 'Sketch a Dockerfile', content: 'Choose a base image, set an application working directory, copy dependency manifests before source when practical, install dependencies, expose the app port, and define the start command.', practice: 'Write the build steps for a small Node.js app without copying local secrets into the image.' } },
      { id: 'docker-compose', title: 'Docker Compose', description: 'Describe and start a local multi-service stack.', cheatSheetSlug: 'docker-compose' },
      { id: 'docker-network-volumes', title: 'Networking and volumes', description: 'Connect services and persist data beyond a container lifecycle.', activity: { title: 'Connect an app and database', content: 'Place both services on a Compose network and connect using the database service name. Mount a named volume at the database data directory so removing the container does not remove its stored data.', practice: 'Explain why localhost inside a container refers to that container itself.' } },
      { id: 'kubernetes-fundamentals', title: 'Kubernetes fundamentals', description: 'Understand clusters, deployments, pods, and services.', cheatSheetSlug: 'kubernetes-kubectl' },
      { id: 'kubectl-basics', title: 'kubectl basics', description: 'Inspect resources, apply manifests, and follow rollouts.', cheatSheetSlug: 'kubernetes-kubectl', exerciseId: 'kubectl-command' },
    ],
  },
];

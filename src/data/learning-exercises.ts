export type MultipleChoiceExercise = {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
};

export const learningExercises: MultipleChoiceExercise[] = [
  { id: 'http-status', question: 'Which HTTP status is the usual response when a request successfully creates a resource?', options: ['200 OK', '201 Created', '204 No Content', '404 Not Found'], correctOption: 1, explanation: '201 Created indicates that the request succeeded and created a resource. The response can include a Location header for the new resource.' },
  { id: 'array-transform', question: 'Which array method creates a new array by transforming every item?', options: ['filter()', 'find()', 'map()', 'some()'], correctOption: 2, explanation: 'map() calls a transformation for each item and returns a new array containing those results.' },
  { id: 'sql-join', question: 'Which JOIN keeps every row from the left table, even when there is no matching row on the right?', options: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'SELF JOIN'], correctOption: 1, explanation: 'LEFT JOIN keeps all left-side rows and fills right-side columns with NULL when no match exists.' },
  { id: 'git-command', question: 'Which command creates and switches to a new Git branch named feature/search?', options: ['git branch feature/search', 'git switch -c feature/search', 'git merge feature/search', 'git log feature/search'], correctOption: 1, explanation: 'git switch -c creates a new branch and checks it out in one command.' },
  { id: 'docker-command', question: 'Which command runs an image named web-demo and maps host port 8080 to container port 80?', options: ['docker build -p 8080:80 web-demo', 'docker run -p 8080:80 web-demo', 'docker ps -p 8080:80 web-demo', 'docker compose -p 8080:80 web-demo'], correctOption: 1, explanation: 'docker run starts a container. Its -p host:container option publishes a container port on the host.' },
  { id: 'kubectl-command', question: 'Which kubectl command lists pods in the current namespace?', options: ['kubectl get pods', 'kubectl run pods', 'kubectl apply pods', 'kubectl logs pods'], correctOption: 0, explanation: 'kubectl get pods reads and lists Pod resources in the current namespace.' },
];

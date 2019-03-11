export const createTask = ({ id, taskName, idOfList, status, worker }) => post(
  `http://localhost:3001/tasks/new`,
  {
    id,
    taskName,
    idOfList,
    status,
    worker
  }
).then(toJSON);

export const changeTitle = ({ taskName, id }) => post(
  `http://localhost:3001/tasks/edittasktitle`,
  { taskName, id }
).then(toJSON);

export const fetchTasks = () => fetch(`http://localhost:3001/tasks/all`)
  .then(toJSON);

export const changeWorker = ({ worker, id }) => post(
  `http://localhost:3001/tasks/editworker`,
  { worker, id }
).then(toJSON);

export const changeStatus = ({ status, id }) => post(
  'http://localhost:3001/tasks/edittasktitle',
  { status, id }
).then(toJSON);

const post = (url, body, additionalConfig = {}) => fetch(url, {
  method: 'POST',
  ...additionalConfig,
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
    ...additionalConfig.headers
  }
});

export const removeTask = ({ taskId }) => post(
  'http://localhost:3001/tasks/removetask',
  { taskId }
).then(toJSON);

export const toJSON = response => response.json();
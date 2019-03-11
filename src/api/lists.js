export const addLists = ({id, title, owner, day, month, year}) => post(
    `http://localhost:3001/lists/new`,
    { id, title, owner, day, month, year }
  )
.then(toJSON);

export const removeList = ({ id }) => post(
    `http://localhost:3001/lists/remove`,
    { id }
  )
.then(toJSON)

export const changeTitle = ({id, title}) => post(
    `http://localhost:3001/lists/edittitle`,
    { id, title }
  )
.then(toJSON)

const post = (url, body, additionalConfig = {}) => fetch(url, {
    method: 'POST',
    ...additionalConfig,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...additionalConfig.headers
    }
  });
  
  export const fetchLists = () => fetch(`http://localhost:3001/lists/all`)
  .then(toJSON);

  export const toJSON = response => response.json();
 
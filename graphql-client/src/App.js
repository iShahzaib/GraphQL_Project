import React, { useEffect, useState } from 'react';

// This code fetches user data from a GraphQL endpoint and displays it in a list format.
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          {
            getUsers {
              _id
              name
              email
            }
          }
        `
      })
    })
      .then(res => res.json())
      .then(data => setUsers(data.data.getUsers))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.name} ({u.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
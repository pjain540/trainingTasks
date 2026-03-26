import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2>Use Effect Hook</h2>
      <h3>Users</h3>
      <p>Here call the api using useEffect hook</p>
      <div style={{display:'flex',gap:10}}>
      {users.map(user => (
            <p key={user.id} style={{fontStyle:'italic'}}>{user.name},</p> 
        ))}
        </div>
    </div>
  );
}

export default Users;
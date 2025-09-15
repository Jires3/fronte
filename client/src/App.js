import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// For production, we'll use an environment variable.
// For local development, the 'proxy' in package.json will handle requests.
const API_URL = process.env.REACT_APP_API_URL || '';

function App() {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');

  // Function to fetch all users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to handle adding a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUserName.trim()) return;
    try {
      await axios.post(`${API_URL}/api/users`, { name: newUserName });
      setNewUserName(''); // Clear the input field
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Users List</h1>
        <div className="user-form">
          <form onSubmit={handleAddUser}>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Enter a new user name"
            />
            <button type="submit">Add User</button>
          </form>
        </div>
        <div className="user-list">
          <h2>Current Users:</h2>
          <ul>
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user.id}>{user.id}: {user.name}</li>
              ))
            ) : (
              <p>No users found. Add one!</p>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
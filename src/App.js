import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get('https://66323d2dc51e14d69563d028.mockapi.io/api/v1/profile')
      .then(response => {setUsers(response.data);})
      .catch(error => {console.error('Error fetching users:', error);});
  }, []);

  const handleUserClick = (userId) => {
    axios.get(`https://66323d2dc51e14d69563d028.mockapi.io/api/v1/profile/${userId}`)
      .then(response => {setSelectedUser(response.data);})
      .catch(error => {console.error('Error fetching user details:', error);});};
      
  return (
    <div className="App">
      <div className="sidebar">
        <h2>User List</h2>
        <ul>
          {users.map(user => (
            <li key={user.id} onClick={() => handleUserClick(user.id)}>
              {user.firstName}
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        {selectedUser ? (
          <div className="user-details">
            <img src={selectedUser.avatar} alt={selectedUser.firstName} className="user-image" />
            <h2>{selectedUser.firstName}</h2>
            <p>City: {selectedUser.city}</p>
            <p>Country: {selectedUser.country}</p>
          </div>
        ) : (
          <p>Select a user to see details</p>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './userSlice';

function App() {
  const [username, setUsername] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchUser(username));
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search User</button>
      {user.status === 'loading' && <p>Loading...</p>}
      {user.status === 'succeeded' && (
        <div>
          <h1>{user.name}</h1>
          <p>{user.username}</p>
          <p>Followers: {user.followers}</p>
          <p>Public Repos: {user.publicRepos}</p>
          <img src={user.avatarUrl} alt="User Avatar" />
        </div>
      )}
      {user.status === 'failed' && <p>Error: {user.error}</p>}
    </div>
  );
}

export default App;
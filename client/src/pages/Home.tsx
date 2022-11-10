import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [welcomeMsg, setWelcomeMsg] = useState<string>('');

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/start');
      setWelcomeMsg(res.data.msg);
    })();
  }, []);

  return (
    <div className="App-header">
      <h1>Welcome to Leroy Dyson</h1>
      <p>{welcomeMsg}</p>
    </div>
  );
};

export default Home;

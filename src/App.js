import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import logo from './logo.svg';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todo);
  console.log(state)

  React.useState(async () => {
    const initialData = await axios({
      method: 'get',
      url: 'https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list'
    });
    dispatch({
      type: 'FETCH_TODO',
      payload: initialData.data
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import ChatContainer from './components/Chat/ChatContainer';
import Join from './components/Join/Join';
import reducer from './reducer';
//import socket from './socket';
import axios from 'axios';
import {Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {<Join/>}
      <Route path="/chat"
        render={ () => <ChatContainer /> }/>
    </div>
  );
}

export default App;

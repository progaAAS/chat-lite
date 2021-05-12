import React from 'react';
import './App.css';
import Chat from './components/Join/Chat';
import Join from './components/Join/Join';
import reducer from './reducer';
import socket from './socket';
import axios from 'axios';

function App() {

  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  });
  
  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    });
    socket.emit('ROOM:JOIN', obj); // отправка сокет на backend
    const { data } =  await axios.get(`/rooms/${obj.roomId}`); // get-запрос получаю всех пользователей и все сообщения, аналог промису then, в данном случае инфа содержится в { data } 
    dispatch({
      type: 'SET_DATA',
      payload: data
    })
}

const setUsers = (users) => {
  dispatch({
    type: 'SET_USERS',
    payload: users
  });
}

const addMessage = (message) => {
  dispatch({
    type: 'NEW_MESSAGE',
    payload: message
  });
}

  React.useEffect(() =>{
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, [])


  window.socket = socket;
  console.log(state);

  return (
    <div className="App">
      {!state.joined ? <Join onLogin={onLogin}/>: <Chat {...state} onAddMessage={addMessage}/>}
    </div>
  );
}

export default App;

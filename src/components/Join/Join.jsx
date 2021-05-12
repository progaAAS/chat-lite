import axios from 'axios';
import React from 'react';

const Join = (props) => {
  debugger

    const[roomId, setRoomId] = React.useState("");
    const[userName, setUserName] = React.useState("");
    const[isLoading, setLoading] = React.useState(false);

    const onEnter = async () => {
      console.log("onEnter");
        if(!roomId || !userName){
            return alert("Неверные данные")
        }
        const obj = {roomId, userName}
        setLoading(true);
        await axios.post('/rooms', obj)
        props.onLogin(obj);
   }

    return <div className="join-block">
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ваше имя"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button disabled={isLoading} onClick={onEnter} className="btn btn-success">
        {isLoading ? 'Вход' : 'Войти'}
      </button>
    </div>

}

export default Join;
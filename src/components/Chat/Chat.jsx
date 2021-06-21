import React from 'react';
import { Field, reduxForm } from 'redux-form';

  let AddNewMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name="text" component={"textarea"} placeholder={"Post message"}/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>;
}

let AddNewMessageFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewMessageForm);
  
const Chat = ({ roomId, users, AddMessageCreate, messages, userName, setYourSelfMessageDataCreator}) => {
  debugger
  let onAddMessage = (values) => {
    AddMessageCreate(roomId, userName, values.text);
}
debugger
  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <b>{roomId}</b>
        <hr />
        { <b>Онлайн:{users.length}</b> }
        <ul>
        {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div className="messages">
           {messages.map((message) =>(
            <div className="message">
            <p>{message.text}</p>
            <div>
              <span>{message.userName}</span>
            </div>
          </div>
          ))} 
        </div>
          <AddNewMessageFormRedux onSubmit={onAddMessage}/>
      </div>
    </div>
  );
}

export default Chat;
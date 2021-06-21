import React from 'react';
//import socket from '../../socket';
import {setUsers, setMessageDataCreator, AddMessageCreate, setYourSelfMessageDataCreator} from"../../redux/join-page";
import Chat from './Chat';
import {connect} from "react-redux";
import socket from '../../socket';

class ChatContainer extends React.Component {

  componentDidMount() {
    socket.on("ROOM:SET_USERS", user => {this.props.setUsers(user)}); // уведомление всех пользователей о новом пользователе
    socket.on("ROOM:NEW_MESSAGE", obj => {this.props.setMessageDataCreator(obj)});
    
  }

  render() {
    debugger
      return (
          <Chat roomId={this.props.roomId} 
          users={this.props.users} 
          userName={this.props.userName} 
          AddMessageCreate={this.props.AddMessageCreate} 
          messages={this.props.messages}
          setYourSelfMessageDataCreator={this.props.setYourSelfMessageDataCreator}/>
      )
  }
}

let mapStateToProps = (state) => ({
  roomId: state.joinPage.roomId,
  users: state.joinPage.users,
  messages: state.joinPage.messages,
  userName: state.joinPage.userName
});

export default 
  connect(mapStateToProps, {setUsers, AddMessageCreate, setMessageDataCreator, setYourSelfMessageDataCreator})(ChatContainer);
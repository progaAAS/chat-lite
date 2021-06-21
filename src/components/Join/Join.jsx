import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {onEnter} from "../../redux/join-page";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const JoinForm = (props) => {
  
    return <div className="join-block">
      <form onSubmit={props.handleSubmit}>
        <Field placeholder="Room ID" name={"roomId"} component={"input"}/>  
        <Field placeholder="Ваше имя" name={"userName"} component={"input"}/>
        <button className="btn btn-success">Вход</button>
      </form>
    </div>

}

const JoinReduxForm = reduxForm({form: 'join'})(JoinForm)

const Join = (props) => {

  const onSubmit = (formData) => {
    debugger
    props.onEnter(formData.userName, formData.roomId);
  }
  console.log(props.joined);
  console.log(props.userName);
  console.log(props.roomId);
  
  if (props.joined){
    return <Redirect to={"/chat"} />
  }

  return<div>
    <h1>JoinForm</h1>
    <JoinReduxForm onSubmit={onSubmit}/>
  </div>
}

const mapStateToProps = (state) => ({
  joined: state.joinPage.joined
})

export default connect(mapStateToProps, {onEnter} )(Join);

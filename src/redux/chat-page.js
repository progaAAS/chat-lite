import axios from 'axios';
import socket from "../socket"

const SET_MESSAGE_DATA = 'SET_MESSAGE_DATA';

let initialState = {
   joined: false,
   userName: null,
   roomId: null,
   users: []
};

const chatReducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_MESSAGE_DATA:{
            return{
                ...state,
                userName: action.payload.userName,
                text: action.payload.text
                };
            }
        default:
            return state;
    }
}


export const setMessageDataCreator = (data) => ({type: SET_MESSAGE_DATA, payload: data })

export const AddMessageCreate = (roomId, userName, newPostText) => async (dispatch) => {
    socket.emit('ROOM:NEW_MESSAGE', {
        userName,
        roomId,
        text: newPostText,
      });
}


export default chatReducer;
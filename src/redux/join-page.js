import axios from 'axios';
import socket from "../socket"

const JOINED = 'JOINED';
const SET_DATA = 'SET_DATA';
const SET_USERS = 'SET_USERS';
const NEW_MESSAGE = 'NEW_MESSAGE';

let initialState = {
   joined: false,
   userName: null,
   roomId: null,
   users: [],
   messages: []
};

const joinReducer = (state = initialState, action) => {

    switch(action.type) {
        case JOINED: {
            debugger
            return { 
                ...state,
                ...action.payload
                // joined: true,
                // userName: action.payload.userName,
                // roomId: action.payload.roomId
            }
        }
        case SET_DATA:{
            debugger
        return{
            ...state,
            users: action.payload.users,
            messages: action.payload.messages
            };
        }
        case SET_USERS:{
            debugger
            return{
                ...state,
                users: action.payload
            };
        }
        case NEW_MESSAGE:{
            debugger
            return{
                 ...state, 
                 messages: [...state.messages, action.payload]
                };
            }
        default:
            return state;
    }
}

export const joinCreator = (userName, roomId, joined) => ({type: JOINED, payload: {userName, roomId, joined} })
export const setDataCreator = (data) => ({type: SET_DATA, payload: data })
export const setUsers = (users) => ({type: SET_USERS, payload: users })
export const setMessageDataCreator = (data) => ({type: NEW_MESSAGE, payload: data })
export const setYourSelfMessageDataCreator = (userName, text) => ({type: NEW_MESSAGE, payload: {userName, text}})

export const AddMessageCreate = (roomId, userName, newPostText) => async (dispatch) => {
    socket.emit('ROOM:NEW_MESSAGE', {
        userName,
        roomId,
        text: newPostText,
      });
      dispatch(setMessageDataCreator({userName, roomId, text: newPostText}));
      //dispatch(setUsers(userName));
}

export const getDataCreator = (obj) => async (dispatch) => {
    const { data } =  await axios.get(`/rooms/${obj.roomId}`); // get-запрос получаю всех пользователей и все сообщения, аналог промису then, в данном случае инфа содержится в { data }
    dispatch(setDataCreator(data))
}

export const onEnter = (userName, roomId) => async (dispatch) => {
    await axios.post('/rooms', {userName, roomId});
    dispatch(joinCreator(userName, roomId, true));
    socket.emit('ROOM:JOIN', {userName, roomId});
    dispatch(getDataCreator({userName, roomId}));

}

export default joinReducer;
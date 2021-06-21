import {applyMiddleware, combineReducers, createStore} from "redux";
import joinReducer from "./join-page";
import chatReducer from "./chat-page"
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
    joinPage: joinReducer,
    chatPage: chatReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;


export default store;
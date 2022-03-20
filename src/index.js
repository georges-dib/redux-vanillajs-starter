import store from "./store";
import * as actions from './actionTypes';
import { addBug, resolveBug } from "./actionCreator";

//subscribing to the store changes, every time the store changes, this function
//will run. When using Redux without React, this is where we change the DOM
//elements to reflect the updated state values.
const unsubscribe = store.subscribe(()=>{
    console.log("Store changed: ", store.getState());
});

store.dispatch({
    type: actions.ADD_BUG,
    payload: {
        title: "My first bug"
    }
});
store.dispatch(addBug("My second bug"));     //much simpler approach, using an action creator function

unsubscribe();      //unsubscribe from the store, generally used when navigating away from a page to avoid memory leaks

store.dispatch({
    type: actions.REMOVE_BUG,
    payload: {
        id: 1
    }
});

store.dispatch(resolveBug(2));

console.log(store.getState());
import * as actions from './actionTypes';

export const addBug = title => ({
    type: actions.ADD_BUG,
    payload: {
        // title: title
        title   //this notation is the same as the commented line, but in JS, 
                //this short notation can be used when the key and the value have the same name
    }
});

export const resolveBug = id => ({
    type: actions.RESOLVE_BUG,
    payload: {
        id
    }
})
import produce from 'immer';
import * as actions from './actionTypes';

//implement the reducer function that is called everytime the store dispatches a state update.
//the intial value of the state needs to be passed as default value or would be undefined.
const reducer = (state={}, action) => {
    switch(action.type) {
        case actions.ADD_BUG:
            //shallow copying the state, then shallow copying the bugs array in the state before
            //adding the new bug object. This is not a recommended way, better create a custom
            //deep copy function or use a third party library, 
            //(recommendation: rfdc - https://github.com/davidmarkclements/rfdc)
            return {...state, 
                latestCreatedId: ++state.latestCreatedId || 1,
                bugs:[...state.bugs || [], 
                    {
                        id: state.latestCreatedId || 1,
                        title: action.payload.title,
                        isResolved: false
                    }
                ]
            };
        case actions.REMOVE_BUG:
            return {...state, bugs: state.bugs.filter(bug=>bug.id !== action.payload.id)}

        // case actions.RESOLVE_BUG:
        //     return {
        //         ...state,
        //         //copying the bugs array, and when finding the id to resolve, return a new 
        //         //copied object with the updated property
        //         bugs: state.bugs.map(bug=>{
        //             return bug.id === action.payload.id ? {...bug, isResolved: true} : bug;
        //         })
        //     }
        case actions.RESOLVE_BUG:
            //same as the commented code above, but using Immer to ensure immutability instead
            //of manually copying the state object
            return produce(state, newState => {
                newState.bugs.map(bug=>{
                    bug.isResolved = bug.id === action.payload.id ? true : bug.isResolved;
                });
            });
        default:
            return state;
    }
}

export default reducer;
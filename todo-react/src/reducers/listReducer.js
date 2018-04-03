import initialState from './initialState';
import {FETCH_LIST, RECEIVE_LIST, CREATE_TODO_SUCCESS} from '../actions/allActions';

export default function list(state = initialState.list, action) {
    let newState;
    switch(action.type) {
        case FETCH_LIST:
            console.log('fetching.....');
            return action;
        case RECEIVE_LIST:
            newState = action.list;
            console.log("receving....")
            return newState;
        case CREATE_TODO_SUCCESS:
            return [
              ...state,
              Object.assign({}, action.todo)
            ];
        default:
            return state;
    }
}


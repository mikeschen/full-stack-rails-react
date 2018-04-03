import * as allActions from './allActions';
import axios from 'axios';

export function receiveList(data) {
    return {type: allActions.RECEIVE_LIST, list: data}
}

export function fetchList() {
    return (dispatch) => {
        axios.get('http://localhost:3000/todos', {crossdomain: true}) 
        .then(response => {
          console.log("da data", response.data)
          dispatch(receiveList(response.data))
        })
    }
}
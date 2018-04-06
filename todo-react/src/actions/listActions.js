import * as allActions from './allActions';
import axios from 'axios';

export function receiveList(list) {
    console.log("listz 🤝", list)
    return {type: allActions.RECEIVE_LIST, list}
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

export function postTodo(todo){
    return (dispatch) => {
      axios.post('http://localhost:3000/todos',
      {
        title: todo,
        created_by: 1
      }
    )
        .then(response => {
          console.log("postin 😇", response.data)
          dispatch(createTodoSuccess(response.data))
        })
        .catch(error => {
          throw(error);
        })
      };
  };

  export function createTodoSuccess (todo) {
    return {type: allActions.CREATE_TODO_SUCCESS, todo}
  };

  export function deleteTodo(todoId){
    return (dispatch) => {
      return axios.delete('http://localhost:3000/todos/' +todoId)
        .then(response => {
          dispatch(deleteTodoSuccess(todoId));
        })
        .catch(error => {
          throw(error);
        });
    };
  };

  export function deleteTodoSuccess(todoId) {
    return {type: allActions.DELETE_TODO_SUCCESS, todoId}
  }


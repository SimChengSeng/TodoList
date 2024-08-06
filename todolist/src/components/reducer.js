export const initialState = {
    todos: []
  };
  
  export const actionTypes = {
    SET_TODOS: 'SET_TODOS',
    ADD_TODO: 'ADD_TODO',
    EDIT_TODO: 'EDIT_TODO',
    DELETE_TODO: 'DELETE_TODO'
  };
  
  export const reducer = (state, action) => {

    console.log('Action received:', action);
  
    switch (action.type) {
      case actionTypes.SET_TODOS:
        return { ...state, todos: action.payload };
      case actionTypes.ADD_TODO:
        return { ...state, todos: [...state.todos, action.payload] };
      case actionTypes.EDIT_TODO:
        return { ...state, todos: state.todos.map(todo => todo._id === action.payload._id ? action.payload : todo) };
      case actionTypes.DELETE_TODO:
        return { ...state, todos: state.todos.filter(todo => todo._id !== action.payload) };
      default:
        return state;
    }
  };
  
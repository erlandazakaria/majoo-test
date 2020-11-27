const initialState = [];

const todoReducer = (state=initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "FETCH_TODO":
      return payload;
    case "ADD_TODO":
      return [...state, payload];
    case "DELETE_TODO":
      return state.filter(s => s.id !== payload);
    case "UPDATE_TODO":
      let newState = state.map(ns => {
        if(ns.id ===payload.id) {
          return {
            ...ns,
            title: payload.title,
            description: payload.description,
            status: payload.status
          }
        } else {
          return ns
        }
      })
      return newState
    default:
      return state;
  }
};

export default todoReducer;
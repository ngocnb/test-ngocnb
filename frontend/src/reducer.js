const initialState = {
  currentUser: localStorage.getItem("currentUser") || {},
  token: localStorage.getItem("token") || null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setCurrentUser":
      return { ...state, currentUser: action.value };
    case "setToken":
      return { ...state, token: action.value };
    default:
      return state;
  }
};

const setCurrentUser = (user) => {
  return {
    type: "setCurrentUser",
    value: user,
  };
};

const setToken = (token) => {
  return {
    type: "setToken",
    value: token,
  };
};

export { reducer, setCurrentUser, setToken };

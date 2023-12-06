const appReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE-LANGUAGE": {
      return {
        ...state,
        language: action.payload,
      };
    }
    case "CHANGE-THEME": {
      return {
        ...state,
        theme: action.payload,
      };
    }
    case "TOGGLE-SIDEBAR": {
      return {
        ...state,
        showSidebar:!state.showSidebar,
      };
    }
    default:
      return state;
  }
};

export default appReducer;

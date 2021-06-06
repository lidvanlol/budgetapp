const jwtReducer = (state = '', action) => {
  switch (action.type) {
    case 'ADD_JWT':
      return (state = action.payload);
    case 'REMOVE_JWT':
      return (state = '');
    default:
      return state;
  }
};

export default jwtReducer;

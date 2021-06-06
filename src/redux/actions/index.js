export const addJWT = jwt => {
  return {
    type: 'ADD_JWT',
    payload: jwt,
  };
};

export const removeJWT = () => {
  return {
    type: 'REMOVE_JWT',
  };
};

export const SET_AUTH_USER = 'SET_AUTH_USER';

export function setAuthUser(id) {
  return {
    type: SET_AUTH_USER,
    id
  };
}

export function handleSetAuthUser(user) {
  return (dispatch) => {
      dispatch(setAuthUser(user))
  }
}
import actionTypes from 'src/constants/actionTypes';
import foosService from 'src/services/foos';

export function find(id) { // eslint-disable-line import/prefer-default-export
  return (dispatch) => {
    dispatch({ type : actionTypes.FIND_FOO_START });

    return foosService
      .find(id)
      .then(({ foo }) => {
        dispatch({
          type    : actionTypes.FIND_FOO_SUCCESS,
          payload : { foo },
        });
      })
      .catch((error) => {
        dispatch({
          type    : actionTypes.FIND_FOO_FAILURE,
          payload : { error },
        });
      });
  };
}

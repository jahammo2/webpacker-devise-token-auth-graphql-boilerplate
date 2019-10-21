import actionTypes from 'src/constants/actionTypes';
import authenticationService from 'src/services/authentication';

function handleCommonAuthAction(actionPrefix, serviceAction, credentials) {
  return (dispatch) => {
    dispatch({ type : actionTypes[`${actionPrefix}_START`] });

    return authenticationService[serviceAction](credentials)
      .then(userInfo => dispatch({
        type    : actionTypes[`${actionPrefix}_SUCCESS`],
        payload : { userInfo },
      }))
      .catch(errors => dispatch({
        type    : actionTypes[`${actionPrefix}_FAILURE`],
        payload : { errors },
      }));
  };
}

export function clearTempAuthState() {
  return { type : actionTypes.CLEAR_TEMP_AUTH_STATE };
}

export function recoverPassword(credentials) {
  return handleCommonAuthAction('RECOVER_PASSWORD', 'recoverPassword', credentials);
}

export function resetPassword(credentials) {
  return handleCommonAuthAction('RESET_PASSWORD', 'resetPassword', credentials);
}

export function signOut(headers) {
  return (dispatch) => {
    dispatch({ type : actionTypes.SIGN_OUT });

    return authenticationService.signOut(headers);
  };
}

export function signIn(credentials) {
  return handleCommonAuthAction('SIGN_IN', 'signIn', credentials);
}

export function signUp(credentials) {
  return handleCommonAuthAction('SIGN_UP', 'signUp', credentials);
}

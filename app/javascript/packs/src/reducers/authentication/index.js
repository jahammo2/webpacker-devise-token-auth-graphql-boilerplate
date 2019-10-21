import Immutable from 'immutable';

import actionTypes from 'src/constants/actionTypes';
import INITIAL_STATE from './initialState';

function handleStateReset(state, { isActive, justSignedOut }) {
  return state.withMutations((map) => {
    map.set('accessToken', null);
    map.set('client', null);
    map.set('email', null);
    map.set('emailSentTo', null);
    map.set('errors', null);
    map.set('id', null);
    map.set('isActive', isActive);
    map.set('justSignedOut', justSignedOut);
    map.set('name', null);
    map.set('uid', null);
  });
}

function authentication(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
    case actionTypes.CLEAR_TEMP_AUTH_STATE:
      return state.withMutations((map) => {
        map.set('emailSentTo', null);
        map.set('errors', null);
        map.set('isActive', false);
        map.set('justSignedOut', false);
      });

    case actionTypes.RECOVER_PASSWORD_FAILURE:
    case actionTypes.RESET_PASSWORD_FAILURE:
    case actionTypes.SIGN_IN_FAILURE:
    case actionTypes.SIGN_UP_FAILURE:
      return state.withMutations((map) => {
        map.set('errors', Immutable.fromJS(payload.errors));
        map.set('isActive', false);
      });

    case actionTypes.RECOVER_PASSWORD_START:
    case actionTypes.RESET_PASSWORD_START:
    case actionTypes.SIGN_IN_START:
    case actionTypes.SIGN_UP_START:
      return handleStateReset(state, { isActive : true, justSignedOut : false });

    case actionTypes.RECOVER_PASSWORD_SUCCESS:
    case actionTypes.SIGN_UP_SUCCESS:
      return state.withMutations((map) => {
        map.set('emailSentTo', payload.userInfo.email);
        map.set('isActive', false);
      });

    case actionTypes.RESET_PASSWORD_SUCCESS:
    case actionTypes.SIGN_IN_SUCCESS:
      return state.withMutations((map) => {
        const { userInfo } = payload;

        map.set('client', userInfo.client);
        map.set('email', userInfo.email);
        map.set('id', userInfo.id);
        map.set('isActive', false);
        map.set('name', userInfo.name);
        map.set('uid', userInfo.uid);
        map.set('accessToken', userInfo.accessToken);
      });

    case actionTypes.SIGN_OUT:
      return handleStateReset(state, { isActive : false, justSignedOut : true });

    default:
      return state;
  }
}

export default authentication;

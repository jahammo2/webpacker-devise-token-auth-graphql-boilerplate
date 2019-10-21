import Immutable from 'immutable';

import actionTypes from 'src/constants/actionTypes';
import INITIAL_STATE from './initialState';

export default function (state = INITIAL_STATE, { payload, type }) {
  switch (type) {
    case actionTypes.FIND_FOO_START:
      return state.set('isLoading', true);

    case actionTypes.FIND_FOO_SUCCESS:
      return state.withMutations((map) => {
        map.set('isLoading', false);
        map.setIn(['loaded', 'foo'], Immutable.fromJS(payload.foo));
      });

    default:
      return state;
  }
}

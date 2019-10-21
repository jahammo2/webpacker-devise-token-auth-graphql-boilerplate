import { print } from 'graphql/language/printer';

import find from 'src/graphql/queries/foos/find';
import handleError from 'src/services/shared/handleError';

import apiService from './api';

export default {
  find(id) {
    const params = {
      query     : print(find),
      variables : { id },
    };

    return apiService
      .post('/graphql', params)
      .then(({ data : { data } }) => data)
      .catch(handleError);
  },
};

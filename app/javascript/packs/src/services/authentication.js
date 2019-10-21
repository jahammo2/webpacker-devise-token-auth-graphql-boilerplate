import axios from 'axios';

import handleError from 'src/services/shared/handleError';
import snakeCaseParams from 'src/services/shared/snakeCaseParams';

export default {
  recoverPassword(credentials) {
    return axios
      .create()
      .post('/auth/password', snakeCaseParams(credentials))
      .then(() => ({ email : credentials.email }))
      .catch(response => handleError(response, { default : 'email' }));
  },

  resetPassword(credentials) {
    return axios
      .create()
      .put('/auth/password', credentials)
      .then(({
        data : { data },
        headers : { 'access-token' : accessToken, client },
      }) => ({ ...data, accessToken, client }))
      .catch(handleError);
  },

  signIn(credentials) {
    return axios
      .create()
      .post('/auth/sign_in', snakeCaseParams(credentials))
      .then(({
        data : { data },
        headers : { 'access-token' : accessToken, client },
      }) => ({ ...data, accessToken, client }))
      .catch(response => handleError(
        response,
        {
          default : 'email',
          401     : ['email', 'password'],
        },
      ));
  },

  signOut(headers) {
    return axios.create({ headers }).delete('/auth/sign_out');
  },

  signUp(credentials) {
    return axios
      .create()
      .post('/auth', snakeCaseParams({ ...credentials }))
      .then(({ data : { data } }) => data)
      .catch(response => handleError(response, { default : 'email' }));
  },
};

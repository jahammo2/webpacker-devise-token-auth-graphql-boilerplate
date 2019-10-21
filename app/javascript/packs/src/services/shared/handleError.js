import ErrorsService from 'src/services/Errors';

export default function ({ response }, defaultKeys) {
  const errorsService = new ErrorsService(response, defaultKeys);
  const errors = errorsService.buildErrorsHash();
  throw errors;
}

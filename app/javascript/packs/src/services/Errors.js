// The goal of this class is to allow us to customize
// error formatting in one place. The primary reasoning is
// that I don't want to override error handling in Devise.
// I would like to keep that standardized so that anyone
// coming onto this project doesn't get confused by auth
// error overrides and insteads expects the Devise
// standards.

class Errors {
  // The goal of defaultKeys is to build an errors hash
  // based upon the response status IF the errors coming
  // back from the response data is an array and not a hash.
  //
  // Example:
  // { default: 'email', 401: ['password'] }
  constructor(response, defaultKeys) {
    this.defaultKeys = defaultKeys;
    this.response = response;
  }

  buildErrorsHash() {
    const { data : { errors : errorsFromData } } = this.response;
    let errors = {};

    if (errorsFromData) errors = this._buildInitialErrorsHash(errorsFromData);

    if (Object.keys(errors).length === 0) {
      errors.generic = 'We are unfortunately running into some problems on our end. Please try \
      again in a few minutes.';
    }

    return this._reduceHash(errors);
  }

  // private

  _buildInitialErrorsHash(errorsFromData) {
    if (!Array.isArray(errorsFromData)) return errorsFromData;

    if (!this.defaultKeys) {
      console.warn('Your defaultKeys are missing in your error handling'); // eslint-disable-line no-console, max-len
      return {};
    }

    const key = this.defaultKeys.default;
    const keyByStatus = this.defaultKeys[this.response.status];

    if (!keyByStatus) return { [key] : errorsFromData };

    return this._buildFromKeysByStatus(keyByStatus, errorsFromData);
  }

  // The goal here is to end up with an error hash of
  // something like:
  //
  // { email : null, password : ['invalid login credentials'] }
  //
  // That way on a form, it will red out all inputs while only
  // showing the error message in one place
  _buildFromKeysByStatus(keyByStatus, errorsFromData) {
    return keyByStatus.reduce((accumulator, param, i) => {
      accumulator[param] = [];

      if (keyByStatus.length === i + 1) accumulator[param] = errorsFromData;

      return accumulator;
    }, {});
  }

  _formatMessage(message) {
    return message.replace(/\s+/g, ' ').trim();
  }

  _formatValue(value) {
    if (!Array.isArray(value)) return [this._formatMessage(value)];

    return value.map(message => this._formatMessage(message));
  }

  _reduceHash(errors) {
    return Object.keys(errors).reduce((accumulator, key) => {
      if (key === 'full_messages') return accumulator;

      const formattedValue = this._formatValue(errors[key]);
      accumulator[key] = formattedValue;

      return accumulator;
    }, {});
  }
}

export default Errors;

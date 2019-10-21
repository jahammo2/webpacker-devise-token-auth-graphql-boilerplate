import _ from 'lodash';

export default function (params) {
  return Object.keys(params).reduce((accumulator, key) => {
    const formattedKey = _.snakeCase(key);
    accumulator[formattedKey] = params[key];
    return accumulator;
  }, {});
}

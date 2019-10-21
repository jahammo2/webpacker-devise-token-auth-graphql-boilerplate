import ErrorsService from './Errors';

describe('ErrorsService', () => {
  describe('buildErrorsHash', () => {
    let errorsService;

    describe('with an errors response from the API', () => {
      describe('with an errors hash', () => {
        beforeAll(() => {
          const response = {
            data : {
              errors : {
                email         : ['error message from email'],
                full_messages : [
                  'error message from email',
                  'error message from password',
                ],
                password      : ['error message from password'],
              },
            },
          };
          errorsService = new ErrorsService(response);
        });

        it('returns a hash with formatted API errors', () => {
          const errorsHash = errorsService.buildErrorsHash();

          expect(Object.keys(errorsHash)).toHaveLength(2);
          expect(Object.keys(errorsHash)).not.toHaveProperty('generic');
          expect(errorsHash).toMatchObject({
            email    : ['error message from email'],
            password : ['error message from password'],
          });
        });
      });

      describe('with an errors array and chosen defaultKeys', () => {
        describe('with a status that does not match one sent in default keys', () => {
          let defaultKeys;

          beforeAll(() => {
            defaultKeys = { default : 'email', 401 : ['password'] };
            const response = {
              data : {
                errors : ['error message without key'],
              },
              status : 403,
            };
            errorsService = new ErrorsService(response, defaultKeys);
          });

          it('returns a hash with an error for the default key', () => {
            const errorsHash = errorsService.buildErrorsHash();

            expect(Object.keys(errorsHash)).toHaveLength(1);
            expect(errorsHash).toHaveProperty(defaultKeys.default);
            expect(errorsHash).toMatchObject({
              [defaultKeys.default]    : ['error message without key'],
            });
          });
        });

        describe('with a status that does match one sent in default keys', () => {
          let defaultKeys;

          beforeAll(() => {
            defaultKeys = { default : 'email', 401 : ['email'] };
            const response = {
              data : {
                errors : ['error message without key'],
              },
              status : 401,
            };
            errorsService = new ErrorsService(response, defaultKeys);
          });

          it('returns a hash with a error for the default status key', () => {
            const errorsHash = errorsService.buildErrorsHash();

            expect(Object.keys(errorsHash)).toHaveLength(1);
            expect(errorsHash).toMatchObject({
              email : ['error message without key'],
            });
          });
        });

        describe('with a status that does match and multiple keys for said status', () => {
          let defaultKeys;

          beforeAll(() => {
            defaultKeys = { default : 'email', 401 : ['email', 'password'] };
            const response = {
              data : {
                errors : ['error message without key'],
              },
              status : 401,
            };
            errorsService = new ErrorsService(response, defaultKeys);
          });

          it('returns a hash with only the last key getting an error message', () => {
            const errorsHash = errorsService.buildErrorsHash();

            expect(Object.keys(errorsHash)).toHaveLength(2);
            expect(errorsHash).toMatchObject({
              email       : [],
              password    : ['error message without key'],
            });
          });
        });
      });
    });

    describe('without an errors response from the API', () => {
      beforeAll(() => {
        const response = { data : { errors : {} } };
        errorsService = new ErrorsService(response);
      });

      it('returns a hash with a generic error', () => {
        const errorsHash = errorsService.buildErrorsHash();

        expect(Object.keys(errorsHash)).toHaveLength(1);
        expect(errorsHash).toHaveProperty('generic');
      });
    });
  });
});

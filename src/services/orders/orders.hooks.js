const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [ authenticate('jwt'),
      setField({
        from: 'params.user._id',
        as: 'params.query.user'
      })],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

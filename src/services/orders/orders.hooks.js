const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');
const { iff, disallow } = require('feathers-hooks-common');
const {
  protect
} = require('@feathersjs/authentication-local').hooks;


module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
      iff(
        (context) => context.params.user.role !== 'admin',
        setField({
          from: 'params.user._id',
          as: 'params.query.user',
        })
      ),
    ],
    get: [
      iff(
        (context) => context.params.user.role !== 'admin',
        setField({
          from: 'params.user._id',
          as: 'params.query.user',
        })
      ),
    ],
    create: [],
    update: [
      iff((context) => context.params.user.role !== 'admin', disallow()),
    ],
    patch: [iff((context) => context.params.user.role !== 'admin', disallow())],
    remove: [
      iff((context) => context.params.user.role !== 'admin', disallow()),
    ],
  },

  after: {
    all: [ protect('password')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};

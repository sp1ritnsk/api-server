// Initializes the `auth` service on path `/auth`
const { Auth } = require('./auth.class');
const createModel = require('../../models/auth.model');
const hooks = require('./auth.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/auth', new Auth(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('auth');

  service.hooks(hooks);
};

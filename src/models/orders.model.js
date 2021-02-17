// orders-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'orders';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    loginNTRIP: { type: String, },
    passwordNTRIP: { type: String, },
    companyName: { type: String, required: true },
    city: { type: String, required: true },
    region: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String, required: true },
    product: { type: String, required: true },
    comment: { type: String, },
    begin_date: {type: Date, required: [true, 'Необходимо указать дату начала подписки']},
    end_date: {type: Date },
    plan: {type: String}
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};

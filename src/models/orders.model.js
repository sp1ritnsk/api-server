// orders-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'orders';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    LoginNTRIP: { type: String, },
    PasswordNTRIP: { type: String, },
    CompanyName: { type: String, required: true },
    Region: { type: String, required: true },
    District: { type: String, required: true },
    Address: { type: String, required: true },
    Product: { type: String, required: true },
    Comment: { type: String, },
    begin_date: {type: Date, required: [true, 'Необходимо указать дату начала подписки']},
    end_date: {type: Date }
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

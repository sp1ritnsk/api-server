// orders-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'orders';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: 'users' },
      stations: [{ type: String, required: true }],
      login_ntrip: { type: String }, // is generated after payment
      password_ntrip: { type: String }, // is generated after payment
      city: { type: String, required: true },
      region: { type: String, required: false },
      district: { type: String, required: true },
      address: { type: String, required: true },
      plan: { type: String, required: true },
      begin_date: {
        type: Date,
        required: [true, 'Необходимо указать дату начала подписки'],
      },
      end_date: { type: Date }, // is computed before creation, begin_date + plan_months
      status: {type: String }
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};

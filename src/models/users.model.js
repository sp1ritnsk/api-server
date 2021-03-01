// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "users";
  const mongooseClient = app.get("mongooseClient");
  const schema = new mongooseClient.Schema(
    {
      email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Необходимо указать email"],
      },
      password: { type: String, required: [true, "Необходимо указать пароль"] },
      firstname: {
        type: String,
        required: [true, "Необходимо указать имя"],
      },
      lastname: {
        type: String,
        required: [true, "Необходимо указать фамилию"],
      },
      // выясниь у бухгалтерии и юристов нужно ли им отчество, если нет - убрать
      patronym: {
        type: String,
        required: [true, "Необходимо указать отчество"],
      },
      phone: { type: String, required: [true, "Необходимо указать телефон"] },
      type: {
        type: String,
        required: [true, "Необходимо указать тип субъекта"],
      },
      iin: { type: Number },
      bin: { type: Number },
      role: {type: String, default: 'user'}
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

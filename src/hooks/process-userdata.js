// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
//
//  Данный хук используется для валидации данных 
//  перед созданием и редактированием данных пользователей
//

const parsePhoneNumber = require('libphonenumber-js/max');

function validatePhone(phone) {
  const phoneNumber = parsePhoneNumber(phone, 'KZ');
  if (phoneNumber) {
    return phoneNumber.isValid() === true;
  }
}

function formatPhone(phone){
  const phoneNumber = parsePhoneNumber(phone, 'KZ');
  if (phoneNumber) {
    console.log(phoneNumber.formatInternational());
    return phoneNumber.formatInternational();
  }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function checkPassword(pass) {
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,24}$/;
  return passw.test(pass);
}

function validateDigits(text) {
  const dig = /^\d{12}$/;
  return dig.test(String(text));
}

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { data, method } = context;

    // Проверяем на пустой email
    if (!data.email) {
      throw new Error('Email не может быть пустым');
    }

    // проверяем на верный формат email
    if (!validateEmail(data.email)) {
      throw new Error('Не корректный формат email');
    }

    // проверяем на пустой пароль
    if (!data.password && !['update', 'patch', 'remove'].includes(method)) {
      throw new Error('Пароль не может быть пустым');
    }

    // проверяем силу пароля
    if (!checkPassword(data.password) && !['update', 'patch', 'remove'].includes(method)){
      throw new Error('Пароль должен быть не менее 8 символов, должен содержать цифры, строчные и заглавные буквы латинского алфавита');
    }

    if (data.iin && !validateDigits(data.iin)){
      throw new Error('Неверный формат ИИН');
    }
    
    if (data.bin && !validateDigits(data.bin)){
      throw new Error('Неверный формат БИН');
    }

    if (data.phone && !validatePhone(data.phone)){
      console.log(data.phone);
      throw new Error('Неверный формат номера телефона');
    } else {
      context.data.phone = formatPhone(data.phone);
    }

    if (!data.iin && data.type === 'Физическое лицо'){
      throw new Error('Необходимо указать ИИН для физического лица');
    }
    if (!data.bin && data.type === 'Юридическое лицо'){
      throw new Error('Необходимо указать БИН для юридического лица');
    }

    return context;

  };
};



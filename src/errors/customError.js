// class customEerrors {
//   static create({ name = 'Error', message, cause, code = 1, statusCode = 500 }) {
//     let error = new Error(message);
//     error.cause = cause;
//     error.name = name;
//     error.code = code;
//     error.statusCode = statusCode;
//     throw error;
//   }
// }

const { GENERIC_ERROR } = require('./enumErrors');

class CustomError {
  static createError({ code = 500, msg, typeError = GENERIC_ERROR }) {
    const error = new Error(msg);
      error.code = code;
      error.type = typeError;
      return error;
    }
  }
  
  module.exports = CustomError;
  // module.exports = customEerrors;
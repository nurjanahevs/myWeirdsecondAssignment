module.exports = (err, req, res, next) => {
  console.log(err)
  let code = 0;
  let name = err.name;
  let message;

  switch (name) {
    case 'EMAIL_ALREADY_EXISTS':
      code = 409;
      message = 'Email already exists!';
      break;
    case 'MONGOOSE_ERROR':
      code = 500;
      message = 'Mongoose error!';
      break;
    case 'LOGIN_FAIL':
      code = 401;
      message = 'Email Or password not found!';
      break;
    case 'MISSING_TOKEN':
      code = 401;
      message = 'Missing access token!';
      break;
    case 'INVALID_TOKEN':
      code = 401;
      message = 'Invalid access token!';
      break;
    case 'NOT_ENOUGH':
      code = 401;
      message = 'yours Not enough';
      break;
    case 'NOT_FOUND':
      code = 404;
      message = 'Resource not found!';
      break;
    case 'FORBIDDEN':
      code = 403;
      message = 'No access!';
      break;
    default:
      code = 500;
      message = 'Internal server error!';
  }

  res.status(code).json({ success: false, message });
};
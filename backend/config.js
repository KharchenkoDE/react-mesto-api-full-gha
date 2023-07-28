const { PORT = 3000 } = process.env;
const { DATA_BASE_URI = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { NODE_ENV = 'develop' } = process.env;
const { JWT_SECRET = 'dev_jwt_secret' } = process.env;

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  DATA_BASE_URI,
};

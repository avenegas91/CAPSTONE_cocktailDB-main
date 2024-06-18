const Ajv = require('ajv');
const ajv = new Ajv();

const validateSchema = (schema) => {
  return (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json({ errors: validate.errors });
    }
    next();
  };
};

module.exports = validateSchema;

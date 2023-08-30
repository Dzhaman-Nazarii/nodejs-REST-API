const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (req.method === "PATCH") {
      const error = new Error("missing field favorite");
      error.status = 400;
      return next(error);
    }
    if (Object.keys(req.body).length === 0) {
      const error = new Error("missing fields");
      error.status = 400;
      return next(error);
    }
    console.log(req.body.method);
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};
module.exports = validateBody;

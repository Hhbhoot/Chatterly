const validateSchema = (schema) => (req, res, next) => {
  const data = {
    ...req.params,
    ...req.query,
    ...req.body,
  };

  const result = schema.safeParse(data);

  if (!result.success) {
    return res.status(400).json({
      status: 'validation failed',
      message: result.error.errors,
    });
  }
  next();
};

export default validateSchema;

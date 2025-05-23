const validateSchema = (schema) => (req, res, next) => {
  const result = schema.safeParse(req?.body);

  if (!result.success) {
    return res.status(400).json({
      status: 'validation failed',
      message: result.error.errors,
    });
  }
  next();
};

export default validateSchema;

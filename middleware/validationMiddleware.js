exports.validate = (schema) => (req, res, next) => {
    const {
      error
    } = schema.validate(req.body);
    if (error) {
      
      res.status(400).json({
        statuscode: 400,
        msg: error.details[0].message,
        data: []
    });
    } else {
      next();
    }
  };
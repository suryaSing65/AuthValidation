const Joi = require("joi");

exports.register = Joi.object()
  .keys({
    username: Joi.string()
      .min(3)
      .max(40)
      .required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      cpassword: Joi.ref("password"),

  });
  exports.login = Joi.object()
  .keys({
    
      email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]')),
    

  });
  exports.confirmPassword = Joi.object()
  .keys({
    
    newpassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmpassword: Joi.ref("newpassword"),
    

  });
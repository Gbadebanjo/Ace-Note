import Joi from "joi";

export const signupUserSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  username: Joi.string().required(),
  password: Joi.string().min(6).max(40).required(),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const loginUserSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().min(6).max(40).required(),
});

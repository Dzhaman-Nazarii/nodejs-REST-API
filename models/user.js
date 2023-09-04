const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": `missing required password field` }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({ "any.required": `missing required email field` }),
  subscription: Joi.string(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({ "any.required": `missing required password field` }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({ "any.required": `missing required email field` }),
});

const schemas = { registerSchema, loginSchema };
const User = model("user", userSchema);

module.exports = { User, schemas };

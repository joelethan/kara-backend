const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.contact = !isEmpty(data.contact) ? data.contact : "";

  if (!validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "name must be between 3 to 30 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  }

  if (!validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = "password must be at least 5 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "insert your account password";
  }

  if (validator.isEmpty(data.address)) {
    errors.address = "please insert an address";

    if (validator.isEmpty(data.role)) {
      errors.role = "please insert the role of this new entry";
    }
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "you must confirm your password";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "password mismatch";
  }

  if (validator.isEmpty(data.contact)) {
    errors.contact = "insert the contact for this entry";
  }

  if (!validator.isNumeric(data.contact)) {
    errors.contact = "the contact must be a phone number";
  }

  if (!validator.isLength(data.contact, { min: 10, max: 12 })) {
    errors.contact = "contact must be at least 10 digits long";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

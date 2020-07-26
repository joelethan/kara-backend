const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateSupplierInput(data) {
  let errors = {};

  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.contact = !isEmpty(data.contact) ? data.contact : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  }
  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "Please insert the first name of the Supplier";
  }

  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "Please insert the last name of the Supplier";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Supplier email is required";
  }

  if (validator.isEmpty(data.address)) {
    errors.address = "Address is required for a Supplier";
  }

  if (validator.isEmpty(data.contact)) {
    errors.contact = "contact is required for a Supplier";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

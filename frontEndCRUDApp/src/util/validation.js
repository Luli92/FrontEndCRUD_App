import * as yup from "yup";

const firstName = yup
  .string()
  .min(1)
  .max(50)
  .required("Field Required");

const lastName = yup
  .string()
  .min(0)
  .max(50)
  .required("Field Required");

const email = yup
  .string()
  .email()
  .required();

export default {
  firstName,
  lastName,
  email
};

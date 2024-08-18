import * as yup from "yup";

const signUpScheme = yup
  .object({
    firstname: yup.string().required("Completá los campos requeridos."),
    lastname: yup.string().required("Completá los campos requeridos."),
    dni: yup.number().required("Completá los campos requeridos."),
    email: yup
      .string()
      .email("El formato del email es inválido.")
      .required("Completá los campos requeridos."),
    password: yup
      .string()
      .required("Completá los campos requeridos.")
      .min(6, "La contraseña debe tener 6 caracteres como mínimo.")
      .max(20, "La contraseña debe tener 20 caracteres como máximo."),
    passwordConfirmed: yup
      .string()
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden.")
      .required("Completá los campos requeridos."),
    phone: yup
      .string()
      .required("Completá los campos requeridos."),
  })
  .required();

export default signUpScheme;

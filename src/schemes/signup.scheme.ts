import * as yup from "yup";

const nameSchema = yup
  .string()
  .matches(/^[A-Za-z]+$/, "El campo debe contener solo letras.")
  .required("Completá los campos requeridos.");

const phoneSchema = yup
  .string()
  .required("Completá los campos requeridos.");

export const signUpScheme = yup
  .object({
    firstname: nameSchema,
    lastname: nameSchema,
    dni: yup.number().required("Completá los campos requeridos."),
    email: yup
      .string()
      .email("El formato del email es inválido.")
      .required("Completá los campos requeridos."),
    password: yup
      .string()
      .min(6, "La contraseña debe tener 6 caracteres como mínimo.")
      .max(20, "La contraseña debe tener 20 caracteres como máximo.")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "La contraseña debe contener al menos 1 carácter especial, una mayúscula y un número."
      )
      .required("Completá los campos requeridos."),
    passwordConfirmed: yup
      .string()
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden.")
      .required("Completá los campos requeridos."),
    phone: phoneSchema,
  })
  .required();


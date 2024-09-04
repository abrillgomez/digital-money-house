import * as yup from "yup";

export const cardScheme = yup
  .object({
    cardNumber: yup
      .string()
      .matches(
        /^\d{13,19}$/,
        "El número de tarjeta debe tener entre 13 y 19 dígitos."
      )
      .required("Completá los campos requeridos."),
    expiry: yup
      .string()
      .matches(
        /^(0[1-9]|1[0-2])\/\d{2}$/,
        "El formato de vencimiento debe ser MM/YY, con 2 dígitos para el mes y 2 dígitos para el año."
      )
      .required("Completá los campos requeridos."),
    fullName: yup
      .string()
      .matches(
        /^[A-Za-zÀ-ÖØ-Ýà-öø-ÿÑñ\s]*$/,
        "El campo debe contener solo letras y espacios."
      )
      .required("Completá los campos requeridos."),
    cvc: yup
      .string()
      .matches(/^\d{3}$/, "El código de seguridad debe tener 3 dígitos.")
      .required("Completá los campos requeridos."),
  })
  .required();

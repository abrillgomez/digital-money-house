import * as yup from "yup";

export const accountScheme = yup.object({
  accountNumber: yup
    .string()
    .matches(
      /^[^2]\d{10}$/,
      "El número de cuenta debe tener 11 dígitos y no puede comenzar con '2'."
    )
    .required("Completá los campos requeridos."),
});

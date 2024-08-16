import * as yup from "yup";

const loginSchema = yup
  .object({
    email: yup.string().required("Completá los campos requeridos."),
    password: yup
      .string()
      .required("Completá campos requeridos.")
      .min(6, "La contraseña debe tener 6 caracteres como mínimo."),
  })
  .required();

export default loginSchema
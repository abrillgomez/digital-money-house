import * as yup from "yup";

export const emailSchema = yup
  .object({
    email: yup.string().email("El formato del email es inválido.").required("Completá los campos requeridos."),
  })
  .required();

export const passwordSchema = yup
  .object({
    password: yup
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres.")
      .max(20, "La contraseña no puede tener más de 20 caracteres.")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "La contraseña debe contener al menos 1 carácter especial, una mayúscula y un número."
      )
      .required("La contraseña es obligatoria."),
  })
  .required();

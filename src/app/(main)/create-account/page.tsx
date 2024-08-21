"use client";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "@/app/components/inputs/InputText";
import InputNumber from "@/app/components/inputs/InputNumber";
import { signUpScheme } from "@/schemes/signup.scheme";
import CreateAccountButton from "@/app/components/buttons/CreateAccountButton";
import userApi from "@/services/auth/auth.service";

const CreateAccountPage = () => {
  const methods = useForm({
    resolver: yupResolver(signUpScheme),
    mode: "onChange",
  });

  const { handleSubmit, formState } = methods;
  const isFormValid = formState.isValid;

  const onSubmit = async (data) => {
    try {
      console.log("Enviando datos de registro:", data);
      const response = await userApi.newUser({
        dni: data.dni,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
        phone: data.phone,
      });

      console.log("Respuesta de la API:", response);
      alert("¡Usuario creado exitosamente!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("Hubo un error al crear el usuario: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[795px] py-2 bg-custom-dark text-white">
      <h1 className="text-2xl font-bold">Crear Cuenta</h1>
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 pl-[3%] sm:pl-0"
          onSubmit={handleSubmit(onSubmit)}>
          <InputText type="text" placeholder="Nombre*" fieldName="firstname" />
          <InputText type="text" placeholder="Apellido*" fieldName="lastname" />
          <InputNumber type="number" placeholder="DNI*" fieldName="dni" />
          <InputText type="email" placeholder="Email*" fieldName="email" />
          <div className="col-span-1 sm:col-span-2">
            <p className="text-[15.2px] w-[300px] sm:w-auto">
              Usa entre 6 y 20 caracteres (debe contener al menos 1 carácter
              especial, una mayúscula y un número)
            </p>
          </div>
          <InputText
            type="password"
            placeholder="Contraseña*"
            fieldName="password"
          />
          <InputText
            type="password"
            placeholder="Confirmar contraseña*"
            fieldName="passwordConfirmed"
          />
          <InputNumber type="number" placeholder="Teléfono" fieldName="phone" />
          <CreateAccountButton isEnabled={isFormValid} />
          {formState.errors.email && (
            <p className="text-red-500 col-span-1 sm:col-span-2">
              {formState.errors.email.message}
            </p>
          )}
          {formState.errors.password && (
            <p className="text-red-500 col-span-1 sm:col-span-2">
              {formState.errors.password.message}
            </p>
          )}
          {formState.errors.firstname && (
            <p className="text-red-500 col-span-1 sm:col-span-2">
              {formState.errors.firstname.message}
            </p>
          )}
          {formState.errors.lastname && (
            <p className="text-red-500 col-span-1 sm:col-span-2">
              {formState.errors.lastname.message}
            </p>
          )}
          {formState.errors.dni && (
            <p className="text-red-500 col-span-1 sm:col-span-2">
              {formState.errors.dni.message}
            </p>
          )}
          {formState.errors.passwordConfirmed && (
            <p className="text-red-500 col-span-1 sm:col-span-2">
              {formState.errors.passwordConfirmed.message}
            </p>
          )}
          {formState.errors.phone && (
            <p className="text-red-500 col-span-1 sm:col-span-2">
              {formState.errors.phone.message}
            </p>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateAccountPage;

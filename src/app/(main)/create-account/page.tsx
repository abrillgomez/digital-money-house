"use client";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "@/app/components/inputs/InputText";
import InputNumber from "@/app/components/inputs/InputNumber";
import loginSchema from "@/schemes/login.scheme";
import CreateAccountButton from "@/app/components/buttons/CreateAccountButton";

const SignUpPage = () => {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const { handleSubmit, formState, control } = methods;
  const passwordValue = useWatch({ control, name: "password" });
  const isPasswordValid = passwordValue?.length >= 6;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[795px] py-2 bg-custom-dark text-white ">
      <h1 className="text-2xl font-bold">Crear cuenta</h1>
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-2 gap-4 py-4"
          onSubmit={handleSubmit(onSubmit)}>
          <InputText type="text" placeholder="Nombre*" fieldName="text" />
          <InputText type="text" placeholder="Apellido*" fieldName="surname" />
          <InputNumber type="number" placeholder="DNI*" fieldName="dni" />
          <InputText
            type="email"
            placeholder="Correo electrónico*"
            fieldName="email"
          />
          <div className="col-span-2">
            <p className="text-[15.2px]">
              Usa entre 6 y 20 caracteres (debe contener al menos al menos 1
              carácter especial, una mayúscula y un número)
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
            fieldName="confirmPassword"
          />
          <InputNumber
            type="number"
            placeholder="Teléfono*"
            fieldName="phone"
          />
          <CreateAccountButton />
          {formState.errors.password && (
            <p className="text-red-500 col-span-2">
              {formState.errors.password.message}
            </p>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpPage;

"use client";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "@/app/components/inputs/InputText";
import InputNumber from "@/app/components/inputs/InputNumber";
import CreateAccountButton from "@/app/components/buttons/CreateAccountButton";
import signUpScheme from "@/schemes/signup.scheme";

const SignUpPage = () => {
  const methods = useForm({
    resolver: yupResolver(signUpScheme),
    mode: "onChange",
  });

  const { handleSubmit, formState, control } = methods;

  const passwordValue = useWatch({ control, name: "password" });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[795px] py-2 bg-custom-dark text-white ">
      <h1 className="text-2xl font-bold">Crear cuenta</h1>
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-2 gap-4 py-4 w-[798px] h-[453px]"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 col-span-2">
            <div>
              <InputText type="text" placeholder="Nombre*" fieldName="text" />
            </div>
            <div>
              <InputText
                type="text"
                placeholder="Apellido*"
                fieldName="last-name"
              />
            </div>

            <div>
              <InputNumber type="number" placeholder="DNI*" fieldName="dni" />
            </div>
            <div>
              <InputText
                type="email"
                placeholder="Correo electrónico*"
                fieldName="email"
              />
              {formState.errors.email && (
                <p className="text-red-500">{formState.errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="col-span-2">
            <p className="text-[15.2px]">
              Usa entre 6 y 20 caracteres (debe contener al menos al menos 1
              carácter especial, una mayúscula y un número)
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 col-span-2">
            <div>
              <InputText
                type="password"
                placeholder="Contraseña*"
                fieldName="password"
              />
              {formState.errors.password && (
                <p className="text-red-500">
                  {formState.errors.password.message}
                </p>
              )}
            </div>
            <div>
              <InputText
                type="password"
                placeholder="Confirmar contraseña*"
                fieldName="passwordConfirmed"
              />
              {formState.errors.passwordConfirmed && (
                <p className="text-red-500">
                  {formState.errors.passwordConfirmed.message}
                </p>
              )}
            </div>
            <div>
              <InputNumber
                type="number"
                placeholder="Teléfono*"
                fieldName="phone"
              />
              {formState.errors.phone && (
                <p className="text-red-500">{formState.errors.phone.message}</p>
              )}
            </div>
            <div className="flex">
              <CreateAccountButton />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpPage;

"use client";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "@/app/components/inputs/InputText";
import InputNumber from "@/app/components/inputs/InputNumber";
import Menu from "@/app/components/menu/Menu";
import { cardScheme } from "@/schemes/card.scheme";
import ContinueButton from "@/app/components/buttons/ContinueButton";
import AccountAPI from "../../../services/account/account.service";
import cardService from "../../../services/cards/cards.service";
import Swal from "sweetalert2";

interface CardFormData {
  cardNumber: string;
  expiry: string;
  fullName: string;
  cvc: string;
}

const CardPage = () => {
  const methods = useForm<CardFormData>({
    resolver: yupResolver(cardScheme),
    mode: "onChange",
  });

  const { handleSubmit, formState, control, watch } = methods;
  const { isValid } = formState;

  const cardNumber = watch("cardNumber", "");
  const expiry = watch("expiry", "");
  const fullName = watch("fullName", "");
  const cvc = watch("cvc", "");
  const [cardType, setCardType] = useState<string>("");

  const determineCardType = (number: string) => {
    const firstDigit = number.charAt(0);
    const firstTwoDigits = number.slice(0, 2);

    if (firstDigit === "4") {
      return "VISA";
    } else if (["51", "52", "53", "54", "55"].includes(firstTwoDigits)) {
      return "MasterCard";
    } else if (["34", "37"].includes(firstTwoDigits)) {
      return "Amex";
    }
    return "";
  };

  useEffect(() => {
    setCardType(determineCardType(cardNumber));
  }, [cardNumber]);

  const formatExpiry = (value: string) => {
    const cleanValue = value?.replace(/\D/g, "");
    if (cleanValue?.length <= 2) {
      return cleanValue;
    }
    return `${cleanValue?.slice(0, 2)}/${cleanValue?.slice(2, 4)}`;
  };

  const convertExpiryToFullYear = (expiry: string) => {
    const [month, year] = expiry.split("/");
    return `${month}/20${year}`;
  };

  const onSubmit = async (data: CardFormData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado.");
      const accountAPI = new AccountAPI();
      const accountInfo = await accountAPI.getAccountInfo(token);
      const accountId = accountInfo.id;
      const existingCards = await cardService.getCardsByAccountId(
        accountId,
        token
      );
      if (existingCards.length >= 10) {
        Swal.fire({
          icon: "warning",
          title: "Límite alcanzado",
          text: "El máximo de tarjetas es 10. No puedes agregar más.",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      const cardData = {
        cod: parseInt(data.cvc, 10),
        expiration_date: convertExpiryToFullYear(data.expiry),
        first_last_name: data.fullName,
        number_id: parseInt(data.cardNumber),
      };
      await cardService.createCard(accountId, cardData, token);
      Swal.fire({
        icon: "success",
        title: "Tarjeta creada con éxito",
        confirmButtonText: "Aceptar",
      }).then(() => {
        window.location.href = "/cards";
      });
    } catch (error) {
      console.error("Error al crear la tarjeta:", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear la tarjeta",
        text: "Ocurrió un error. Inténtalo de nuevo.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let start: number | null = null;
    const delay = 200;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      if (elapsed < delay) {
        requestAnimationFrame(animate);
      } else {
        setLoading(false);
      }
    };
    requestAnimationFrame(animate);
  }, []);

  if (loading) {
    return (
      <div className="flex bg-custom-dark justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#C1FD35"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col justify-center items-center bg-gray-100 min-h-screen">
        <h1 className="block text-2xl text-custom-dark font-bold mb-4 sm:hidden">
          Tarjetas
        </h1>
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
          <div className="mb-8 p-6 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-[330px] h-[180px] p-4 bg-custom-dark text-white rounded-lg shadow-md">
                <div className="text-2xl text-white font-bold">{cardType}</div>
                <div className="text-2xl text-white font-bold">
                  {cardNumber}
                </div>
                <div className="flex justify-between wrap">
                  <div className="text-lg text-white font-semibold mb-2 mt-2">
                    {fullName}
                  </div>
                  <div className="text-xl text-white font-semibold mb-2 mt-2">
                    {formatExpiry(expiry)}
                  </div>
                </div>
                <div className="absolute text-white bottom-4 right-4 text-sm font-light">
                  {cvc}
                </div>
              </div>
            </div>
          </div>
          <FormProvider {...methods}>
            <form
              className="flex flex-wrap gap-4 py-4 justify-center"
              onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="cardNumber"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    type="text"
                    fieldName="cardNumber"
                    placeholder="Número de tarjeta*"
                    value={field.value}
                    onChange={(e) => {
                      const cleanedValue = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 19);
                      field.onChange(cleanedValue);
                    }}
                  />
                )}
              />
              <Controller
                name="expiry"
                control={control}
                render={({ field }) => {
                  const formattedValue = field.value
                    ? formatExpiry(field.value)
                    : "";
                  return (
                    <input
                      type="text"
                      name="expiry"
                      placeholder="Fecha de vencimiento (MM/YY)*"
                      value={formattedValue}
                      onChange={(e) => {
                        const formattedInput = formatExpiry(e.target.value);
                        field.onChange(formattedInput);
                      }}
                      className={`w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-white border border-gray-300 px-4 py-2 rounded-[10px] text-black text-[18px] mb-2`}
                    />
                  );
                }}
              />
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <InputText
                    type="text"
                    fieldName="fullName"
                    placeholder="Nombre y apellido*"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              <Controller
                name="cvc"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Código de seguridad*"
                    value={field.value}
                    onChange={(e) => {
                      if (e.target.value.length <= 3) {
                        field.onChange(e.target.value);
                      }
                    }}
                    className={`w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-white border border-gray-300 px-4 py-2 rounded-[10px] text-black text-[18px] mb-2`}
                  />
                )}
              />
              <div className="w-full flex justify-center mt-4">
                <ContinueButton
                  isEnabled={isValid}
                  handleSubmit={handleSubmit(onSubmit)}
                />
              </div>
              {formState.errors.cardNumber && (
                <p className="text-red-500 col-span-1 sm:col-span-2">
                  {formState.errors.cardNumber.message}
                </p>
              )}
              {formState.errors.expiry && (
                <p className="text-red-500 col-span-1 sm:col-span-2">
                  {formState.errors.expiry.message}
                </p>
              )}
              {formState.errors.fullName && (
                <p className="text-red-500 col-span-1 sm:col-span-2">
                  {formState.errors.fullName.message}
                </p>
              )}
              {formState.errors.cvc && (
                <p className="text-red-500 col-span-1 sm:col-span-2">
                  {formState.errors.cvc.message}
                </p>
              )}
            </form>
          </FormProvider>
        </div>
      </main>
    </div>
  );
};

export default CardPage;

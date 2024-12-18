"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import AccountAPI from "../../../services/account/account.service";
import cardService from "../../../services/cards/cards.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { transactionsAPI } from "@/services/transactions/transactions.service";

interface Card {
  id: string;
  number_id: number;
}

const CardTransactionCard = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;
  const accountService = useMemo(() => new AccountAPI(), []);
  const isServicesPage = window.location.pathname === "/pay-service";

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const token: string | null = localStorage.getItem("token");
        if (!token) throw new Error("No se encontró el token en localStorage.");
        const accountInfo = await accountService.getAccountInfo(token);
        const accountId = accountInfo.id;
        const fetchedCards = await cardService.getCardsByAccountId(
          accountId,
          token
        );
        setCards(fetchedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
        setError("Error al cargar las tarjetas. Intente nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [accountService]);

  const handleCardSelection = useCallback((card: Card) => {
    setSelectedCard(card);
  }, []);

  const handleNewCardClick = () => {
    window.location.href = "/add-card";
  };

  const handleContinueClick = useCallback(async () => {
    if (!selectedCard) {
      Swal.fire({
        title: "Error",
        text: "Por favor seleccione una tarjeta.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#4caf50",
      });
      return;
    }

    const { id, number_id } = selectedCard;

    if (isServicesPage) {
      const params = new URLSearchParams(window.location.search);
      const serviceName = params.get("name") || "Servicio";
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No se encontró el token en localStorage.");
        const accountInfo = await accountService.getAccountInfo(token);
        const accountId = accountInfo.id;
        const transactionData = {
          amount: -5547.25,
          dated: new Date().toISOString(),
          description: `Pagaste a ${serviceName}`,
        };
        const response = await transactionsAPI.createTransaction(
          accountId,
          transactionData
        );
        if (response && response.id) {
          Swal.fire({
            title: "Éxito",
            text: "El pago del servicio se realizó correctamente.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#4caf50",
          }).then(() => {
            const lastFourDigits = number_id.toString().slice(-4);
            window.location.href = `/payment-confirmation?serviceName=${serviceName}&lastFourDigits=${lastFourDigits}`;
          });
        } else {
          throw new Error("Error en la respuesta de la API");
        }
      } catch (error) {
        console.error("Hubo un problema con tu pago", error);
        Swal.fire({
          title: "Error",
          text: "Puede deberse a fondos insuficientes. Comunicate con la entidad emisora de la tarjeta.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#4caf50",
        });
      }
    } else {
      const lastFourDigits = number_id.toString().slice(-4);
      window.location.href = `/deposit-money?cardId=${id}&lastFourDigits=${lastFourDigits}`;
    }
  }, [selectedCard, accountService, isServicesPage]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-custom-dark p-8 rounded-lg shadow-lg w-[350px] sm:w-[350px] md:w-[511px] lg:w-[1006px]">
        <h2 className="text-3xl text-custom-lime font-semibold mb-6">
          Seleccionar tarjeta
        </h2>
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="text-xl font-bold text-custom-dark mb-4">
            Tus tarjetas
          </h3>
          {loading ? (
            <p className="text-custom-dark">Cargando tarjetas...</p>
          ) : error ? (
            <p className="text-custom-dark">{error}</p>
          ) : cards.length === 0 ? (
            <p className="text-custom-dark">
              Aún no tienes tarjetas asociadas.
            </p>
          ) : (
            <div>
              {currentCards.map((card) => (
                <div
                  key={card.id}
                  className={`flex justify-between items-center p-4 mb-2 rounded-lg border-2 ${
                    selectedCard?.id === card.id
                      ? "border-custom-lime"
                      : "border-custom-gray"
                  }`}
                  onClick={() => handleCardSelection(card)}>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      className="text-custom-lime mr-4"
                      size="lg"
                    />
                    <span className="text-custom-dark font-medium">
                      Terminada en {card.number_id.toString().slice(-4)}
                    </span>
                  </div>
                  <input
                    type="radio"
                    checked={selectedCard?.id === card.id}
                    onChange={() => handleCardSelection(card)}
                    className="form-radio text-custom-lime"
                  />
                </div>
              ))}
              <div className="flex items-center mt-4">
                {totalPages > 1 && currentPage > 1 && (
                  <button
                    onClick={goToPreviousPage}
                    className="bg-custom-lime text-custom-dark px-4 py-2 rounded-lg font-semibold"
                    disabled={currentPage === 1}>
                    Anterior
                  </button>
                )}
                <p className="text-custom-dark mx-4 flex-grow text-center">
                  {currentPage} de {totalPages}
                </p>
                {totalPages > 1 && currentPage < totalPages && (
                  <button
                    onClick={goToNextPage}
                    className="bg-custom-lime text-custom-dark px-4 py-2 rounded-lg font-semibold"
                    disabled={currentPage === totalPages}>
                    Siguiente
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <div
          className={`flex items-center ${
            isServicesPage ? "justify-end" : "justify-between"
          }`}>
          {!isServicesPage && (
            <button
              onClick={handleNewCardClick}
              className="flex items-center bg-custom-dark text-custom-lime px-4 py-2 rounded-lg font-semibold">
              <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
              Nueva tarjeta
            </button>
          )}
          <button
            onClick={handleContinueClick}
            className="bg-custom-lime text-custom-dark px-8 py-2 rounded-lg font-semibold">
            {isServicesPage ? "Pagar" : "Continuar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardTransactionCard;

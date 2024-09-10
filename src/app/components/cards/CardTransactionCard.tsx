"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AccountAPI from "../../../services/account/account.service";
import cardService from "../../../services/cards/cards.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const CardTransactionCard = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;

  const accountService = new AccountAPI();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const token = localStorage.getItem("token");
        const accountInfo = await accountService.getAccountInfo(token);
        const accountId = accountInfo.id;
        const cards = await cardService.getCardsByAccountId(accountId, token);
        setCards(cards);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, []);

  const handleCardSelection = (cardId: number) => {
    setSelectedCard(cardId);
  };

  const handleNewCardClick = () => {
    window.location.href = "/add-card";
  };

  const handleContinueClick = () => {
    if (selectedCard) {
      window.location.href = "/deposit-money";
    } else {
      Swal.fire({
        title: "Error",
        text: "Por favor seleccione una tarjeta",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#C1FD35",
      });
    }
  };

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
    <div className="flex justify-center items-center h-screen">
      <div className="bg-custom-dark p-8 rounded-lg shadow-lg w-[1006px]">
        <h2 className="text-3xl text-custom-lime font-bold mb-6">
          Seleccionar tarjeta
        </h2>
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="text-xl font-bold text-custom-dark mb-4 pl-2">
            Tus tarjetas
          </h3>
          {loading ? (
            <p className="text-custom-dark pl-2">Cargando tarjetas...</p>
          ) : cards.length === 0 ? (
            <p className="text-custom-dark pl-2">
              No tienes tarjetas asociadas.
            </p>
          ) : (
            <div className="pl-2">
              {currentCards?.map((card) => (
                <div
                  key={card.id}
                  className={`flex justify-between items-center p-4 mb-2 rounded-lg border-2 ${
                    selectedCard === card.id
                      ? "border-custom-lime"
                      : "border-custom-gray"
                  }`}
                  onClick={() => handleCardSelection(card.id)}>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      className="text-custom-lime mr-4"
                      size="lg"
                    />
                    <span className="text-custom-dark font-medium">
                      Terminada en {card?.number_id?.toString().slice(-4)}
                    </span>
                  </div>
                  <input
                    type="radio"
                    checked={selectedCard === card.id}
                    onChange={() => handleCardSelection(card.id)}
                    className="form-radio text-custom-lime"
                  />
                </div>
              ))}
              <div className="flex items-center mt-4">
                {currentPage > 1 && (
                  <button
                    onClick={goToPreviousPage}
                    className="bg-custom-lime text-custom-dark px-4 py-2 rounded-lg font-semibold">
                    Anterior
                  </button>
                )}
                <p className="text-custom-dark mx-4 flex-1 text-center">
                  Página {currentPage} de {totalPages}
                </p>
                {currentPage < totalPages && (
                  <button
                    onClick={goToNextPage}
                    className="bg-custom-lime text-custom-dark px-4 py-2 rounded-lg font-semibold">
                    Siguiente
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={handleNewCardClick}
            className="flex items-center bg-custom-lime text-custom-dark px-8 py-2 rounded-lg font-semibold">
            <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
            Nueva tarjeta
          </button>
          <button
            onClick={handleContinueClick}
            className="bg-custom-lime text-custom-dark px-8 py-2 rounded-lg font-semibold">
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardTransactionCard;

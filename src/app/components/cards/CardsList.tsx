"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import cardService from "../../../services/cards/cards.service";
import AccountAPI from "@/services/account/account.service";

interface Card {
  id: number;
  number_id: number;
}

const CardsList = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!token) return;
      const accountAPI = new AccountAPI();
      try {
        const accountData = await accountAPI.getAccountInfo(token);
        setAccountId(accountData.id);

        const response = await cardService.getCardsByAccountId(
          accountData.id,
          token
        );
        setCards(response);
      } catch (error) {
        console.error("Error fetching account/cards data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccountData();
  }, [token]);

  const handleDelete = async (cardId: number) => {
    if (!accountId || !token) return;

    try {
      await cardService.deleteCard(accountId, cardId, token);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const confirmDelete = (cardId: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(cardId);
        Swal.fire("Eliminada", "La tarjeta ha sido eliminada.", "success");
      }
    });
  };

  if (loading) {
    return <div className="text-custom-dark mt-4">Cargando tarjetas...</div>;
  }

  return (
    <div className="bg-white rounded-lg p-6 mt-4 w-full max-w-[350px] sm:max-w-[511px] lg:max-w-[1006px]">
      <h3 className="text-xl font-bold text-custom-dark mb-4">Tus tarjetas</h3>
      <ul>
        {cards.length > 0 ? (
          cards.map((card) => (
            <li
              key={card.id}
              className="flex justify-between items-center border-b border-custom-gray-light py-4">
              <div className="flex items-center">
                <div className="w-[32px] h-[32px] bg-custom-lime rounded-full mr-4"></div>
                <p className="text-custom-dark text-[16px]">
                  Terminada en {card.number_id.toString().slice(-4)}
                </p>
              </div>
              <button
                onClick={() => confirmDelete(card.id)}
                className="font-bold text-custom-dark hover:text-black">
                <span className="ml-2">Eliminar</span>
              </button>
            </li>
          ))
        ) : (
          <li className="text-custom-dark py-4">
            No tienes tarjetas asociadas.
          </li>
        )}
      </ul>
    </div>
  );
};

export default CardsList;

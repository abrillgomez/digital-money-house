"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import cardService from "../../../services/cards/cards.service";
import AccountAPI from "@/services/account/account.service";

const CardsList = () => {
  const [cards, setCards] = useState([]);
  const [accountId, setAccountId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchAccountInfo = async () => {
        const accountAPI = new AccountAPI();
        try {
          const accountData = await accountAPI.getAccountInfo(token);
          setAccountId(accountData.id);
        } catch (error) {
          console.error("Error fetching account info:", error);
        }
      };
      fetchAccountInfo();
    }
  }, [token]);

  useEffect(() => {
    if (accountId) {
      const fetchCards = async () => {
        try {
          const response = await cardService.getCardsByAccountId(
            accountId,
            token
          );
          setCards(response);
        } catch (error) {
          console.error("Error fetching cards:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCards();
    }
  }, [accountId, token]);

  const handleDelete = async (accountId, cardId, token) => {
    try {
      await cardService.deleteCard(accountId, cardId, token);
      setCards(cards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const confirmDelete = (accountId, cardId, token) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(accountId, cardId, token);
        Swal.fire("Eliminada", "La tarjeta ha sido eliminada.", "success");
      }
    });
  };

  if (loading) {
    return <div className="text-custom-dark mt-4">Cargando tarjetas...</div>;
  }

  return (
    <div className="bg-white rounded-lg p-6 mt-4 w-full max-w-[350px] sm:max-w-[511px] lg:max-w-[1006px]">
      <h3 className="text-xl font-bold text-custom-dark mb-4">
        Tus tarjetas
      </h3>
      <ul>
        {cards.length > 0 ? (
          cards.map((card) => (
            <li
              key={card?.id}
              className="flex justify-between items-center border-b border-custom-gray-light py-4">
              <div className="flex items-center">
                <div className="w-[32px] h-[32px] bg-custom-lime rounded-full mr-4"></div>
                <p className="text-custom-dark text-[16px]">
                  Terminada en {card?.number_id?.toString().slice(-4)}
                </p>
              </div>
              <button
                onClick={() => confirmDelete(accountId, card.id, token)}
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

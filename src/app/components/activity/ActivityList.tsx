"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { transactionsAPI } from "../../../services/transactions/transactions.service";
import AccountAPI from "@/services/account/account.service";

const ActivityList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado");
        const accountAPI = new AccountAPI();
        const accountData = await accountAPI.getAccountInfo(token);
        const accountId = accountData.id;
        let transactions = await transactionsAPI.getAllTransactions(accountId);
        transactions = transactions.sort(
          (a, b) => new Date(b.dated) - new Date(a.dated)
        );
        setActivities(transactions.slice(0, 10));
        setFilteredActivities(transactions.slice(0, 10));
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    const filtered = activities.filter((activity) =>
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredActivities(filtered);
  }, [searchTerm, activities]);

  return (
    <div className="w-[350px] md:w-[511px] lg:w-[1006px]">
      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <div className="relative flex items-center">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-0 text-gray-400 pt-1"
          />
          <input
            type="text"
            placeholder="Buscar en tu actividad"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-[10px] pl-6 pr-4 text-custom-dark placeholder:text-[18px] pt-1"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-[16px] font-bold mb-4 text-black">Tu actividad</h2>
        {filteredActivities.length === 0 ? (
          <p className="text-center text-custom-gray">
            Todavía no tienes actividad.
          </p>
        ) : (
          <ul className="space-y-4 relative pr-[30px]">
            {filteredActivities.map((activity, index) => (
              <li
                key={index}
                className="relative flex justify-between items-center h-[55px]">
                <div className="flex items-center z-10">
                  <span className="w-[32px] h-[32px] bg-custom-lime rounded-full mr-2"></span>
                  <span className="text-custom-dark text-[16px]">
                    {activity.description}
                  </span>
                </div>
                <div className="z-10 flex flex-col items-end flex-grow text-right">
                  <span className="text-custom-dark">
                    ${activity.amount.toFixed(2)}
                  </span>
                  <div className="text-[16px] text-custom-gray-light">
                    {new Date(activity.dated).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-between items-center w-full sm:w-[300px] md:w-[480px] lg:w-[926px]">
          <button className="mt-4 text-black font-bold hover:underline">
            Ver toda tu actividad
          </button>
          <FontAwesomeIcon
            className="text-black"
            icon={faArrowRight}
            style={{ width: "18px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityList;

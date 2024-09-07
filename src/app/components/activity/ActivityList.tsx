"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AccountAPI from "../../../services/account/account.service";
import { transactionsAPI } from "../../../services/transactions/transactions.service";

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
    <div className="bg-white rounded-lg shadow p-4 mt-4 w-full max-w-[350px] sm:max-w-[511px] lg:max-w-[1006px]">
      <div className="relative flex items-center mb-4">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 text-gray-400"
        />
        <input
          type="text"
          placeholder="Buscar en tu actividad"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-[10px] pl-12 pr-4"
        />
      </div>
      <div className="bg-white rounded-lg shadow p-4 w-full mt-6">
        <h2 className="text-lg font-semibold mb-4">Tu actividad</h2>
        <ul className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="w-4 h-4 bg-lime-500 rounded-full mr-2"></span>
                <span>{activity.description}</span>
              </div>
              <div className="text-right">
                <span>{`$${activity.amount.toFixed(2)}`}</span>
                <div className="text-sm text-gray-500">
                  {new Date(activity.dated).toLocaleDateString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-4 text-blue-500 hover:underline">
          Ver toda tu actividad
        </button>
      </div>
    </div>
  );
};

export default ActivityList;

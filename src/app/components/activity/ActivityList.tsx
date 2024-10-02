"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowRight,
  faFilter,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import AccountAPI from "../../../services/account/account.service";
import { transactionsAPI } from "../../../services/transactions/transactions.service";

interface Activity {
  id: number;
  description: string;
  dated: string;
  amount: number;
}

const ActivityList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [path, setPath] = useState<string>("");
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsClient(true);
    setPath(window.location.pathname);
  }, []);

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
          (a: Activity, b: Activity) =>
            new Date(b.dated).getTime() - new Date(a.dated).getTime()
        );
        if (selectedFilter) {
          const now = new Date();
          let startDate: Date;
          let endDate: Date;
          switch (selectedFilter) {
            case "hoy":
              startDate = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
              );
              endDate = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() + 1
              );
              break;
            case "ayer":
              startDate = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() - 1
              );
              endDate = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
              );
              break;
            case "ultima-semana":
              startDate = new Date(now.setDate(now.getDate() - 7));
              endDate = new Date();
              break;
            case "ultimos-dias":
              startDate = new Date(now.setDate(now.getDate() - 15));
              endDate = new Date();
              break;
            case "ultimo-mes":
              startDate = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                now.getDate()
              );
              endDate = new Date();
              break;
            case "ultimo-ano":
              startDate = new Date(
                now.getFullYear() - 1,
                now.getMonth(),
                now.getDate()
              );
              endDate = new Date();
              break;
            default:
              startDate = new Date(0);
              endDate = new Date();
          }
          transactions = transactions.filter(
            (activity: Activity) =>
              new Date(activity.dated) >= startDate &&
              new Date(activity.dated) < endDate
          );
        }
        setActivities(transactions);
        setFilteredActivities(transactions);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [selectedFilter]);

  useEffect(() => {
    const filtered = activities.filter((activity) =>
      activity?.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredActivities(filtered);
    setCurrentPage(1);
  }, [searchTerm, activities]);

  const indexOfLastActivity = currentPage * itemsPerPage;
  const indexOfFirstActivity = indexOfLastActivity - itemsPerPage;
  const currentActivities =
    path === "/home"
      ? filteredActivities.slice(0, itemsPerPage)
      : filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const goToActivityPage = () => {
    window.location.href = "/activity";
  };

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const applyFilter = () => {
    const selectedOption = (
      document.querySelector('input[name="filter"]:checked') as HTMLInputElement
    )?.id;
    setSelectedFilter(selectedOption || "");
    setShowFilterMenu(false);
  };

  const clearFilters = () => {
    setSelectedFilter("");
    setFilteredActivities(activities);
    setSearchTerm("");
    setShowFilterMenu(false);
  };

  const handleActivityClick = (activityId: number) => {
    localStorage.setItem("selectedTransactionId", activityId.toString());
    window.location.href = "/detail-activity";
  };

  if (loading) {
    return (
      <div className="flex bg-custom-white justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#C1FD35"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="w-[350px] md:w-[511px] lg:w-[1006px]">
      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <div className="relative flex items-center">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-0 text-custom-gray"
          />
          <input
            type="text"
            placeholder="Buscar en tu actividad"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-[10px] pl-6 pr-4 text-custom-dark placeholder:text-[18px] pt-1"
          />
          {isClient && path === "/activity" && (
            <button
              onClick={toggleFilterMenu}
              className="ml-4 px-4 py-2 bg-custom-lime text-custom-dark rounded-[10px] flex items-center hover:bg-custom-lime-dark">
              <span className="mr-2 font-bold">Filtrar</span>
              <FontAwesomeIcon icon={faFilter} />
            </button>
          )}
        </div>
      </div>
      {showFilterMenu && (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
          <h3 className="text-lg font-bold ml-2 mb-2 text-custom-dark">
            Filtrar por período
          </h3>
          <ul className="space-y-2 ml-2">
            <li>
              <input type="radio" id="hoy" name="filter" />
              <label htmlFor="hoy" className="ml-2 text-black-opacity-50">
                Hoy
              </label>
            </li>
            <li>
              <input type="radio" id="ayer" name="filter" />
              <label htmlFor="ayer" className="ml-2 text-black-opacity-50">
                Ayer
              </label>
            </li>
            <li>
              <input type="radio" id="ultima-semana" name="filter" />
              <label
                htmlFor="ultima-semana"
                className="ml-2 text-black-opacity-50">
                Última semana
              </label>
            </li>
            <li>
              <input type="radio" id="ultimos-dias" name="filter" />
              <label
                htmlFor="ultimos-dias"
                className="ml-2 text-black-opacity-50">
                Últimos 15 días
              </label>
            </li>
            <li>
              <input type="radio" id="ultimo-mes" name="filter" />
              <label
                htmlFor="ultimo-mes"
                className="ml-2 text-black-opacity-50">
                Último mes
              </label>
            </li>
            <li>
              <input type="radio" id="ultimo-ano" name="filter" />
              <label
                htmlFor="ultimo-ano"
                className="ml-2 text-black-opacity-50">
                Último año
              </label>
            </li>
          </ul>
          <button
            className="mt-4 px-4 py-2 ml-2 bg-custom-lime text-custom-dark font-bold rounded-[10px] hover:bg-custom-lime-dark"
            onClick={applyFilter}>
            Aplicar
          </button>
          <button
            className="mt-2 ml-4 px-4 py-2 ml-2 bg-custom-red text-custom-dark font-bold rounded-[10px] hover:bg-red-600"
            onClick={clearFilters}>
            <FontAwesomeIcon icon={faTimes} className="mr-2" />
            Borrar filtros
          </button>
        </div>
      )}
      <div className="bg-white rounded-lg p-4 w-full mt-6">
        <h2 className="text-lg font-bold mb-4 text-custom-dark ml-2">
          Tu actividad
        </h2>
        {filteredActivities.length === 0 ? (
          <p className="text-center text-custom-gray ml-2">
            No se encontró ninguna actividad
          </p>
        ) : (
          <ul className="space-y-4">
            {currentActivities.map((activity, index) => (
              <li
                key={index}
                className="flex justify-between items-center cursor-pointer ml-2"
                onClick={() => handleActivityClick(activity.id)}>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-custom-lime rounded-full mr-2"></span>
                  <span className="text-custom-dark">
                    {activity.description}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-custom-dark">
                    ${activity.amount.toFixed(2)}
                  </span>
                  <div className="text-sm text-custom-gray">
                    {new Date(activity.dated).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {isClient && path === "/activity" && totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`mx-1 px-3 py-1 rounded-md ${
                  i + 1 === currentPage
                    ? "bg-custom-lime text-custom-dark"
                    : "bg-custom-gray-light text-custom-gray"
                }`}
                onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
        {isClient && path !== "/activity" && (
          <div className="flex justify-between items-center w-full sm:w-[300px] md:w-[480px] lg:w-[974px]">
            <button
              className="mt-4 ml-2 text-custom-dark font-bold hover:underline"
              onClick={goToActivityPage}>
              Ver más
            </button>
            <FontAwesomeIcon
              className="text-black mt-4 hover:cursor-pointer"
              icon={faArrowRight}
              style={{ width: "18px" }}
              onClick={goToActivityPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityList;

"use client";
import React, { useEffect, useState } from "react";
import { ServiceAPI } from "../../../services/service/service.service";
import Menu from "@/app/components/menu/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faSearch } from "@fortawesome/free-solid-svg-icons";

const ServicePage = () => {
  const [services, setServices] = useState<
    { id: number; name: string; date: string }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await ServiceAPI.getAllServiceIds();
        const sortedServices = response.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setServices(sortedServices);
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter((service) =>
    service?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectService = (serviceName: string) => {
    const encodedServiceName = encodeURIComponent(serviceName);
    window.location.href = `/account-number?name=${encodedServiceName}`;
  };

  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-6 flex flex-col items-center min-h-screen bg-custom-white">
        <h1 className="text-2xl font-bold mb-6 sm:hidden text-custom-dark">
          Pagar servicios
        </h1>
        <div className="w-full max-w-xl mb-6 relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-custom-gray"
          />
          <input
            type="text"
            className="w-full px-12 py-2 text-custom-dark border border-custom-gray rounded-lg shadow-sm"
            placeholder="Buscá entre más de 5,000 empresas"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4 text-custom-dark">
            Más recientes
          </h2>
          {filteredServices.length === 0 ? (
            <p className="text-center text-custom-gray">No hay coincidencias.</p>
          ) : (
            <ul>
              {filteredServices.map((service) => (
                <li
                  key={service.id}
                  className="flex justify-between items-center py-3 border-b border-custom-gray-light">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="text-custom-gray"
                    />
                    <span className="text-custom-dark">{service.name}</span>
                  </div>
                  <button
                    className="text-custom-dark font-bold"
                    onClick={() => handleSelectService(service.name)}>
                    Seleccionar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default ServicePage;
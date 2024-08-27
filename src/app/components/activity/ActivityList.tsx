"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ActivityList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-4 w-[1006px] h-[64px]">
      <div className="relative flex items-center mb-4">
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
  );
};

export default ActivityList;

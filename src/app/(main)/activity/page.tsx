"use client";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Menu from "@/app/components/menu/Menu";
import ActivityList from "@/app/components/activity/ActivityList";

const ActivityPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
      <main className="flex-1 p-4 flex flex-col items-center min-h-screen bg-custom-white">
        <h1 className="block text-2xl text-custom-dark font-bold mb-4 sm:hidden">
          Actividad
        </h1>
        <ActivityList />
      </main>
    </div>
  );
};

export default ActivityPage;

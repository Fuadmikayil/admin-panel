"use client";
import React, { useEffect, useState } from "react";
import data from "../data"; 

export default function Cars() {
  const [cars, setCars] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    try {
      setCars(data.cars);
    } catch (err) {
      setError("Məlumatları yükləmək mümkün olmadı");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <p className="text-center text-gray-600">Məlumatlar yüklənir...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center text-neutral-50 mb-6">Maşınlar</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <li
            key={car.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
             <img
              src={car.image}
              alt={car.name}
              className="w-full h-72 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-2 text-gray-800 mb-2">{car.name}</h2>
            <p className="text-gray-600 mb-2">İli: {car.year}</p>
            <p className="text-gray-600 mb-4">Rəngi: {car.color}</p>
           
          </li>
        ))}
      </ul>
    </div>
  );
}

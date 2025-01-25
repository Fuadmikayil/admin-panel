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

  if (loading) return <p>Məlumatlar yüklənir...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Maşınlar</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id} style={{ marginBottom: "20px" }}>
            <h2>{car.name}</h2>
            <p>İli: {car.year}</p>
            <p>Rəngi: {car.color}</p>
            <img
              src={car.image}
              alt={car.name}
              style={{ width: "200px", borderRadius: "10px" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

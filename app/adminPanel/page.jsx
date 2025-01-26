"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import data from "../data";

export default function AdminPanel() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addCarDisplay, setAddCarDisplay] = useState(false);
  const [newCar, setNewCar] = useState({
    name: "",
    year: "",
    color: "",
    image:
      "https://t3.ftcdn.net/jpg/06/36/85/26/360_F_636852679_qpdoYkP6WXtLhiQxpb4oWZP0QmF4ybxH.jpg",
  });

  const handleAddCar = () => {
    setAddCarDisplay(!addCarDisplay);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!newCar.name || !newCar.year || !newCar.color) {
      setError("Bütün sahələri doldurun!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/cars", newCar);
      setCars((prevCars) => [
        ...prevCars,
        { ...newCar, id: prevCars.length + 1 },
      ]);
      setNewCar({
        name: "",
        year: "",
        color: "",
        image:
          "https://t3.ftcdn.net/jpg/06/36/85/26/360_F_636852679_qpdoYkP6WXtLhiQxpb4oWZP0QmF4ybxH.jpg",
      });
      setAddCarDisplay(false);
      setError(null);
    } catch (err) {
      setError("Məlumat göndərmək mümkün olmadı");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      setCars(data.cars);
    } catch {
      setError("Məlumatları yükləmək mümkün olmadı");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <p className="text-center text-gray-600">Məlumatlar yüklənir...</p>;
  if (error && !addCarDisplay) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold text-center text-neutral-50 mb-6">
          Maşınlar
        </h1>
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
              <h2 className="text-xl font-semibold mt-2 text-gray-800 mb-2">
                {car.name}
              </h2>
              <p className="text-gray-600 mb-2">İli: {car.year}</p>
              <p className="text-gray-600 mb-4">Rəngi: {car.color}</p>
            </li>
          ))}
        </ul>
        <button
          onClick={handleAddCar}
          className="mt-6 block mx-auto px-6 py-2 font-semibold text-black bg-white rounded-lg shadow-lg hover:bg-lime-200 focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300"
        >
          Yeni Maşın Əlavə Et
        </button>
      </div>

      <section
        className={`w-full h-screen bg-zinc-800 bg-opacity-90 flex justify-center fixed ${
          addCarDisplay ? "flex" : "hidden"
        } items-center top-0 py-6`}
      >
        <div className="w-[500px] relative h-[600px] flex justify-center bg-white rounded-lg shadow-lg">
          <i
            onClick={handleAddCar}
            className="top-2 font-bold text-xl text-red-700 absolute right-4 cursor-pointer"
          >
            X
          </i>

          <div className="space-y-4 max-w-md p-14 mx-auto">
            {error && (
              <p className="text-center text-red-600 font-medium">{error}</p>
            )}
            <div>
              <img
                src={newCar.image}
                className="w-full object-cover rounded-lg w-[300px] h-[200px] mx-auto"
              />
              <label
                htmlFor="fileInput"
                className="block mt-4 text-center py-4 cursor-pointer bg-[#262629] text-white rounded-lg shadow-lg transition-all duration-300"
              >
                Şəkil Yüklə
              </label>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={(e) =>
                  setNewCar((prevCar) => ({
                    ...prevCar,
                    image: URL.createObjectURL(e.target.files[0]),
                  }))
                }
              />
            </div>
            <input
              type="text"
              name="name"
              value={newCar.name}
              placeholder="Maşın Adı"
              onChange={handleInputChange}
              className="w-full text-neutral-900 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 transition-all duration-300"
            />
            <input
              type="text"
              name="year"
              value={newCar.year}
              placeholder="Maşının İli"
              onChange={handleInputChange}
              className="w-full text-neutral-900 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 transition-all duration-300"
            />
            <input
              type="text"
              name="color"
              value={newCar.color}
              placeholder="Maşının Rəngi"
              onChange={handleInputChange}
              className="w-full text-neutral-900 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 transition-all duration-300"
            />
            <button
              onClick={handleSubmit}
              className="block w-full tracking-wider px-6 py-2 cursor-pointer bg-[#262629] text-white rounded-lg shadow-lg transition-all duration-300"
            >
              Əlavə Et
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

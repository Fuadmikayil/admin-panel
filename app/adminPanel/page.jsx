"use client";
import React, { useEffect, useState } from "react";
import data from "../data";

export default function AdminPanel() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addCarDisplay, setAddCarDisplay] = useState(false);

  function handleAddCar() {
    setAddCarDisplay(!addCarDisplay);
  }
  useEffect(() => {
    try {
      setCars(data.cars);
    } catch (err) {
      setError("Məlumatları yükləmək mümkün olmadı");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading)
    return <p className="text-center text-gray-600">Məlumatlar yüklənir...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold text-center text-neutral-50 mb-6">
          Maşınlar
        </h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <li
            key={"1"}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src="https://t3.ftcdn.net/jpg/06/36/85/26/360_F_636852679_qpdoYkP6WXtLhiQxpb4oWZP0QmF4ybxH.jpg"
              className="w-full h-72 object-cover rounded-lg"
            />
            <button
            onClick={handleAddCar} className="px-6 w-full mt-10 py-2 font-semibold text-white bg-black rounded-lg shadow-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300">
              ADD
            </button>
          </li>
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
      </div>
      <section className={`w-full h-screen  bg-zinc-800  bg-opacity-90 flex justify-center  fixed ${addCarDisplay ? "flex" : "hidden" }  items-center  top-0 py-6`}>
        <div className="w-[500px] relative h-[600px] flex justify-center bg-white rounded-lg shadow-lg">
          <i onClick={handleAddCar} className=" top-2 font-bold text-xl text-red-700 absolute right-4 cursor-pointer"> X</i>

          <div className="space-y-4 max-w-md p-14 mx-auto">
            <div>
            <img
              src="https://t3.ftcdn.net/jpg/06/36/85/26/360_F_636852679_qpdoYkP6WXtLhiQxpb4oWZP0QmF4ybxH.jpg"
              className="w-full  object-cover rounded-lg"
            />
              <label
                htmlFor="fileInput"
                className="block mt-4 text-center py-4 cursor-pointer bg-[#262629] bg-opacity-100 text-white rounded-lg shadow-lg  focus:ring-4 focus:ring-[#262629] focus:ring-opacity-50 transition-all duration-300"
              >
                Upload Image
              </label>
              <input id="fileInput" type="file" className="hidden" />
            </div>
            <input
              type="text"
              placeholder="Car Name"
              className="w-full text-neutral-900 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#262629] focus:border-[#262629] transition-all duration-300"
            />
            <input
              type="text"
              placeholder="Car Year"
              className="w-full text-neutral-900 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#262629] focus:border-[#262629] transition-all duration-300"
            />
            <input
              type="text"
              placeholder="Car Color"
              className="w-full text-neutral-900 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#262629] focus:border-[#262629] transition-all duration-300"
            />
            <button className="block w-full tracking-wider px-6 py-2 cursor-pointer bg-[#262629] bg-opacity-100 text-white rounded-lg shadow-lg  focus:ring-4 focus:ring-[#262629] focus:ring-opacity-50 transition-all duration-300">
              Add
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

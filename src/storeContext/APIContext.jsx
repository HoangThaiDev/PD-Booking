// Import Modules
import axios from "axios";
import { API_ROOT } from "../utils/constant";

// Import Hooks
import React, { createContext, useEffect, useState } from "react";

// Create Context (Hook)
const APIContext = createContext();

export default function Provider({ children }) {
  // Create + use Hooks
  const [data, setData] = useState({
    cities: [],
    resorts: [],
    rooms: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const { data: dataCity } = await axios.get(`${API_ROOT}/cities`);
        const { data: dataResort } = await axios.get(`${API_ROOT}/resorts`);
        const { data: dataRoom } = await axios.get(`${API_ROOT}/rooms`);

        setData({
          cities: dataCity ? dataCity : [],
          resorts: dataResort ? dataResort : [],
          rooms: dataRoom ? dataRoom : [],
        });
        setIsLoading(true);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchCity();
  }, []);

  return (
    <>
      {isLoading &&
        data.cities.length > 0 &&
        data.resorts.length > 0 &&
        data.rooms.length > 0 && (
          <APIContext.Provider value={data}>{children}</APIContext.Provider>
        )}
    </>
  );
}

export { APIContext };

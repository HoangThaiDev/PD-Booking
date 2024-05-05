// Import Modules
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_ROOT } from "../utils/constant";

const APIContext = createContext();

export default function Provider({ children }) {
  // Create + use Hooks
  const [data, setData] = useState({
    city: [],
    resort: [],
    room: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const { data: dataCity } = await axios.get(`${API_ROOT}/cities`);
        const { data: dataResort } = await axios.get(`${API_ROOT}/resorts`);
        const { data: dataRoom } = await axios.get(`${API_ROOT}/rooms`);

        setData({
          city: dataCity ? dataCity : [],
          resort: dataResort ? dataResort : [],
          room: dataRoom ? dataRoom : [],
        });
        setIsLoading(true);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchCity();
  }, []);
  return (
    <>
      {isLoading &&
        data.city.length > 0 &&
        data.resort.length > 0 &&
        data.room.length > 0 && (
          <APIContext.Provider value={data}>{children}</APIContext.Provider>
        )}
    </>
  );
}

export { APIContext };

// Import Modules
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

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
        const { data: dataCity } = await axios.get(
          "http://localhost:5000/cities"
        );
        const { data: dataResort } = await axios.get(
          "http://localhost:5000/resorts"
        );
        const { data: dataRoom } = await axios.get(
          "http://localhost:5000/rooms"
        );

        setData({
          city: dataCity ? dataCity : [],
          resort: dataResort ? dataResort : [],
          room: dataRoom ? dataRoom : [],
        });
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCity();
  }, []);
  return (
    <>
      {isLoading && (
        <APIContext.Provider value={data}>{children}</APIContext.Provider>
      )}
    </>
  );
}

export { APIContext };

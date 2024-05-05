// Import Modules
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_ROOT } from "../utils/constant";

// Import Components
import About from "../components/DetailCity/About";
import Header from "../UI/Header";

export default function DetailCity() {
  // Create + use Hooks
  const { state } = useLocation();
  const [city, setCity] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetailCity = async () => {
      try {
        const { data } = await axios.get(
          `${API_ROOT}/cities/detail/${state.id}`
        );
        setCity(data);
        setIsLoading(!isLoading);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailCity();
  }, [state.id]);

  return (
    <div>
      {isLoading && Object.keys(city).length > 0 && (
        <>
          <Header
            banner={city.banner}
            title="Detail City"
            content="The city is filled with style, culinary specialties, customs and
          culture"
          />
          <About city={city} />
        </>
      )}
    </div>
  );
}

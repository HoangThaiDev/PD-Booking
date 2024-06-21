// Import Modules
import axios from "axios";
import { API_ROOT } from "../utils/constant";

// Import Hooks
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Import Components
import About from "../components/DetailCity/About";
import Header from "../UI/Header";

export default function DetailCity({ cities }) {
  // Create + use Hooks
  const { state } = useLocation();
  const [city, setCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetailCity = async () => {
      try {
        const response = await axios.get(
          `${API_ROOT}/cities/detail/${state.cityId}`
        );

        if (response.status === 200) {
          setCity(response.data);
          setIsLoading(!isLoading);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchDetailCity();
  }, [state.cityId]);

  return (
    <div>
      {isLoading && Object.keys(city).length > 0 && (
        <>
          <Header
            banner={city.banner}
            title="Detail City"
            content="The city is filled with style, culinary specialties, customs and
          culture"
            cities={cities}
          />
          <About city={city} />
        </>
      )}
    </div>
  );
}

// Import Modules
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function DetailCity() {
  // Create + use Hooks
  const { state } = useLocation();
  const [city, setCity] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchDetailCity = async () => {
      const response = await axios.get(
        `http://localhost:5000/cities/detail/${state.id}`
      );
    };
    fetchDetailCity();
  }, [state.id]);

  return <div>DetailCity</div>;
}

// Import Modules
import axios from "axios";
import { API_ROOT } from "../utils/constant";

// Import Hooks
import React, { useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";

// Import Components
import About from "../components/DetailResort/About";
import Header from "../UI/Header";
import RelatedProduct from "../components/DetailResort/RelatedProduct";

function DetailResort({ cities }) {
  // Create + use Hooks
  const { state } = useLocation();
  const [resort, setResort] = useState();
  const [otherResorts, setOtherResorts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetailResort = async () => {
      try {
        const response = await axios.get(
          `${API_ROOT}/resorts/detail/${state.resortId}`
        );
        if (response.status === 200) {
          const { current_resort, other_resorts } = response.data;
          setResort(current_resort);
          setOtherResorts(other_resorts);
          setIsLoading(true);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchDetailResort();
  }, [state.resortId]);

  return (
    <div>
      {isLoading && Object.keys(resort).length > 0 && (
        <>
          <Header
            banner={resort.banner}
            title="Detail Resort"
            content="The resort is filled with style, culinary specialties, customs and
      culture"
            cities={cities}
          />
          <About resort={resort} />
          <RelatedProduct resorts={otherResorts} />
        </>
      )}
    </div>
  );
}

export default memo(DetailResort);

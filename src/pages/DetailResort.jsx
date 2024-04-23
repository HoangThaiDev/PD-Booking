// Import Modules
import React, { useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Import Components
import About from "../components/DetailResort/About";
import Header from "../UI/Header";
import RelatedProduct from "../components/DetailResort/RelatedProduct";

function DetailResort() {
  // Create + use Hooks
  const { state } = useLocation();
  const [resort, setResort] = useState();
  const [otherResorts, setOtherResorts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetailResort = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/resorts/detail/${state.id}`
        );
        const { current_resort, other_resorts } = data;
        setResort(current_resort);
        setOtherResorts(other_resorts);
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailResort();
  }, [state.id]);

  return (
    <div>
      {isLoading && Object.keys(resort).length > 0 && (
        <>
          <Header
            banner={resort.banner}
            title="Detail Resort"
            content="The resort is filled with style, culinary specialties, customs and
      culture"
          />
          <About resort={resort} />
          <RelatedProduct resorts={otherResorts} />
        </>
      )}
    </div>
  );
}

export default memo(DetailResort);

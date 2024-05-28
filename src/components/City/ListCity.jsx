// Import Modules
import axios from "axios";
import { API_ROOT } from "../../utils/constant";

// Import Hooks
import React, { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Import File CSS
import classes from "./css/listCity.module.css";

// Import Components
import { Row, Col } from "antd";
import PaginationCusTom from "../../UI/Pagination";

// Import Icons
import { FaSearch } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import { MdOutlineRefresh } from "react-icons/md";

export default function ListCity({ cities }) {
  // Create + use Hooks
  const [citiesSlice, setCitiesSlice] = useState(cities.slice(0, 4));
  const [refreshPage, setRefreshPage] = useState(false);
  const nameCityRef = useRef("");
  const navigate = useNavigate();

  // Create + use event Handlers
  const findCityByNameHandler = async () => {
    try {
      const { data } = await axios.post(`${API_ROOT}/cities/search`, {
        name: nameCityRef.current.value,
      });
      setCitiesSlice(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSliceCityHandler = useCallback((value, restart) => {
    setCitiesSlice(value);
    setRefreshPage(restart);
  }, []);

  const navigateCityDetailHandler = (id, name) => {
    const modifiedName = name.split(" ").join("-");
    navigate(`/city/${modifiedName}`, { state: { id: id } });
  };

  const refreshDataCityHandler = () => {
    setCitiesSlice(cities);
    setRefreshPage(!refreshPage);
  };

  return (
    <div className={classes.cities}>
      <div className={classes["cities__container"]}>
        <h1 className={classes["cities__title"]}>Browse All Cities</h1>
        <Row className={classes["cities__options"]}>
          <Col className={classes.col} xs={24} sm={16} md={16} xl={10}>
            <div>
              <input
                className={classes["input-search"]}
                type="text"
                placeholder="Search Your City...."
                ref={nameCityRef}
              />
              <FaSearch
                className={classes.iconSearch}
                onClick={findCityByNameHandler}
              />
              <MdOutlineRefresh
                className={classes.iconRefresh}
                onClick={refreshDataCityHandler}
              />
            </div>
          </Col>
        </Row>
        <Row className={classes["cities__list"]}>
          {citiesSlice.length > 0 &&
            citiesSlice.map((c, i) => (
              <Col className={classes["cities__item"]} key={c._id}>
                <img src={c.banner} alt={c.banner} />
                <div className={classes["cities__form"]}>
                  <h1 className={classes["form__name"]}>{c.name}</h1>
                  <p className={classes["form__link"]}>
                    <BsInfoCircleFill className={classes.iconInfo} />
                    Infomation:
                    <button
                      className={classes["btn-link"]}
                      type="button"
                      onClick={() => navigateCityDetailHandler(c._id, c.name)}
                    >
                      Read More
                    </button>
                  </p>
                </div>
              </Col>
            ))}
        </Row>
        <Row className={classes["cities__pagination"]}>
          <Col className={classes.col} xs={24} sm={24} md={24} lg={24} xl={24}>
            <PaginationCusTom
              data={cities}
              onSaveSliceData={getSliceCityHandler}
              pageSize={citiesSlice.length}
              refresh={refreshPage}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

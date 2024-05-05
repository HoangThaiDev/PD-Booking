// Import Modules
import React, { useState, useRef, useCallback } from "react";
import classes from "./css/listResort.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import Components
import { Row, Col } from "antd";
import PaginationCusTom from "../../UI/Pagination";

// Import Icons
import { FaSearch } from "react-icons/fa";
import { MdOutlineRefresh } from "react-icons/md";
import { API_ROOT } from "../../utils/constant";

export default function ListResort({ resort }) {
  // Create + use Hooks
  const [resorts, setResorts] = useState(resort.slice(0, 4));
  const [refreshPage, setRefreshPage] = useState(false);
  const nameResortRef = useRef("");
  const navigate = useNavigate();

  // Create + use event Handlers

  const findResortByNameHandler = async () => {
    try {
      const { data } = await axios.post(`${API_ROOT}/resorts/search`, {
        name: nameResortRef.current.value,
      });
      setResorts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSliceResortHandler = useCallback((value, restart) => {
    setResorts(value);
    setRefreshPage(restart);
  }, []);

  const navigateResortDetailHandler = (id, name) => {
    const modifiedName = name.split(" ").join("-");
    navigate(`/resort/${modifiedName}`, { state: { id: id } });
  };

  const refreshDataResortHandler = () => {
    setResorts(resort);
    setRefreshPage(true);
  };

  return (
    <div className={classes.resort}>
      <div className={classes["resort__container"]}>
        <h1 className={classes["resort__title"]}>Browse All Resorts</h1>
        <Row className={classes["resort__options"]}>
          <Col className={classes.col} xl={10}>
            <div>
              <input
                className={classes["input-search"]}
                type="text"
                placeholder="Search Your Resort...."
                ref={nameResortRef}
              />
              <FaSearch
                className={classes.iconSearch}
                onClick={findResortByNameHandler}
              />
              <MdOutlineRefresh
                className={classes.iconRefresh}
                onClick={refreshDataResortHandler}
              />
            </div>
          </Col>
          <Col className={classes.col} xl={10}>
            <PaginationCusTom
              data={resort}
              onSaveSliceData={getSliceResortHandler}
              pageSize={resorts.length}
              refresh={refreshPage}
            />
          </Col>
        </Row>
        <Row className={classes["resort__list"]}>
          {resorts.length > 0 &&
            resorts.map((r) => (
              <Col className={classes["resort__item"]} key={r._id}>
                <img src={r.banner} alt={r.banner} />
                <div className={classes["resort__card"]}>
                  <p className={classes["card__address"]}>{r.address}</p>
                  <h3 className={classes["card__name"]}>{r.name}</h3>
                  <button
                    className={classes["card__btn"]}
                    type="button"
                    onClick={() => navigateResortDetailHandler(r._id, r.name)}
                  >
                    Read More
                  </button>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

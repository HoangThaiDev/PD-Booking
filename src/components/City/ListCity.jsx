// Import Modules
import React, { useRef, useState } from "react";
import classes from "./css/listCity.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import Components
import { Row, Col, Pagination, ConfigProvider } from "antd";

// Import Icons
import { FaSearch } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";

export default function cities({ city }) {
  // Create + use Hooks
  const [cities, setCities] = useState(city.slice(0, 4));
  const nameCityRef = useRef("");
  const navigate = useNavigate();

  // Create + use event Handlers
  const findCityByNameHandler = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/cities/search", {
        name: nameCityRef.current.value,
      });
      setCities(data);
    } catch (error) {
      console.log(error);
    }
  };

  const choosePageHandler = (page, pageSize) => {
    const startIndex = (page - 1) * pageSize;
    const sliceCities = city.slice(startIndex, pageSize * page);
    setCities(sliceCities);
  };

  const navigateCityDetailHandler = (id, name) => {
    console.log("hello");
    const modifiedName = name.split(" ").join("-");
    navigate(`/city/${modifiedName}`, { state: { id: id } });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgb(226, 144, 31)",
        },
      }}
    >
      <div className={classes.cities}>
        <div className={classes["cities__container"]}>
          <h1 className={classes["cities__title"]}>Browse All Cities</h1>
          <Row className={classes["cities__options"]}>
            <Col className={classes.col} xl={9}>
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
              </div>
            </Col>
            <Col className={classes.col} xl={10}>
              <Pagination
                className={classes.pagination}
                defaultCurrent={1}
                defaultPageSize={4}
                showTitle={false}
                total={city.length}
                onChange={choosePageHandler}
              />
            </Col>
          </Row>
          <Row className={classes["cities__list"]}>
            {cities.length > 0 &&
              cities.map((c, i) => (
                <Col className={classes["cities__item"]} key={c._id}>
                  <img src={c.banner} alt={c.banner} />
                  <p className={classes.numberCity}>#{i + 1}</p>
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
        </div>
      </div>
    </ConfigProvider>
  );
}

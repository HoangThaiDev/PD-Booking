// Import Modules
import React, { useEffect, useState } from "react";
import "./css/resort.css";
import axios from "axios";

// Import Components
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "antd";

// Import Icons
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Resort() {
  // Create + use Hooks
  const [resort, setResort] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResort = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/resorts");
        const modifiedData = data.slice(0, 3);
        setResort(modifiedData);
        setIsLoading(!isLoading);
      } catch (err) {
        console.log(err);
      }
    };
    fetchResort();
  }, []);

  // Create + use event Handlers

  const navigateResortDetailHandler = (id, name) => {
    const modifiedName = name.split(" ").join("-");
    navigate(`resort/${modifiedName}`, { state: id });
  };

  return (
    <div id="resort">
      <div className="resort-container">
        <div className="resort-header">
          <Row className="resort-header__row">
            <Col className="resort-header__col" xl={10}>
              <h1>The Resorts</h1>
            </Col>
            <Col className="resort-header__col" xl={10}>
              <Link to="resorts">Discover All Resorts</Link>
            </Col>
          </Row>
        </div>
        <div>
          {isLoading &&
            resort.length > 0 &&
            resort.map((r) => (
              <Row className="resort__list" key={r._id}>
                <Col className="resort__item" xl={12}>
                  <img
                    className="resort__item-img"
                    src={r.banner}
                    alt={r.banner}
                  />
                </Col>
                <Col className="resort__item" xl={11}>
                  <div className="resort__item-card">
                    <p>A short Introduce Resort</p>
                    <h1 className="card-title">{r.name}</h1>
                    <p className="card-desc">{r.desc}</p>
                    <button
                      className="card-link"
                      onClick={() => navigateResortDetailHandler(r._id, r.name)}
                    >
                      Resort Detail
                    </button>
                  </div>
                </Col>
              </Row>
            ))}
        </div>
      </div>
    </div>
  );
}

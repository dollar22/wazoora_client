import React from "react";
import "../styles.css";
import { API } from "../user/backend";
import Base from "./Base";
import { useState } from "react";
import axios from "axios";
// import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get(`${API}/product/all`).then((data) => {
      setProduct(data.data.product);
    });
  }, []);

  console.log("API is ", API);
  return (
    <Base title="Home page" description="This is home page">
      {/* <h1>Hello Front-end</h1> */}
      <div className="row align-center">
        {/* {product.map((data, i) => {
          return (
            <div key={i} className="card col-md-3 " style={{ width: "11rem" }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: "black" }}>
                  {data.name}
                </h5>
                <p className="card-text" style={{ color: "black" }}>
                  {data.description}
                </p>
              
              </div>
            </div>
          );
        })} */}
      </div>
    </Base>
  );
};

export default Home;

import { useEffect, useState } from "react";
import Base from "../core/Base";
import axios from "axios";
import React from "react";
import { API } from "./backend";
import { toast } from "react-toastify";
import displayRazorpay from "../utils/Payment";
// import {logo} from '../../public/log'
// import { PaytmButton } from "../paytm/paytmButton";
// import Modal from 'react-modal';

export const Products = () => {
  const [product, setProduct] = useState([]);
  const [prduct, setPrduct] = useState({});


  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)





  useEffect(() => {
    axios.get(`${API}/product/all`).then((data) => {
      setProduct(data.data.product);
    });
  }, []);

  async function handleToken(token, addresses) {
    console.log(token)
    const response = await axios.post(
      `${API}/checkout`,
      { token, prduct }
    );

    const { status } = response.data;

    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }
  const Buy = async (data) => {
    setPrduct(data);
    const response = await fetch(`http://localhost:8000/payment/paymentData/${data.price}`, {
      method: "POST",
      body: JSON.stringify({data})
    }).then((t) => t.json());
    console.log(response)
    displayRazorpay(data)

  };
  return (
      <div className="row">
        {product.map((data, i) => {
          return (
            <div key={i} className="card col-md-3 " style={{ width: "11rem" }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: "black" }}>
                  {data.name}
                </h5>
                <p className="card-text" style={{ color: "black" }}>
                  {data.description}
                </p>
                <p className="card-text" style={{ color: "black" }}>
                  {data.price}₹
                </p>
                <button className="btn btn-primary" onClick={(e) => Buy(data)}>
                  Buy
                </button>
              </div>
            </div>
          );
        })}
      </div>
  );
};
export default Products;

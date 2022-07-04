import { React, useEffect, useState } from "react";
import Base from "../core/Base";
import axios from "axios";
import { API } from "../user/backend";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddProduct = () => {
  const notify = () => toast.success("Success");
  const [items, setItems] = useState({});
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  //  const [ bool,setbool] = useState(false)
  // console.log(items,"setdata")
  useEffect(() => {
    var itemss = JSON.parse(localStorage.getItem("jwt"));
    setItems(itemss.user);
    console.log(items)
    setUserId(itemss.user._id);
  }, []);
  const [product, setProduct] = useState({});

  const { name, description, price } = product;
  const ProductForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                onChange={handleChange("name")}
                value={name}
                className="form-control"
                type="text"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Description</label>
              <textarea
                onChange={handleChange("description")}
                value={description}
                className="form-control"
                type="description"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Price</label>
              <input
                onChange={handleChange("price")}
                value={price}
                className="form-control"
                type="text"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    );
  };

  const handleChange = (name) => (event) => {
    setProduct({ ...product, error: false, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    notify();
    setToken(localStorage.getItem("token"));
    window.location.reload();
  
    // setProduct(event)
    const myvalue = await axios.post(
      `${API}/product/create/${userId}`,
      product,
      {
        headers: {
          authorization: token,
          "content-type": "text/json",
        },
      }
    );

    console.log(myvalue)
  };

  return (
    <Base title="Add Product" description="Add Products to Array!">
      {/* <h1 className='text-center'>Add Product  </h1> */}
      {ProductForm()}
    </Base>
  );
};

import React from "react";
import Base from "../../core/Base";
import { isAutheticated } from "./index";
import { Link } from "react-router-dom";

const AdminRoute = () => {
  const {
    user: { fullName, email, role },
  } = isAutheticated();

  const adminLeftSide = () => {
 
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>

          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/managefiles" className="nav-link text-success">
              Manage Files
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {fullName}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>

          <li className="list-group-item">
            <span className="badge badge-danger">Role</span>{role==1 &&  <span className="badge badge-success ml-2 badge-md">Admin </span> }
                            {role==0 &&  <span className="badge badge-warning ml-2 badge-md">User </span> }
          </li>
          
          {/* <div className="col-md-3">
                            <h5 >{data.role==1 &&  <span className="badge badge-success">Admin </span> }</h5> 
                            <h5 >{data.role==0 &&  <span className="badge badge-warning">User </span> }</h5> 
                            </div> */}
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to admin area"
      description="Manage all of your products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminRoute;

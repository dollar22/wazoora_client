import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";



const UserDashBoard = () => {
  const {
    user: { fullName, email, role,invested ,earned,referToken },
  } = isAutheticated();

  const adminLeftSide = () => {
    console.log(role);
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/products" className="nav-link text-success">
              Products
            </Link>
          </li>

          <li className="list-group-item">
            <Link to="/user/orders" className="nav-link text-success">
              User Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Info</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {fullName}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Invested:</span> {invested} ₹
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Earned:</span> {earned } ₹
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Token :</span> {referToken }
          </li>

          {/* <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li> */}
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome"
      description=""
      className="container bg-success p-4"
    >
      <div className="row">
        {/* <div className="col-3">{adminLeftSide()}</div> */}
        <div className="col">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
// import AdminDashBoard from "./user/AdminDashBoard";
import { AddProduct } from "./admin/AddProduct";
import { MyRoute } from "./admin/MyRoute";
import Order from "./admin/Orders";
import Products from "./user/Products";
import { UserOrders } from "./user/Userorders";
import ManageFile from "./admin/ManageFile";
import { Mainpdf } from "./admin/MainPdf";
import { ResetPassword } from "./user/ResetForm";
import { NewPassword } from "./user/Newpass";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <Route path="/admin/dashboard" exact component={AdminRoute} />
        <Route path="/myroute" exact component={MyRoute} />
        <Route path="/admin/create/product" exact component={AddProduct} />
        <Route path="/admin/orders" exact component={Order} />
        <Route path="/products" exact component={Products} />
        <Route path="/user/orders" exact component={UserOrders} />
        <Route path="/admin/managefiles" exact component={ManageFile} />
        <Route path="/mainpdf" exact component={Mainpdf} />
        <Route path="/reset" exact component={ResetPassword} />
        <Route path="/newpass" exact component={NewPassword} />
       </Switch>
    </BrowserRouter>
  );
};

export default Routes;

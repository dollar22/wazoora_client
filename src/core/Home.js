import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Products from "../user/Products";
import { isAutheticated } from "../auth/helper";
export default function Home() {

  return (
  <Base title="Welcome" description="to WZ Public's store">
{ !isAutheticated() && <div className="card">
  <div className="card-body">
   <p className="text-secondary">WZ Public is best place to invest your money. let's become member by buying our product</p>
  </div>
</div>}

{ isAutheticated() && isAutheticated().user?.invested === 0 && <div className="card">
  <div className="card-body">
   <Products/>
  </div>
</div>}

{ isAutheticated() && isAutheticated().user?.invested !== 0 && <div className="card">
  <div className="card-body">
  <p className="text-secondary">You are allready WZPublic's family member. You can check your dashboard</p>
  </div>
</div>}


         
    </Base>
  );
}

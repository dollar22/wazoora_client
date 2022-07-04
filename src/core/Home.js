import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Products from "../user/Products";
export default function Home() {

  return (
    <Base title="Welcome" description="to WZ Public's store">
  
       
        <div className="card">
  <div className="card-body">
   <p className="text-secondary">WZ Public is best place to invest your money. let's become member by buying our product</p>
  </div>
</div>
          {/* <Products/> */}
    </Base>
  );
}
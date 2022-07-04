import axios from "axios";
import * as React from "react";
import BasicTable from "../utils/BasicTable";
import { API } from "./backend";
import { useState,useEffect } from "react";




const columns =[
  {
    Header: "Id",
    accessor: "id" // accessor is the "key" in the data
  },
  {
    Header: "Order Name",
    accessor: "orderName"
  },
  {
    Header: "Price",
    accessor: "price"
  }
];
const data =[
  {
    company: "Alfred",
    contact: "Maria Anders",
    country: "Germany"
  },
  {
    company: "Centro comercial Moctezuma",
    contact: "Francisco Chang",
    country: "Mexico"
  },
  {
    company: "Ernst Handel",
    contact: "Roland Mendel	",
    country: "Austria"
  }

]


export const UserOrders = () => {
  const [orders , setOrders] = useState('');
  const [user,setUser] = useState({
    email:'',
    fullname:'',
    role:'',
    _id:''
  });
  const [userId,setUserId] =useState('')
  useEffect(()=>{
    let JWT = JSON.parse(localStorage.getItem('jwt'));
    console.log(JWT);
    //  setUser(JSON.parse(localStorage.getItem('jwt')))
     console.log(JSON.parse(localStorage.getItem('jwt')))

      axios.get(`${API}/orders/users${userId}`).then(data=>{
        console.log(data)
      })
   },[])   
  return <BasicTable  columns={columns} data={data} />;
};


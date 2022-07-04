import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Base from "../core/Base";
import { API } from "../user/backend";
// import { Mainpdf } from "./MainPdf";
// import axios from 'axios'

const ManageFile = () =>{
//  const [user,setUser] = useState({});
const [data,SetData] = useState([]);
// const [propdata,setpropdata] = useState({})
const history = useHistory()
  const  getRecents = async () =>{
  const res  = await   axios.get(`${API}/users/recents`);

  SetData(res.data.user)  }
  const dateResolve = (date)=>{
    return date.split("T")[0]
  }

 const  DownloadPdf= (data)=>{
localStorage.setItem('userdata',JSON.stringify(data))
history.push('/mainpdf')
// navigate('/mainpdf')

}

const deletePDf = async (data) =>{
  console.log(data)
  let formdata={
    token:data.previousToken,
    name:data.fullName
  }

   fetch(`${API}/delete`, {
    method: "POST",
    body: JSON.stringify(formdata
    ),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
}).then(response =>response.json().then((json)=>{
   if(json.status === 200 ){
    toast("Success File Deleted")
    getRecents()
   }
   else{
    toast.error(json.msg)
   }
})
)}

 useEffect(()=>{
   getRecents()
     
 },[])

 const Table= () =>{
  return (
    <table id="example" className="table table-striped table-bordered table-sm" style={{width:"100%"}}>
                <thead>
                  <tr>
                    <th className="text-center"> Id</th>
                    {/* <th className="text-center">Country Code</th> */}
                    <th className="text-center">Name</th>
                    <th className="text-center">Phone No</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length !== 0 && data.map((x,i)=>{
                        return<tr key={i}>
                            <td>{x._id}</td>
                            <td>{x.fullName}</td>
                            <td>{x.phoneNumber}</td>
                            <td>{x.email}</td>
                            <td>{dateResolve(x.createdAt)}</td>
                            <td className="text-center"><button type="button" className="btn btn-sm bg-gradient-danger mb-0" onClick={(e)=>deletePDf(x)}><i
                      className="fa fa-trash">delete</i></button>
                       <button className="btn btn-success btn-sm ml-1" onClick={(e)=>DownloadPdf(x)}  >Download</button>
                      </td>
                        </tr>
                    
                    })}
                </tbody>
              </table>
  )
 }






 return (
   <Base title="Manage File" description="Download User Files From Here" >
    {/* <h1 className="text-center">Manage File </h1> */}
    {Table()}
    {/* <Mainpdf /> */}
    <ToastContainer />
   </Base>


 );

//  return<h1>Manage File</h1>
}





export default ManageFile;
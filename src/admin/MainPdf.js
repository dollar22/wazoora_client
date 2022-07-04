import { useEffect, useState } from "react";
// import axios from "axios";
import Pdf from "react-to-pdf";
import React from "react";
import { API } from "../user/backend";
import Base from "../core/Base";
const ref = React.createRef();
const dateResolve = (date) => {
    return date?.split("T")[0]
}


export const Mainpdf = () => {
    const Table = () => {
        return (
            <table id="example" className="table table-striped table-bordered table-sm" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th className="text-center"> Id</th>
                        {/* <th className="text-center">Country Code</th> */}
                        <th className="text-center">Name</th>
                        <th className="text-center">Phone No</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Date</th>
                        <th className="text-center"> Bank Number</th>
                        <th className="text-center">IFSC</th>
                    </tr>
                </thead>
                <tbody>
                    {pdf.users?.length !== 0 && pdf.users?.map((x, i) => {
                        return <tr key={i}>
                            <td className="text-center">{x?._id}</td>
                            <td className="text-center">{x?.fullName}</td>
                            <td className="text-center">{x?.phoneNumber}</td>
                            <td className="text-center">{x?.email}</td>
                            <td className="text-center">{dateResolve(x?.createdAt)}</td>
                            <td className="text-center">{x?.bankAccountNumber}</td>
                            <td className="text-center">{x?.ifsc_code}</td>

                        </tr>

                    })}
                </tbody>
            </table>
        )
    }
    const SignUpUser = () => {
        return (
            <div className="row" style={{ border: "solid 2px green", padding: "1px" }}>
                {/* <div className="col-md-3 ">
              <h5> {user._id}</h5> 
            </div> */}
                <div className="col-md-3 offset-col-md-3">
                    <h5> {user.fullName}</h5>
                </div>
                {/* <div className="col-md-3">
                <h5>{user.createdAt}</h5>  
            </div> */}
                {/* <div className="col-md-3">
            <h5 >{user.role==1 &&  <span className="badge badge-success">Admin </span> }</h5> 
            <h5 >{user.role==0 &&  <span className="badge badge-success">User </span> }</h5> 
            </div> */}
            </div>
        )
    }
    const PDfTable = () => {
        return (
            <table id="example" className="table table-striped table-bordered table-sm" style={{ width: "50%", marginRight: "400px" }}>
                <thead>
                    <tr>
                        {/* <th className="text-center">Country Code</th> */}
                        <th className="text-center">Name</th>
                        <th className="text-center"> Bank Number</th>
                        <th className="text-center">IFSC</th>
                    </tr>
                </thead>
                <tbody>
                    {pdf.users?.length !== 0 && pdf.users?.map((x, i) => {
                        return <tr key={i}>

                            <td className="text-center">{x.fullName}</td>
                            <td className="text-center">{x.bankAccountNumber}</td>
                            <td className="text-center">{x.ifsc_code}</td>

                        </tr>

                    })}
                </tbody>
            </table>
        )
    }
    const [user, setuserData] = useState({})
    const [pdf, setPDf] = useState({})
    const [loading, setLoading] = useState(false)

    const userImage = (name) => {
        let fileName = name.trim()
        return fileName
    }
    // const PdfTable = () => {
    //     return (
    //         <div className="row" style={{ border: "solid 2px green", padding: "3px" }}>
    //             {/* <div className="col-md-3 ">
    //           <h5> {user._id}</h5> 
    //         </div> */}
    //             <div className="col-md-3 offset-col-md-3">
    //                 <h5> {user.fullName}</h5>
    //             </div>
    //             {/* <div className="col-md-3">
    //             <h5>{user.createdAt}</h5>  
    //         </div> */}
    //             {/* <div className="col-md-3">
    //         <h5 >{user.role==1 &&  <span className="badge badge-success">Admin </span> }</h5> 
    //         <h5 >{user.role==0 &&  <span className="badge badge-success">User </span> }</h5> 
    //         </div> */}
    //         </div>
    //     )
    // }

    useEffect(() => {
        setuserData(JSON.parse(localStorage.getItem('userdata')))
        let userdata = JSON.parse(localStorage.getItem('userdata'))
        userImage(userdata.fullName)


        fetch(
            `${API}getData/${userdata.previousToken}/${userdata.fullName}/`, {
            token: userdata.previousToken,
            name: userdata.fullName
        })
            .then(async res => await res.json())
            .then((json) => {
                let usr = json.users
                let newArray = [];
                let uniqueObject = {};
                for (let i in usr) {
                    let objTitle = usr[i]['email'];
                    uniqueObject[objTitle] = usr[i];
                }
                for (let i in uniqueObject) {
                    newArray.push(uniqueObject[i]);
                }
                json.users = newArray
                setPDf(json)
                setLoading(true)

            })

    }, [])

    return (
        <Base title="Download PDF" description="Download Pdf From Here ">
            <Pdf targetRef={ref} filename={user.fullName}>
                {({ toPdf }) => (
                    <button onClick={toPdf}>Generate pdf</button>
                )}
            </Pdf>
            <div >
                {!loading && "Loading..."}
                <h1 className="text-center mb-3 text-black">Signed Up user</h1>
                {SignUpUser()}
                {/* <h1>this is other users </h1> */}


                {pdf.users?.length === 0 && <div className="box">
                    <p className="text-center"> No Bank Details Found  </p>
                </div>}

                {pdf.users?.length !== 0 && <h5 className="text-center mt-2">Bank Detail List OF Referers</h5>}
                {pdf.users?.length !== 0 && <div className="box_2">
                    {Table()}
                </div>}
            </div>

                    <h5 className="text-center">PDF view</h5>
            <div ref={ref} style={{ background: "blue" }} >
                {!loading && "Loading..."}
                <h1 className="mb-3 text-black">Signed Up user</h1>
                {SignUpUser()}
                {pdf.users?.length === 0 && <div className="box">
                    <p className="text-center"> No Bank Details Found  </p>
                </div>}
                {pdf.users?.length !== 0 && <h5 className="mt-2">Bank Detail List OF Referers</h5>}
                {pdf.users?.length !== 0 && <div className="box_2">
                    {PDfTable()}
                </div>}
            </div>

        </Base>

    );

}
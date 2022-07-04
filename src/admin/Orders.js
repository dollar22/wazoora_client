import { React } from "react";
import Base from "../core/Base";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { API } from "../user/backend";
import axios from "axios";
export const Order = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [items, setItems] = useState({});
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price" },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Example load data from sever
  useEffect(() => {
    setTimeout(() => {
      var itemss = JSON.parse(localStorage.getItem("jwt"));
      // var itemss = JSON.parse(localStorage.getItem('jwt'));
      setToken(JSON.parse(localStorage.getItem("token")));
      setItems(itemss);
      setUserId(itemss.user._id);
    }, 1000);

    const value = axios.get(`${API}order/all/${userId}`, {
      headers: {
        authorization: items.token,
        "content-type": "text/json",
      },
    });
  
    // })
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  var OrderTable = () => {
    return (
      <div className="ag-theme-alpine" style={{ width: 1000, height: 1000 }}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    );
  };
  return (
    <Base title="Manage Orders" description="Admin can approve Orders">
      <button onClick={buttonListener}>Push Me</button>
      {OrderTable()}
    </Base>
  );
};
export default Order;

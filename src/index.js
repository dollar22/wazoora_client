import React from "react";
import Paths from "../src/Paths.js";
import ReactDom from "react-dom";
// import reportWebVitals from './report'

// const root = ReactDom.createRoot(document.getElementById("root"));
//root.render(
//   <React.StrictMode>
//       <Paths />
//     {/* <App /> */}
//   </React.StrictMode>
// );
// reportWebVitals();

ReactDom.render(<Paths />, document.getElementById("root"));

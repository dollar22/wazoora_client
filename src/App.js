import React from "react";
import Home from "./core/Home";
import CourseCard from "./user/CourseCard";




function App() {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };


  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });
  return (
    // <CourseCard />
    <Home />
  );
}
if (process.env.NODE_ENV === 'debug') {
  // setDebugLevel(1)
}



export default App;

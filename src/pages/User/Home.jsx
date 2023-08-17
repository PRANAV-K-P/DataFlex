import React from "react";
import Footer from "../../components/User/Footer/Footer";
import Home from "../../components/User/Home/Home";

const HomePage = () => {
  return (
    <>
      <Home />
      <div className="absolute bottom-0 w-full">
      <Footer />

      </div>
    </>
  );
};

export default HomePage;
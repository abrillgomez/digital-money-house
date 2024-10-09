import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const LayoutLogin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutLogin;

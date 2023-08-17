import React from "react";
import { FaGoogle, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-300 w-full flex flex-col items-center text-purple-800">
      <h2 className="text-xl font-bold mt-1">DataFlex</h2>
      <div className="flex flex-row">

      <div className="w-52 mt-2 flex flex-row justify-around text-sm">
        <FaGoogle /> <FaFacebookF /> <FaInstagram /> <FaTwitter />
      </div>
      <h2 className="ml-2 mt-1 mb-1">
      © 2023 DataFlex. All rights reserved.
      </h2>
      </div>
    </div>
  );
};

export default Footer;

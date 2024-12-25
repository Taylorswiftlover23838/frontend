import React from "react";
import Header from  '../components/Header'
import { IoMdCloseCircle } from "react-icons/io";

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-gray-900 px-4 sm:px-6"> 
      <div className="w-full mt-6">
        <Header title="PageNotFound" icon={<IoMdCloseCircle />} />
      </div>


      <div className="w-full max-w-screen-lg mx-auto mt-4 p-6 flex justify-center items-center border-2 border-gray-700 rounded-lg bg-gray-800">

      </div>
    </div>
  );
}
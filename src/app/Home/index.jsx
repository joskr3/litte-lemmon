/* eslint-disable no-unused-vars */
import React from "react";
import Detalle from "../../Components/Detalle";
import Header from "../../Components/Header";
import Hero from "../../Components/Hero";
import Menu from "../../Components/Menu";
import Footer from "../../Components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col justify-between h-dvh">
      <div className="">
        <Header />
      </div>
      <div className="flex-[5]">
        <Hero />
      </div>
      <div className="flex-[3]">
        <Menu />
      </div>
      <div className="flex-[3]">
        <Menu />
      </div>
      <div className="flex-[3]">
        <Menu />
      </div>
      <div className="flex-[3]">
        <Detalle />
      </div>
      <div className="flex-1">
        <Footer />
      </div>
    </div>
  );
};

export default Home;

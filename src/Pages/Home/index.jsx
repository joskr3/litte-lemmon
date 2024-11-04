/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Detalle from "../../Components/Detalle";
import Header from "../../Components/Header";
import Hero from "../../Components/Hero";
import Menu from "../../Components/Menu";
import mockData from "../../api/mockData";

const Home = () => {
  const [data, setData] = useState({
    heroImage: { src: "", alt: "" },
    menuOptions: [],
    cards: []
  });

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = () => {
      setData({
        heroImage: mockData.heroImage,
        menuOptions: mockData.menuOptions,
        cards: mockData.cards
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Hero image={data.heroImage} />
      <Menu options={data.menuOptions} />
      <Detalle cards={data.cards} />
    </>
  );
};

export default Home;

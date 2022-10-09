import React from "react";

import Gameboard from "../components/Gameboard";

const Home = () => {

  return (
    <main className="d-flex col-12 justify-content-center">
      <div class='light x1'></div>
      <div class='light x2'></div>
      <div class='light x3'></div>
      <div class='light x4'></div>
      <div class='light x5'></div>
      <div class='light x6'></div>
      <div class='light x7'></div>
      <div class='light x8'></div>
      <div class='light x9'></div>
      <div className="col-12 d-flex justify-content-center">
        <Gameboard />
      </div>
    </main>
  );
};

export default Home;

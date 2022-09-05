import React from "react";
import { useQuery } from "@apollo/client";

import Gameboard from "../components/Gameboard";

import { QUERY_USER } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_USER);
  console.log(data);

  return (
    <main className="d-flex col-12">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="col-12">
          <Gameboard />
        </div>
      )}
    </main>
  );
};

export default Home;

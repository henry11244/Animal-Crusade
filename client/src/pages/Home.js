import React from "react";
// import { useQuery } from "@apollo/client";

import Gameboard from "../components/Gameboard";
import Scoreboard from "../components/Scoreboard";

// import { QUERY_USER } from "../utils/queries";

const Home = () => {
  // const { loading, data } = useQuery(QUERY_USER);
  // console.log(data);

  return (
    <main className="d-flex col-12  ">
      {/* {loading ? (
            <div>Loading...</div>
          ) : ( */}
      <>
        <div className="col-10">
          <Gameboard />
        </div>
        <div className="col-2 border">
          <Scoreboard />
        </div>
      </>
      {/* )} */}
    </main>
  );
};

export default Home;

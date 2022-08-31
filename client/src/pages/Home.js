import React from "react";
import { useQuery } from "@apollo/client";

import Gameboard from "../components/Gameboard";
import Scoreboard from "../components/Scoreboard";

// import { QUERY_USER } from "../utils/queries";

const Home = () => {
  // const { loading, data } = useQuery(QUERY_USER);
  // console.log(data)

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {/* {loading ? (
            <div>Loading...</div>
          ) : ( */}
          <>
            <Gameboard />
            <Scoreboard />
          </>
          {/* )} */}
        </div>
      </div>
    </main>
  );
};

export default Home;

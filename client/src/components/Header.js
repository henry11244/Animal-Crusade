import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Header = (props) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  if (JSON.parse(localStorage.getItem('highScore') !== null)) { props.sethighScore(JSON.parse(localStorage.getItem('highScore'))) }

  return (
    <header className="text-dark mb-4 py-3 display-flex align-center" style={{ backgroundColor: "#38A3A5" }}>
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-dark" to="/">
          <h1 className="m-0" style={{ fontSize: "3rem" }}>
            Bootcamp Adventures
          </h1>
        </Link>
        <div>
          {Auth.loggedIn() ? (
            <>
              <button className="btn btn-lg btn-primary m-2" onClick={logout}>
                Logout
              </button>
              <div className='highscore'>Highscore: <br></br><div>{props.highScore}</div></div>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-primary m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
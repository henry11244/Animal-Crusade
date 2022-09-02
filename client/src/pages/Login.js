import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = (props) => {
  const [userLogin, setUserLogin] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...userLogin },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    };

    setUserLogin({
      username: "",
      password: "",
    });
  };

  return (
    <section className=" text-center text-lg-start">
      <div className="card mb-3">
        <div className="row g-0 d-flex align-items-center">
          <div className="col-lg-4 d-none d-lg-flex">
            <img
              src="https://www.goscience.eu/common/img/login.jpg"
              alt="Login"
              className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
            />
          </div>
          <div className="col-lg-8">
            <div className="card-body py-5 px-md-5">
              {data ? (
                <p>
                  Success! You may now head{" "}
                  <Link to="/">back to the homepage.</Link>
                </p>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      placeholder="Your username"
                      id="form2Example1"
                      className="form-control"
                      value={userLogin.username}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="form2Example1">
                      Username
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      placeholder="******"
                      id="form2Example2"
                      className="form-control"
                      value={userLogin.password}
                      onChange={handleChange}
                    />

                    <label className="form-label" htmlFor="form2Example2">
                      Password
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </button>
                </form>
              )}

              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Login;
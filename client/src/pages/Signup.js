import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...newUser },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className=" text-center text-lg-start">
      <div className="card mb-3">
        <div className="row g-0 d-flex align-items-center">
          <div className="col-lg-4 d-none d-lg-flex">
            <img
              src="https://image.shutterstock.com/image-vector/black-simple-finger-presses-on-260nw-618096680.jpg"
              alt="Sign Up"
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
                      name="username"
                      id="username"
                      className="form-control"
                      value={newUser.username}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="form2Example1">
                      Username
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      name="password"
                      placeholder="******"
                      id="password"
                      className="form-control"
                      value={newUser.password}
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
                    Sign Up
                  </button>
                </form>
              )}
              {error && (
                <div classNameName="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

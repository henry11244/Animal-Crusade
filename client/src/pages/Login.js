import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  const [userLogin, setUserLogin] = useState({ username: "", password: "" });
  const [highScore, setHighScore] = useState([]);
  const [login, { error, data }] = useMutation(LOGIN);

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

      Auth.login(data.login.token, 14);
    } catch (e) {
      console.error(e);
    };

    setUserLogin({
      username: "",
      password: "",
    });
  };

  const guestLoginHandle = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: {
          username: "guest",
          password: "password",
        },
      });
      console.log(data.login.user.highScore)
      setHighScore(data.highScore)
      Auth.login(data.login.token, data.login.user.highScore);
    } catch (e) {
      console.error(e);
    };

  }

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
                      placeholder="username"
                      name="username"
                      type="text"
                      className="form-control"
                      id="username"
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      placeholder="password"
                      name="password"
                      type="password"
                      className="form-control"
                      id="pwd"
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="password">
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
              <form onSubmit={guestLoginHandle}>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                  style={{ cursor: "pointer" }}
                >
                  Play As Guest
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>

    </section>
  )
};

export default Login;
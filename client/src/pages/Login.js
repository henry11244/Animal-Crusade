import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useMutation } from "@apollo/client";
// import { LOGIN_USER } from "../utils/mutations";

// import Auth from "../utils/auth";

const Login = (props) => {
  // const [formState, setFormState] = useState({ username: "", password: "" });
  // const [login, { error, data }] = useMutation(LOGIN_USER);

  // // update state based on form input changes
  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // };

  // // submit form
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(formState);
  //   try {
  //     const { data } = await login({
  //       variables: { ...formState },
  //     });

  //     Auth.login(data.login.token);
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   // clear form values
  //   setFormState({
  //     username: "",
  //     password: "",
  //   });
  // };

  return (
    <section className=" text-center text-lg-start">
      <div className="card mb-3">
        <div className="row g-0 d-flex align-items-center">
          <div className="col-lg-4 d-none d-lg-flex">
            <img
              src="https://www.goscience.eu/common/img/login.jpg"
              alt="Login Photo"
              className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
            />
          </div>
          <div className="col-lg-8">
            <div className="card-body py-5 px-md-5">
              <form>
                <div className="form-outline mb-4">
                  <input type="email" id="form2Example1" className="form-control" />
                  <label className="form-label" htmlFor="form2Example1">
                    Email address
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example2"
                    className="form-control"
                  />
                  <label className="form-label" htmlFor="form2Example2">
                    Password
                  </label>
                </div>
                <button type="button" className="btn btn-primary btn-block mb-4">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    // <main classNameName="flex-row justify-center mb-4">
    //   <div classNameName="col-12 col-lg-10">
    //     <div classNameName="card">
    //       <h4 classNameName="card-header bg-dark text-light p-2">Login</h4>
    //       <div classNameName="card-body">
    //         {data ? (
    //           <p>
    //             Success! You may now head{" "}
    //             <Link to="/">back to the homepage.</Link>
    //           </p>
    //         ) : (
    //           <form onSubmit={handleFormSubmit}>
    //             <input
    //               classNameName="form-input"
    //               placeholder="Your username"
    //               name="username"
    //               type="text"
    //               value={formState.username}
    //               onChange={handleChange}
    //             />
    //             <input
    //               classNameName="form-input"
    //               placeholder="******"
    //               name="password"
    //               type="password"
    //               value={formState.password}
    //               onChange={handleChange}
    //             />
    //             <button
    //               classNameName="btn btn-block btn-info"
    //               style={{ cursor: "pointer" }}
    //               type="submit"
    //             >
    //               Submit
    //             </button>
    //           </form>
    //         )}

    //         {error && (
    //           <div classNameName="my-3 p-3 bg-danger text-white">
    //             {error.message}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </main>
  );
};

export default Login;

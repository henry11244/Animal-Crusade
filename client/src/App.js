import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './app.css';
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "./utils/auth";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const [highScore, sethighScore] = useState([0]);

  return (
    <ApolloProvider client={client}>
      <div className="d-flex flex-column justify-flex-start min-100-vh">
        <div>
          <Header highScore={highScore} sethighScore={sethighScore} />
        </div>
        <div className="container col-12 justify-content-center">
          <Routes>
            {Auth.loggedIn() ? (
              <>
                <Route path="/" element={<Home highScore={highScore} sethighScore={sethighScore} />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Login sethighScore={sethighScore} />} />
                <Route path="/login" element={<Login sethighScore={sethighScore} />} />
                <Route path="/signup" element={<Signup />} />
              </>
            )}
          </Routes>
        </div>
      </div>
      <Footer />
    </ApolloProvider >
  );
};


export default App;

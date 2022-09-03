import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StoreProvider } from './utils/GlobalState';

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from 'styled-components';

const birdSize = 20;

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
  return (
    <ApolloProvider client={client}>
      <div className="d-flex flex-column justify-flex-start min-100-vh">
        <div>
          <Header />
        </div>
        <StoreProvider>
          <div className="container col-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </StoreProvider>
      </div>
      <div className="App">
        <Bird size={birdSize}/>
      </div>
      <Footer />
    </ApolloProvider >
  );
}

export default App;

const Bird = styled.div`
position: relative;
margin-left: 50px;
margin-top: 400px;
background-color: red;
height: ${(props) => props.size}px;
width: ${(props) => props.size}px;
top: ${(props) => props.size}px;
border-radius: 50%`
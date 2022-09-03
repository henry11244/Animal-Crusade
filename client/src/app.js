import { React, useEffect, useState } from "react";
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
const gameWidth = 1000;
const gameHeight = 700;
const Gravity = 6;

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
  const [birdPosition, setBirdPosition] = useState(250);

  useEffect( () => {

    let timeId;
    if (birdPosition < gameHeight - birdSize) {
      timeId = setInterval(() => {
        setBirdPosition(birdPosition => birdPosition + Gravity)
      }, 24);
    }
    return () => {
      clearInterval(timeId)
    }
  })


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
      <Box>
        <GameBox height={gameHeight} width={gameWidth}>
      <Bird size={birdSize} top={birdPosition}/>
      </GameBox>
      </Box>

      <Footer />
    </ApolloProvider >
  );
}

export default App;

const Bird = styled.div`
position: relative;
background-color: red;
height: ${(props) => props.size}px;
width: ${(props) => props.size}px;
top: ${(props) => props.top}px;
border-radius: 50%`;

const Box = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

const GameBox = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: cyan;

`
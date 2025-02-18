import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserAccountProvider } from "../contexts/UserAccount";
import Home from "../pages/Home";
import Header from "../components/Header";
import ListOfAllArticles from "../components/ListOfAllArticles";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import logo from "../src/assets/logo/logo.png";
import "./App.css";
import Nav from "../components/Nav"

function App() {
  return (
    <div>
      <UserAccountProvider>
        <Header />
        <Nav />
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/articles" element={<ListOfAllArticles />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserAccountProvider>
    </div>
  );
  
}

export default App;

import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserAccountProvider } from "./contexts/UserAccount";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import "./App.css";
import Nav from "./components/Nav";
import ListOfAllArticles from "./components/ListOfAllArticles";
import IndividualArticle from "./pages/IndividualArticle";
import PagesTopic from "./pages/PagesTopic";
import Topics from "./pages/Topics";

function App() {
  return (
    <div>
      <UserAccountProvider>
        <div className="app">
          <Header />
          <Nav />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/articles" element={<ListOfAllArticles />} />
              <Route
                path="/articles/:article_id"
                element={<IndividualArticle />}
              />
              <Route path="/topics" element={<Topics />} />
              <Route path="/topics/:topic_slug" element={<PagesTopic />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </UserAccountProvider>
    </div>
  );
}

export default App;

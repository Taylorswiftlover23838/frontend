import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Navigation
import SideBar from "./Navigation/SideBar";
import NavBar from "./Navigation/NavBar";
import ChatWindow from "./Navigation/ChatWindow";
import Modals from "./components/Modals";

// Pages
import PageNotFound from "./Pages/PageNotFound";
import Home from "./Pages/Home";
import CoinFlip from "./Pages/Games/CoinFlip";
import Dice from "./Pages/Games/Dice";
import BlackJack from "./Pages/Games/BlackJack";
import Footer from "./components/Footer";
import Transactions from "./Pages/User/Transactions";
import Profile from "./Pages/User/Profile";

export default function App() {
  return (
    <>
      <BrowserRouter>
      <div className="bg-gray-900">
        <NavBar />
        <ChatWindow />
        <Modals />
        <SideBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coinflip" element={<CoinFlip />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dice" element={<Dice />} />
            <Route path="/blackjack" element={<BlackJack/>}/>
            <Route path="/profile/transactions" element={<Transactions/>}/>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </SideBar>
        <Footer />
      </div>
    </BrowserRouter>
    </>
  );
}
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SideBar from "./Navigation/SideBar";
import NavBar from "./Navigation/NavBar";
import ChatWindow from "./Navigation/ChatWindow";
import Modals from "./components/Modals";
import PageNotFound from "./Pages/PageNotFound";
import Home from "./Pages/Home";
import Dice from "./Pages/Games/Dice";
import BlackJack from "./Pages/Games/BlackJack";
import Footer from "./components/Footer";
import Transactions from "./Pages/User/Transactions";
import Mines from "./Pages/Games/Mines";
import Limbo from "./Pages/Games/Limbo";
import Profile from "./Pages/User/Profile";
import BlackJackFairness from "./Pages/Fairness/BlackJackFairness";
import LimboFairness from "./Pages/Fairness/LimboFairness";
import MinesFairness from "./Pages/Fairness/MinesFairness";
import DiceFairness from "./Pages/Fairness/DiceFairness";
import TermsOfService from "./Pages/About/TermsOfService";
import PrivacyPolicy from "./Pages/About/PrivacyPolicy";
import AMLPolicy from "./Pages/About/AMLPolicy";

import WebSocketListener from "./utils/hooks/Websocketlistener";

export default function App() {
  return (
    <>
      <WebSocketListener />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <div className="bg-gray-900">
          <NavBar />
          <ChatWindow />
          <Modals />
          <SideBar>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dice" element={<Dice />} />
              <Route path="/blackjack" element={<BlackJack />} />
              <Route path="/mines" element={<Mines />} />
              <Route path="/limbo" element={<Limbo />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/transactions" element={<Transactions />} />
              <Route path="/fairness/blackjack"element={<BlackJackFairness />}/>
              <Route path="/fairness/mines" element={<MinesFairness />} />
              <Route path="/fairness/limbo" element={<LimboFairness />} />
              <Route path="/fairness/dice" element={<DiceFairness />} />
              <Route path="/about/terms-of-service" element={<TermsOfService/>}/>
              <Route path="/about/privacy-policy" element={<PrivacyPolicy/>}/>
              <Route path="/about/aml-policy" element={<AMLPolicy/>}/>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </SideBar>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

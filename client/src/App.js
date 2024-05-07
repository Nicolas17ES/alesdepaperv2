import "./App.css";
import Payment from "./components/cartComponents/Payment";
import Completion from "./components/cartComponents/Completion";
import About from "./pages/About";
import Home from "./pages/Home";
import VideoLanding from "./pages/VideoLanding";
import { GlobalProvider } from './context/GlobalContext'

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <GlobalProvider>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/payment" element={<Payment />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/completion" element={<Completion />} />
          </Routes>
        </BrowserRouter>
      </main>
    </GlobalProvider>
  );
}

export default App;

import Payment from "./components/cartComponents/Payment";
import Completion from "./components/cartComponents/Completion";
import About from "./pages/About";
import Home from "./pages/Home";
import NavBar from './components/navigation/NavBar'
import VideoLanding from "./pages/VideoLanding";
import { GlobalProvider } from './context/GlobalContext'
import { fetchBirds } from './context/GlobalAction'
import GlobalContext from "./context/GlobalContext";
import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // This is the main entry point of your React application.
  // It wraps the entire application with the GlobalProvider, which provides global state to child components.
  return (
    <GlobalProvider>
      <WrappedApp />
    </GlobalProvider>
  );
}


function WrappedApp() {
  const {dispatch} = useContext(GlobalContext);
  
  useEffect(() => {
    fetchBirds(dispatch);
  }, [])


  return (
      <main>
        <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={<VideoLanding />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/completion" element={<Completion />} />
          </Routes>
        </BrowserRouter>
      </main>
  );
}

export default App;

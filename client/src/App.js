import Payment from "./components/cartComponents/Payment";
import Completion from "./components/cartComponents/Completion";
import About from "./pages/About";
import Home from "./pages/Home";
import NavBar from './components/navigation/NavBar'
import Footer from './components/navigation/Footer'
import VideoLanding from "./pages/VideoLanding";
import Login from './pages/auth/LogIn';
import Register from './pages/auth/Register';
import AdminPanel from './pages/Admin';
import PrivateRoutes from './components/shared/accessRoutes/PrivateRoutes'
import { GlobalProvider } from './context/GlobalContext'
import { fetchBirds } from './context/GlobalAction'
import GlobalContext from "./context/GlobalContext";
import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function App() {
  // This is the main entry point of your React application.
  // It wraps the entire application with the GlobalProvider, which provides global state to child components.
  return (
    <GlobalProvider>
      <BrowserRouter>
        <WrappedApp />
      </BrowserRouter>
    </GlobalProvider>
  );
}


function WrappedApp() {

  const {dispatch} = useContext(GlobalContext);
  const location = useLocation();

  useEffect(() => {
    fetchBirds(dispatch);
  }, [])


  return (
      <main>

        {location.pathname !== '/' && <NavBar/>}
          <Routes>
            <Route path="/" element={<VideoLanding />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/completion" element={<Completion />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin-panel' element={<PrivateRoutes />}>
              <Route path='/admin-panel' element={<AdminPanel />} />
            </Route>
          </Routes>
          {location.pathname !== '/' && <Footer/>}
      </main>
  );
}

export default App;

import "./App.css";
import Header from "./componentes/layout/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./componentes/layout/footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ProtectedRoute } from "./controller/ProtectedRoute";
import MyTask from "./pages/Task/MyTask";
import Dashboard from "./pages/Dashboard/Dashboard";
import ResetPassword from "./pages/ResetPassword";
// import InstagramChecker from "./pages/Task/InstagramChecker";
import VideoDownloader from "./pages/Task/InstagramChecker";
import Contact from "./pages/Contact";
import WinningHistory from "./pages/User/WinningHistory";
import Loading1 from "./componentes/Loader/Loading1";
import Testing from "./componentes/Testing";
import Privacy from "./pages/Privacy";
import ForgotPassword from "./pages/ForgotPassword";
import Terms from "./pages/Terms";
import UserProfilePage from "./pages/Dashboard/UserProfilePage";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function App() {
  const getTokenFromCookies = () => {
    const token = Cookies.get("token");
    return token;
  };
  const [token, setToken] = useState(getTokenFromCookies());

  useEffect(() => {
    const resetTimeout = () => {
      clearTimeout(timer);
      startTimer();
    };

    const startTimer = () => {
      timer = setTimeout(() => {
        removeTokenFromCookies();
        setToken(null); 
      }, 900000);
    };

    let timer;

    startTimer();

    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keypress", resetTimeout);
    window.addEventListener("click", resetTimeout);
    window.addEventListener("scroll", resetTimeout);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keypress", resetTimeout);
      window.removeEventListener("click", resetTimeout);
    };
  }, []);

  const removeTokenFromCookies = () => {
    Cookies.remove("mobile")
    Cookies.remove("token")
    window.location.href="/login"
  };
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/check-is-liked" element={<VideoDownloader />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/try" element={<Loading1 />} />
          <Route path="/terms" element={<Terms />} />

          <Route path="/testing" element={<Testing />} />

          <Route
            path="/my-task"
            element={
              <ProtectedRoute>
                <MyTask />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/winning-history"
            element={
              <ProtectedRoute>
                <WinningHistory />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

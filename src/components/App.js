import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Home from "./Home";
import { LoggedInRouter } from "./logged-in/LoggedInRouter";
import Login from "./login/Login";
import Register from "./login/register";
import { NotFound } from "./NotFound";

function App() {
    const navigate = useNavigate();

    function onLoginSuccess(token) {
        navigate('/dashboard');
    }

    function onSignUp() {
        navigate('/login');
    }

    function isLoggedIn() {
        const authToken = localStorage.getItem("token")
        return authToken != null && authToken.trim() !== "";
    }

    return (
        <Routes>
            <Route path="/" element={<Home title="Welcome to Expense Management System" />} />
            <Route path="login" element={isLoggedIn() ? <Navigate replace to="/dashboard" /> : <Login onLoginSuccess={onLoginSuccess} />} />
            <Route path="register" element={<Register onSignupSuccess={onSignUp} />} />
            <Route path="dashboard/*" element={isLoggedIn() ? <LoggedInRouter /> : <Navigate replace to="/login" />} />
            <Route path="*" element={NotFound} status={404} />
        </Routes>
    );
}

export default App;

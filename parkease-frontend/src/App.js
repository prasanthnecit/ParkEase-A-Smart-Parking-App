import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ParkingAreasPage from "./pages/ParkingAreasPage";
import SlotsPage from "./pages/SlotsPage";

import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/parking-areas"
                    element={
                        <ProtectedRoute>
                            <ParkingAreasPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/slots/:areaId"
                    element={
                        <ProtectedRoute>
                            <SlotsPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

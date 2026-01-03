import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ParkingAreasPage from "./pages/ParkingAreasPage";
import SlotsPage from "./pages/SlotsPage";

import AdminLoginPage from "./admin/pages/AdminLoginPage";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import AdminAreasPage from "./admin/pages/AdminAreasPage";
import AdminBookingsPage from "./admin/pages/AdminBookingsPage";
import AdminStatsPage from "./admin/pages/AdminStatsPage";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Header from "./components/Header";
import AdminLayout from "./admin/layout/AdminLayout";

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                {/* Public */}
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* User */}
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

                {/* Admin (Nested) */}
                <Route
                    path="/admin"
                    element={
                        <AdminProtectedRoute>
                            <AdminLayout />
                        </AdminProtectedRoute>
                    }
                >
                    <Route index element={<AdminDashboardPage />} />
                    <Route path="areas" element={<AdminAreasPage />} />
                    <Route path="bookings" element={<AdminBookingsPage />} />
                    <Route path="stats" element={<AdminStatsPage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;

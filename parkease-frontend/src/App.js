import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import AdminLoginPage from "./admin/pages/AdminLoginPage";
import AdminRoutes from "./admin/routes/AdminRoutes";

import UserRoutes from "./user/routes/UserRoutes";

import UserProtectedRoute from "./components/UserProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import SlotsPage from "./user/pages/SlotsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* User */}
                <Route
                    path="/user/*"
                    element={
                        <UserProtectedRoute>
                            <UserRoutes />
                        </UserProtectedRoute>
                    }
                />
                <Route
                    path="/slots/:areaId"
                    element={
                        <UserProtectedRoute>
                            <SlotsPage />
                        </UserProtectedRoute>
                    }
                />

                {/* Admin */}
                <Route
                    path="/admin/*"
                    element={
                        <AdminProtectedRoute>
                            <AdminRoutes />
                        </AdminProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

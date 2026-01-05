import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLoginPage from "./admin/pages/AdminLoginPage";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import AdminAreasPage from "./admin/pages/AdminAreasPage";
import AdminBookingsPage from "./admin/pages/AdminBookingsPage";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminAreaSlotsPage from "./admin/pages/AdminAreaSlotsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/admin/login" element={<AdminLoginPage />} />


                <Route
                    path="/admin"
                    element={
                        <AdminProtectedRoute>
                            <AdminLayout />
                        </AdminProtectedRoute>
                    }
                >


                    <Route
                        path="/admin/areas/:areaId/slots"
                        element={
                            <AdminProtectedRoute>
                                <AdminAreaSlotsPage />
                            </AdminProtectedRoute>
                        }
                    />

                    <Route path="dashboard" element={<AdminDashboardPage />} />
                    <Route path="areas" element={<AdminAreasPage />} />
                    <Route path="bookings" element={<AdminBookingsPage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;

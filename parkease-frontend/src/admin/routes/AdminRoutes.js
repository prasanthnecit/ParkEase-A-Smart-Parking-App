import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";

import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminAreasPage from "../pages/AdminAreasPage";
import AdminBookingsPage from "../pages/AdminBookingsPage";
import AdminAreaSlotsPage from "../pages/AdminAreaSlotsPage";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                {/* DEFAULT */}
                <Route index element={<Navigate to="dashboard" replace />} />

                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="areas" element={<AdminAreasPage />} />
                <Route path="areas/:areaId/slots" element={<AdminAreaSlotsPage />} />
                <Route path="bookings" element={<AdminBookingsPage />} />
            </Route>
        </Routes>
    );
}

import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import UserBookingPage from "../pages/UserBookingPage";
import UserBookingHistoryPage from "../pages/UserBookingHistoryPage";
import UserProfilePage from "../pages/UserProfilePage";

export default function UserRoutes() {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                {/* DEFAULT PAGE */}
                <Route index element={<Navigate to="book" />} />

                <Route path="book" element={<UserBookingPage />} />
                <Route path="history" element={<UserBookingHistoryPage />} />
                <Route path="profile" element={<UserProfilePage />} />
            </Route>
        </Routes>
    );
}

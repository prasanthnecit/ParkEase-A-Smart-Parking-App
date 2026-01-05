import { jwtDecode } from "jwt-decode";

export const setToken = (token) => {
    localStorage.setItem("token", token);
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getRoleFromToken = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.role;
    } catch {
        return null;
    }
};

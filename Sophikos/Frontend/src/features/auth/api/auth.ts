const BASE_URL = "http://127.0.0.1:8000";

export const register = async (name: string, email: string, password: string) => {
    return fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });
};

export const login = async (email: string, password: string) => {
    return fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
};
const BASE_URL = "http://127.0.0.1:8000";

export const getUsers = async () => {
    const res = await fetch(`${BASE_URL}/users`);
    return res.json();
}

export const createUser = async (data: {name: string, email: string}) => {
    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}
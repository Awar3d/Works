import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getToken, removeToken, saveToken } from "@/src/features/auth/secureStorage/storage";

type AuthContextType = {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (token: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function restoreSession() {
            try {
                const storedToken = await getToken();
                setToken(storedToken);
            } catch (e) {
                console.error('restoreSession error', e);
                setToken(null);
            } finally {
                setIsLoading(false);
            }
        }

        restoreSession();
    }, []);

    const value = useMemo(
        () => ({
            token,
            isAuthenticated: !!token,
            isLoading,
            signIn: async (nextToken: string) => {
                await saveToken(nextToken);
                setToken(nextToken);
            },
            signOut: async () => {
                await removeToken();
                setToken(null);
            },
        }),
        [token, isLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return ctx;
}
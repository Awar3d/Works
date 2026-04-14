import {DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack, router, useSegments} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {useEffect} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider, useAuth} from "./providers/AuthProviders";

const queryClient = new QueryClient();

function AuthRedirect() {
    const {isAuthenticated, isLoading} = useAuth();
    const segments = useSegments();

    useEffect(() => {
        if (isLoading) return;

        const inProtectedGroup = segments[0] === '(home)';

        if (!isAuthenticated && inProtectedGroup) {
            router.replace('/');
        }
    }, [isAuthenticated, isLoading, segments]);

    return null;
}

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider value={DefaultTheme}>
                    <AuthRedirect/>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="modal" options={{presentation: 'modal', title: 'Modal'}}/>
                    </Stack>
                    <StatusBar style="auto"/>
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

import { View, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '@/src/shared/ui/Typography';
import { colors, radius } from '@/src/shared/lib/theme';
import { Button } from "../src/shared/ui/Button";
import { useAuth } from '@/app/providers/AuthProviders';

export default function SplashScreen() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    if (isAuthenticated) {
        return <Redirect href="/(home)" />;
    }

    return (
        <ImageBackground style={styles.container} source={require('@/src/shared/assets/images/slash_bg.png')}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.top}>
                    <View style={styles.logo}>
                        <Typography variant={'h2'} style={{ color: colors.primary }}>Sk</Typography>
                    </View>
                    <Typography variant={'h1'}>Sophikos</Typography>
                    <Typography variant={'subtitle'}>Управляй своими финансами</Typography>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.textWrapper}>
                        <Typography variant={'h1'} style={{ color: colors.black }}>Добро пожаловать</Typography>
                        <Typography variant={'body'} style={{ color: colors.gray }}>
                            Контролируй баланс, обязательные расходы и цели — всё в одном месте.
                        </Typography>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button variant={'primary'} onPress={() => { router.push('(auth)/register'); }}>
                            Создать аккаунт
                        </Button>
                        <Button variant={'secondary'} onPress={() => { router.push('(auth)/login'); }}>
                            Войти в аккаунт
                        </Button>
                        <Typography variant={'caption'} style={styles.agreement}>
                            Продолжая, вы принимаете условия использования
                        </Typography>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    top: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    logo: {
        width: 80,
        height: 80,
        padding: 20,
        backgroundColor: colors.gold,
        borderRadius: radius.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        backgroundColor: '#fff',
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
        padding: 24,
        gap: 40,
        marginBottom: 16,
    },
    textWrapper: { gap: 12 },
    buttonWrapper: { gap: 12 },
    agreement: {
        color: colors.gray,
        alignSelf: 'center',
    },
});
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "@/src/shared/ui/Typography";
import { Input } from "@/src/shared/ui/Input";
import { Button } from "@/src/shared/ui/Button";
import { ButtonArrow } from "@/src/shared/ui/ButtonArrow";
import { radius, colors } from '@/src/shared/lib/theme';
import { useState } from "react";
import { GoogleSign } from "@/src/shared/assets/svg/GoogleSign";
import { login } from "@/src/features/auth/api/auth";
import { router, Redirect } from 'expo-router';
import { useAuth } from '@/app/providers/AuthProviders';

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Redirect href="(home)/"/>;
    }

    const handleSubmit = async () => {
        const res = await login(email, password);

        if(res.status === 200){
            console.log("Успешно!")
            console.log("data", res)

            const token = res.data.token;

            await signIn(token);
        }else{
            console.log("Ошибка!" + res.status);
        }
    };

    return (
        <ImageBackground style={styles.container} source={require('@/src/shared/assets/images/log_bg.png')}>
            <SafeAreaView style={{ flex: 1}}>
                <View style={styles.top}>
                    <Typography variant='h2'>С возвращением</Typography>
                    <Typography variant='subtitle'>Рады видеть тебя снова</Typography>
                </View>
                <View style={styles.bottom}>
                    <Input onChangeText={(text) => {setEmail(text)}} label={"Email"} placeholder="example@email.com"/>
                    <Input onChangeText={(text) => {setPassword(text)}} label={"Пароль"} placeholder="Минимум 8 символов"/>
                    <Button variant="secondary" style={styles.primaryMini} contentStyle={styles.primaryMiniText}>Забыли пароль?</Button>
                    <Button onPress={() => {handleSubmit()}}>Войти</Button>
                    <View style={styles.divider}>
                        <View style={styles.line}/>
                        <Typography style={{color: colors.gray}} variant="subtitle">ИЛИ</Typography>
                        <View style={styles.line}/>
                    </View>
                    <Button style={styles.google} variant="secondary">
                        <GoogleSign/>
                        <Text>
                            Продолжить через Google
                        </Text>
                    </Button>
                    <View style={styles.subButtonWrap}>
                        <Button variant="secondary" style={styles.secondaryMini} contentStyle={styles.secondaryMiniText}>Нет аккаунта?</Button>
                        <ButtonArrow variant="secondary" onPress={() => {router.replace('/register')}}>
                            Создать
                        </ButtonArrow>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        padding: 24,
    },
    bottom: {
        backgroundColor: '#fff',
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
        padding: 24,
        gap: 14,
        marginBottom: 16,
    },
    primaryMini: {
        border: 'none',
        padding: 0,
        alignItems: 'flex-end'
    },
    primaryMiniText: {
        fontSize: 12,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#E8E2D8',
    },
    google: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subButtonWrap: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 50,
        justifyContent: 'space-between',
    },
    secondaryMini: {
        border: "none",
        padding: 0,
        alignItems: 'flex-start'
    },
    secondaryMiniText: {
        color: colors.grayMuted,
    },
    login: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
})
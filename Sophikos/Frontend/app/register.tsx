import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "@/src/shared/ui/Typography";
import { PasswordStrength } from "@/src/shared/ui/PasswordStrength";
import { Input } from "@/src/shared/ui/Input";
import { radius } from '@/src/shared/lib/theme';
import { useState, useEffect } from "react";

export default function LoginScreen() {
    const [password, setPassword] = useState('');

    function getStrength(password: string) {
        let score = 0;
        if(password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    }

    const score = getStrength(password);

    return (
        <ImageBackground style={styles.container} source={require('@/src/shared/assets/images/log_bg.png')}>
            <SafeAreaView style={{ flex: 1}}>
                <View style={styles.top}>
                    <Typography variant='h2'>Создать аккаунт</Typography>
                    <Typography variant='subtitle'>Займёт меньше минуты</Typography>
                </View>
                <View style={styles.bottom}>
                    <Input label={"Имя"} placeholder="Введите имя"/>
                    <Input label={"Email"} placeholder="example@email.com"/>
                    <Input label={"Пароль"} placeholder="Минимум 8 символов" onChangeText={(text) => {setPassword(text)}}/>
                    <Input label={"Подтвердите пароль"} placeholder="Повторите пароль"/>
                    <PasswordStrength score={score}/>
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
    }
})
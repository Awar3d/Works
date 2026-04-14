import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "@/src/shared/ui/Typography";
import { PasswordStrength } from "@/src/shared/ui/PasswordStrength";
import { Input } from "@/src/shared/ui/Input";
import { Button } from "@/src/shared/ui/Button";
import { ButtonArrow } from "@/src/shared/ui/ButtonArrow";
import { radius, colors } from '@/src/shared/lib/theme';
import { useState, useEffect } from "react";
import { ArrowRight } from "../../src/shared/assets/svg/ArrowRight";
import { register } from "@/src/features/auth/api/auth";
import { router } from "expo-router";

export default function RegisterScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [confirmError, setConfirmError] = useState('');

    function getStrength(password: string) {
        let score = 0;
        if(password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    }

    const score = getStrength(password);

    const handleSubmit = async () => {
        if(password !== confirmPassword) {
            setConfirmError("Passwords don't match");
            return;
        }
        const res = await register(name, email, password);
        if(res.status === 200) {
            console.log("Успешно!")
            router.replace('/login');
        }else{
            console.log("Ошибка!" + res.status);
        }
    }

    return (
        <ImageBackground style={styles.container} source={require('@/src/shared/assets/images/log_bg.png')}>
            <SafeAreaView style={{ flex: 1}}>
                <View style={styles.top}>
                    <Typography variant='h2'>Создать аккаунт</Typography>
                    <Typography variant='subtitle'>Займёт меньше минуты</Typography>
                </View>
                <View style={styles.bottom}>
                    <Input label={"Имя"} placeholder="Введите имя" onChangeText={(text) => setName(text)} />
                    <Input label={"Email"} placeholder="example@email.com" onChangeText={(text) => setEmail(text)} />
                    <Input label={"Пароль"} placeholder="Минимум 8 символов" onChangeText={(text) => {setPassword(text)}} secureTextEntry={true}/>
                    <Input label={"Подтвердите пароль"} error={confirmError} placeholder="Повторите пароль" secureTextEntry={true} onChangeText={(text) => {setConfirmPassword(text)}}/>
                    <PasswordStrength score={score}/>
                    <Button onPress={() => {handleSubmit()}}>Зарегистрироваться</Button>
                    <View style={styles.subButtons}>
                        <Button variant="secondary" style={styles.secondaryMini} contentStyle={styles.secondaryMiniText}>Уже есть аккаунт?</Button>
                        <ButtonArrow variant="secondary" onPress={() => {router.replace('/login')}}>
                            Войти
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
    subButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 50,
    },
    secondaryMini: {
        border: "none",
        padding: 0,
        alignItems: 'flex-start'
    },
    secondaryMiniText: {
        color: colors.grayMuted,
    },
})
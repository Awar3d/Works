import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "@/src/shared/ui/Typography";
import { PasswordStrength } from "@/src/shared/ui/PasswordStrength";
import { Input } from "@/src/shared/ui/Input";
import { radius } from '@/src/shared/lib/theme';
import { useState, useEffect } from "react";

export default function LoginScreen() {
    return (
        <ImageBackground style={styles.container} source={require('@/src/shared/assets/images/log_bg.png')}>
            <SafeAreaView style={{ flex: 1}}>
                <View style={styles.top}>
                    <Typography variant='h2'>С возвращением</Typography>
                    <Typography variant='subtitle'>Рады видеть тебя снова</Typography>
                </View>
                <View style={styles.bottom}>
                    <Input label={"Email"} placeholder="example@email.com"/>
                    <Input label={"Пароль"} placeholder="Минимум 8 символов"/>
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
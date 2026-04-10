import { ArrowRight } from "../assets/svg/ArrowRight";
import { StyleSheet } from "react-native";
import { ButtonProps } from "./Button";
import { Pressable, Text } from "react-native";

export function ButtonArrow({ variant = 'secondary', style, children, contentStyle, onPress }: ButtonProps) {
    return (
        <Pressable style={[style, styles.login]} onPress={() => {onPress()}}>
            <Text style={[contentStyle, styles.primaryMini]} variant={variant}>{children}</Text>
            <ArrowRight />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    login: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    primaryMini: {
        border: 'none',
        padding: 0,
        alignItems: 'flex-start'
    }
})
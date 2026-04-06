import { TextStyle, TextInput, Text, View, StyleSheet } from "react-native";
import { colors, radius } from '@/src/shared/lib/theme';
import { useState } from "react"

interface Props {
    style?: TextStyle,
    label?: string,
    error?: string,
}

export function Input({style, error, label, ...props}: Props) {
    const [focuses, setFocuses] = useState<boolean>(false);

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, focuses && styles.inputFocuses , error && styles.inputError]}
                placeholderTextColor={colors.gray}
                onFocus={() => {setFocuses(true)}}
                onBlur={() => {setFocuses(false)}}
                {...props}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 6
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.gray,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.grayLight,
        borderRadius: radius.md,
        padding: 16,
        fontSize: 15,
        color: colors.black,
        backgroundColor: colors.white,
        outlineStyle: 'none',
    },
    inputError: {
        borderColor: 'red',
    },
    inputFocuses: {
        borderColor: colors.black,
        borderWidth: 2,
    },
    error: {
        fontSize: 12,
        color: 'red',
    },
})
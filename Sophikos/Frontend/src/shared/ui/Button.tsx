import { Text, Pressable, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { colors, radius } from '@/src/shared/lib/theme';

interface Props {
    variant?: 'primary' | 'secondary';
    style?: ViewStyle;
    children: React.ReactNode;
    contentStyle?: TextStyle;
    onPress?: () => void;
}

export function Button({ variant = 'primary', style, children, contentStyle, onPress }: Props) {
    return (
        <Pressable style={[styles[variant], style]} onPress={onPress}>
            <Text style={[styles.text, styles[`${variant}Text`], contentStyle]}>
                {children}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    primary: {
        backgroundColor: colors.primary,
        borderRadius: radius.lg,
        padding: 16,
        alignItems: 'center',
    },
    secondary: {
        backgroundColor: colors.white,
        borderColor: colors.gray,
        borderWidth: 1,
        borderRadius: radius.lg,
        padding: 16,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    primaryText: {
        color: colors.white,
    },
    secondaryText: {
        color: colors.primary,
    },
});
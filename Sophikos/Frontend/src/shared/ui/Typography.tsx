import { Text, StyleSheet, TextStyle } from "react-native";
import { colors } from '@/src/shared/lib/theme';

type Variant = 'h1' | 'h2' | 'subtitle' | 'body' | 'caption';

interface Props {
    variant?: Variant;
    color?: string;
    children: React.ReactNode;
    style?: TextStyle;
}

export function Typography({ variant = 'body', color, children, style }: Props) {
    return(
        <Text style={[styles[variant], color ? {color} : {color: colors.white}, style]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.6,
    },
    body: {
        fontSize: 15,
    },
    caption: {
        fontSize: 12,
        opacity: 0.5,
    },
})
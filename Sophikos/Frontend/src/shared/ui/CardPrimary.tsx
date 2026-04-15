import { View, StyleSheet } from "react-native";
import { Typography } from "@/src/shared/ui/Typography";
import { CardProps } from "@/src/shared/ui/types";
import { colors, radius } from "@/src/shared/lib/theme";

export function CardPrimary({total, available, unavailable}: CardProps) {
    return(
        <View style={styles.container}>
            <View style={styles.total}>
                <Typography variant="caption">Общий баланс</Typography>
                <Typography  variant="h1">{total} ₸</Typography>
            </View>
            <View style={styles.other}>
                <View style={styles.otherContainer}>
                    <Typography variant="subtitle" style={styles.otherCaption}>Доступно</Typography>
                    <Typography variant="h2" style={styles.otherNumber}>{available} ₸</Typography>
                </View>
                <View style={styles.otherContainer}>
                    <Typography variant="subtitle" style={styles.otherCaption}>Зарезервировано</Typography>
                    <Typography variant="h2" style={styles.otherNumber}>{unavailable} ₸</Typography>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: colors.primary,
        borderRadius: radius.xl,
        display: "flex",
        gap: 14
    },
    total: {
        flex: 1,
    },
    other: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        gap: 8,
    },
    otherContainer: {
        flex: 1,
        padding: 6,
        backgroundColor: colors.grayLight,
        borderRadius: radius.lg,
    },
    otherCaption: {
        color: colors.primary,
    },
    otherNumber: {
        color: colors.gold,
    }
})
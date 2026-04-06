import { View, Text } from "react-native";
import { radius } from "@/src/shared/lib/theme";
import { useEffect } from "react";

interface Props {
    score: number;
}

export function PasswordStrength({ score }: Props) {

    const colors = ['red', 'orange', 'yellow', 'green'];
    const labels = ['', 'Слабый', 'Средний', 'Хороший', 'Сильный'];

    return (
        <View>
            <View style={{ flexDirection: 'row', gap: 4 }}>
                {[1, 2, 3, 4].map(i => (
                    <View
                        key={i}
                        style={{
                            flex: 1,
                            height: 4,
                            borderRadius: radius.sm,
                            backgroundColor: i <= score ? colors[score - 1] : '#ddd',
                        }}
                    />
                ))}
            </View>
            <Text>{labels[score]}</Text>
        </View>
    )
}
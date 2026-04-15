import { View, Text, StyleSheet } from "react-native";
import { CardPrimary } from "@/src/shared/ui/CardPrimary";

export default function HomeTab() {
    return (
        <View>
            <Text>Привет</Text>
            <CardPrimary total={45} available={34} unavailable={340000} />
        </View>
    )
}

const styles = StyleSheet.create({

})
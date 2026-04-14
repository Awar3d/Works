import { View, Text } from "react-native";
import { Button } from "@/src/shared/ui/Button";
import { useAuth } from "@/app/providers/AuthProviders";

export default function HomeScreen() {
    const { signOut } = useAuth();

    const handlePress = async () => {
        await signOut();
        window.location.reload();
    }

    return(
        <View>
            <Text>Home</Text>
            <Button onPress={() => {handlePress()}}>Exit</Button>
        </View>
    )
}
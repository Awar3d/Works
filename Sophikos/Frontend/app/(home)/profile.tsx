import { View, Text } from "react-native";
import { Button } from "@/src/shared/ui/Button";
import { useAuth } from "@/app/providers/AuthProviders";
import { router } from "expo-router";

export default function ProfileTab() {
    const { signOut } = useAuth();

    const handlePress = async () => {
        await signOut();
        router.replace('/(auth)/login');
    }

    return(
        <View>
            <Text>Profile</Text>
            <Button onPress={() => {handlePress()}}>Exit</Button>
        </View>
    )
}
import { View, Text } from "react-native";
import { Button } from "@/src/shared/ui/Button";
import { useAuth } from "@/app/providers/AuthProviders";
import { router } from "expo-router";

export default function ProfileTab() {
    const { signOut, token } = useAuth();

    const handlePress = async () => {
        await signOut();
        router.replace('/(auth)/login');
    }

    const getUserInfo = async () => {
        const res = await getUser(token);
        console.log("res", res);
    }

    getUserInfo();

    return(
        <View>
            <Text>Profile</Text>
            <Button onPress={() => {handlePress()}}>Exit</Button>
        </View>
    )
}
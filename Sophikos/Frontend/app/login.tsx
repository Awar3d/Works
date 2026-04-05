import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/src/features/auth/api/auth';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const mutation = useMutation({
        mutationFn: () => login(email, password),
        onSuccess: async (data) => {
            if(data.token) {
                await SecureStore.setItemAsync('token', data.token);
                router.replace('/(tabs');
            }
        }
    })

    return (
        <View style={{backgroundColor: "white"}}>
            <View>
                <TextInput
                    placeholder="Введите Email"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View>
                <TextInput
                    placeholder="Введите пароль"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <TouchableOpacity
                onPress={() => mutation.mutate()}
                disabled={mutation.isPending}
            >
                <Text>
                    {'Войти'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
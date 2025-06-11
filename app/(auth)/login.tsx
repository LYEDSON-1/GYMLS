import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "~/utils/supabase";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }
        try {
            setIsLoading(true);
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) Alert.alert(error.message);
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao fazer login.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80}
        >
            <View style={{ flex: 1, justifyContent: "center", padding:19, marginTop:80 }}>
                <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                    <View className="w-full max-w-sm p-0 bg-transparent">
                        <Text className="mb-2 text-lg text-center text-slate-500">
                            👋 Olá, seja bem-vindo!
                        </Text>
                        <Text className="mb-8 text-3xl font-extrabold text-center text-indigo-900">
                            Entrar na sua conta
                        </Text>
                        <View className="gap-6">
                            <View>
                                <Text className="mb-2 text-base font-medium text-slate-700">
                                    Email
                                </Text>
                                <TextInput
                                    className="w-full px-4 py-3 bg-transparent border-b-2 text-slate-900 border-slate-300 focus:border-indigo-500"
                                    placeholder="Digite seu email"
                                    placeholderTextColor="#94a3b8"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                            <View>
                                <Text className="mb-2 text-base font-medium text-slate-700">
                                    Senha
                                </Text>
                                <TextInput
                                    className="w-full px-4 py-3 bg-transparent border-b-2 text-slate-900 border-slate-300 focus:border-indigo-500"
                                    placeholder="Digite sua senha"
                                    placeholderTextColor="#94a3b8"
                                    keyboardType="default"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            className="items-center w-full py-3 mt-8 bg-indigo-900 active:opacity-80"
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text className="text-lg font-semibold text-center text-white">
                                    Entrar
                                </Text>
                            )}
                        </TouchableOpacity>
                        <View className="flex-row justify-center mt-8">
                            <Text className="text-slate-500">Não tem conta?</Text>
                            <TouchableOpacity onPress={() => router.push('/signup')}>
                                <Text className="ml-1 font-bold text-indigo-900">Cadastre-se</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
              
            </View>
        </KeyboardAvoidingView>
    );
}
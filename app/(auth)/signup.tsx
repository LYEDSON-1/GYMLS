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
import { Link, Stack, useRouter } from "expo-router";
import { supabase } from "~/utils/supabase";

export default function SignupScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }
        try {
            setIsLoading(true);
            const {
                data: { session },
                error,
            } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                Alert.alert("Erro", error.message);
                return;
            }

            if (!session) {
                Alert.alert('Verifique seu e-mail para confirmar o cadastro!');
                router.replace('/login');
            } else {
                router.replace('/'); // Ou a tela principal do app
            }
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao criar a conta.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Stack.Screen options={{ 
                headerTitle: "",
                headerTransparent: true,
                headerShadowVisible: false,            }} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={80}
            >
                <View style={{ flex: 1, justifyContent: "center", padding:19 }}>
                    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                        <View className="w-full max-w-sm p-0 bg-transparent">
                            <Text className="mb-8 text-3xl font-extrabold text-center text-indigo-900">
                                Criar conta
                            </Text>
                            <View className="gap-4">
                                <View>
                                    <Text className="mb-1 text-sm font-medium text-slate-700">
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
                                    <Text className="mb-1 text-sm font-medium text-slate-700">
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
                                className="items-center w-full py-3 mt-6 bg-indigo-900 active:opacity-80"
                                onPress={handleSignUp}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text className="font-semibold text-center text-white">
                                        Cadastrar
                                    </Text>
                                )}
                            </TouchableOpacity>
                            <View className="items-center w-full mt-4">
                                <Text className="text-slate-500">
                                    Já tem uma conta?{" "}
                                    <Link href="/login" asChild>
                                        <Text className="font-semibold text-indigo-900">
                                            Entrar
                                        </Text>
                                    </Link>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}
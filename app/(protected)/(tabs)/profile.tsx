import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { supabase } from '~/utils/supabase';

export default function ProfileScreen() {
  const router = useRouter();

  // Função para sair da conta
  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/login'); // Redireciona para a tela de login
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Perfil' }} />
      <View className="items-center justify-center flex-1 px-6 bg-neutral-100">
        <View className="items-center mb-6">
          <Image
            source={{ uri: 'https://ui-avatars.com/api/?name=Usuário' }}
            className="w-32 h-32 mb-4 border-4 border-indigo-200 rounded-full"
          />
          <Text className="mb-1 text-2xl font-bold text-neutral-900">Usuário Exemplo</Text>
          <Text className="mb-6 text-base text-neutral-500">usuario@email.com</Text>
        </View>
        <View className="w-full max-w-xs mb-4">
          <View className="flex-row justify-between px-2 mb-2">
            <Text className="text-base font-medium text-neutral-700">Treinos realizados:</Text>
            <Text className="text-base font-bold text-neutral-900">12</Text>
          </View>
          <View className="flex-row justify-between px-2">
            <Text className="text-base font-medium text-neutral-700">Meta semanal:</Text>
            <Text className="text-base font-bold text-neutral-900">5 treinos</Text>
          </View>
        </View>
        <TouchableOpacity className="px-8 py-3 mt-4 bg-indigo-800 shadow rounded-xl active:opacity-80">
          <Text className="text-base font-semibold text-white">Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="max-w-xs px-8 py-3 mt-4 bg-red-800 rounded-xl active:opacity-80"
          onPress={handleLogout}
        >
          <Text className="text-base font-semibold text-center text-white">Sair </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

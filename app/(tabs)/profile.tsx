import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';

export default function ProfileScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Perfil' }} />
      <View className="items-center justify-center flex-1 px-6 bg-neutral-100">
        <View className="items-center mb-6">
          <Image
            source={{ uri: 'https://ui-avatars.com/api/?name=Usuário' }}
            className="w-32 h-32 mb-4 border-4 rounded-full border-cyan-200"
          />
          <Text className="mb-1 text-2xl font-bold text-neutral-900">Usuário Exemplo</Text>
          <Text className="mb-6 text-base text-neutral-500">usuario@email.com</Text>
        </View>
        <View className="w-full max-w-xs mb-4">
          <View className="flex-row justify-between px-2 mb-2">
            <Text className="text-base text-neutral-700">Treinos realizados:</Text>
            <Text className="text-base font-bold text-neutral-900">12</Text>
          </View>
          <View className="flex-row justify-between px-2">
            <Text className="text-base text-neutral-700">Meta semanal:</Text>
            <Text className="text-base font-bold text-neutral-900">5 treinos</Text>
          </View>
        </View>
        <TouchableOpacity className="px-8 py-3 mt-4 shadow bg-cyan-600 rounded-xl active:opacity-80">
          <Text className="text-base font-semibold text-white">Editar Perfil</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

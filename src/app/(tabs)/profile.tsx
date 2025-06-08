import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';

export default function ProfileScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Perfil' }} />
      <View className="items-center justify-center flex-1 px-6 bg-white">
        <Image
          source={{ uri: 'https://ui-avatars.com/api/?name=Usuário' }}
          className="mb-4 border-4 rounded-full w-28 h-28 border-neutral-200"
        />
        <Text className="mb-1 text-2xl font-bold text-neutral-900">Usuário Exemplo</Text>
        <Text className="mb-6 text-base text-neutral-500">usuario@email.com</Text>
        <View className="flex-row justify-between w-full max-w-xs px-2 mb-3">
          <Text className="text-base text-neutral-700">Treinos realizados:</Text>
          <Text className="text-base font-bold text-neutral-900">12</Text>
        </View>
        <View className="flex-row justify-between w-full max-w-xs px-2 mb-6">
          <Text className="text-base text-neutral-700">Meta semanal:</Text>
          <Text className="text-base font-bold text-neutral-900">5 treinos</Text>
        </View>
        <TouchableOpacity className="px-6 py-3 mt-2 bg-neutral-900 rounded-xl">
          <Text className="text-base font-semibold text-white">Editar Perfil</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

import { View, Text, FlatList, TextInput, Dimensions } from 'react-native';
import { useState } from 'react';

const treinosExemplo = [
  { id: '1', data: '05/06/2025', treino: 'Peito e Tríceps' },
  { id: '2', data: '04/06/2025', treino: 'Costas e Bíceps' },
  { id: '3', data: '03/06/2025', treino: 'Pernas' },
];

const ITEM_MARGIN = 8;
const CONTAINER_PADDING = 32; // px-4 em cada lado = 16 + 16
const ITEM_WIDTH =
  (Dimensions.get('window').width - CONTAINER_PADDING - ITEM_MARGIN) / 2;

export default function Historico() {
  const [busca, setBusca] = useState('');
  const [treinos, setTreinos] = useState(treinosExemplo);

  // Filtra os treinos conforme o texto digitado
  const treinosFiltrados = treinos.filter((item) =>
    item.treino.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View className="flex-1 px-4 pt-12 bg-neutral-100">
      <Text className="mb-2 text-3xl font-extrabold text-center text-neutral-900">
        Histórico de Treinos
      </Text>
      <Text className="mb-6 text-lg font-medium text-center text-neutral-500">
        Veja os treinos realizados recentemente
      </Text>
      <TextInput
        className="w-full max-w-md p-3 mx-auto mb-6 bg-white border rounded-lg border-neutral-300"
        placeholder="Buscar treino..."
        value={busca}
        onChangeText={setBusca}
      />
      <FlatList
        data={treinosFiltrados}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: ITEM_MARGIN }}
        contentContainerStyle={{ paddingBottom: 32 }}
        renderItem={({ item }) => (
          <View
            style={{
              width: ITEM_WIDTH,
              marginBottom: ITEM_MARGIN,
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 16,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text className="mb-1 text-base text-neutral-400">{item.data}</Text>
            <Text className="text-lg font-bold text-neutral-900">{item.treino}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="mt-8 text-center text-neutral-500">Nenhum treino encontrado.</Text>
        }
      />
    </View>
  );
}
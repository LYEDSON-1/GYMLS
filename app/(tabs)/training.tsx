import { Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useState } from 'react';

const treinosExemplo = [
    {
        id: '1',
        nome: 'Peito e Tríceps',
        descricao: 'Supino, Crucifixo, Tríceps Testa',
        dia: 'Segunda-feira',
    },
    {
        id: '2',
        nome: 'Costas e Bíceps',
        descricao: 'Puxada, Remada, Rosca Direta',
        dia: 'Quarta-feira',
    },
    {
        id: '3',
        nome: 'Pernas',
        descricao: 'Agachamento, Leg Press, Extensora',
        dia: 'Sexta-feira',
    },
    {
        id: '4',
        nome: 'Peito e Tríceps',
        descricao: 'Agachamento, Leg Press, Extensora',
        dia: 'Terça-feira',
    },
    {
        id: '5',
        nome: 'Peito e Tríceps',
        descricao: 'Agachamento, Leg Press, Extensora',
        dia: 'Terça-feira',
    },
];

// Ordem dos dias da semana para classificação
const ordemDias = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo',
];

export default function TrainingScreen() {
    const [busca, setBusca] = useState('');
    const [treinos, setTreinos] = useState(treinosExemplo);

    // Filtra e classifica os treinos por dia da semana
    const treinosFiltrados = treinos
        .filter(
            (item) =>
                item.nome.toLowerCase().includes(busca.toLowerCase()) ||
                item.descricao.toLowerCase().includes(busca.toLowerCase()) ||
                item.dia.toLowerCase().includes(busca.toLowerCase())
        )
        .sort(
            (a, b) =>
                ordemDias.indexOf(a.dia) - ordemDias.indexOf(b.dia)
        );

    return (
        <View className="flex-1 px-4 pt-12 bg-neutral-100">
            <Text className="mb-1 text-3xl font-extrabold text-center text-neutral-900">Meus treinos</Text>
            <Text className="mb-6 text-lg font-medium text-center text-neutral-500">
                Seus treinos organizados por dia
            </Text>
            <View className="flex-row items-center justify-between mb-4">
                <TextInput
                    className="flex-1 p-3 mr-2 bg-white border rounded-lg border-neutral-300"
                    placeholder="Buscar treino, exercício ou dia..."
                    value={busca}
                    onChangeText={setBusca}
                />
                <TouchableOpacity
                    className="px-4 py-3 rounded-lg bg-cyan-600"
                    activeOpacity={0.8}
                    onPress={() => {
                        // ação para adicionar novo treino
                    }}
                >
                    <Text className="font-bold text-white">+ Novo</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={treinosFiltrados}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 32 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="flex-row items-center w-full max-w-md p-4 mb-4 bg-white shadow rounded-2xl"
                        activeOpacity={0.8}
                    >
                        <View className="items-center justify-between flex-1 p-1 ">
                            <Text className="text-lg font-bold text-neutral-900">{item.nome}</Text>
                            <Text className="text-neutral-500">{item.descricao}</Text>
                            <Text className="mt-1 text-xs text-neutral-400">{item.dia}</Text>
                        </View>
                        <View className="py-2 ml-1 mr-6 rounded-full px-7 bg-neutral-900">
                            <Text className="text-xs font-semibold text-white">Ver</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <Text className="mt-8 text-center text-neutral-500">
                        Nenhum treino encontrado.
                    </Text>
                }
            />
        </View>
    );
}

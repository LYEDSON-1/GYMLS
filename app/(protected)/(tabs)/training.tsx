import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';

const treinosExemplo = [
    { id: '1', nome: 'Peito e Tríceps', descricao: 'Supino, Crucifixo, Tríceps Testa', dia: 'Segunda-feira' },
    { id: '2', nome: 'Costas e Bíceps', descricao: 'Puxada, Remada, Rosca Direta', dia: 'Terça-feira' },
    { id: '3', nome: 'Pernas', descricao: 'Agachamento, Leg Press, Extensora', dia: 'Quarta-feira' },
    { id: '4', nome: 'Ombro e Abdômen', descricao: 'Desenvolvimento, Elevação lateral, Prancha', dia: 'Quinta-feira' },
    { id: '5', nome: 'Cardio', descricao: 'Esteira, Bicicleta, Elíptico', dia: 'Sexta-feira' },
    { id: '6', nome: 'Cardio', descricao: 'Esteira, Bicicleta, Elíptico', dia: 'Sábado' },
];

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
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
            <View className="flex-1 px-4 pt-12 bg-neutral-100">
                <Text className="mb-1 text-3xl font-extrabold text-center text-neutral-900">Meus treinos</Text>
                <Text className="mb-6 text-lg font-medium text-center text-neutral-500">
                    Seus treinos organizados por dia
                </Text>
                <View className="flex-row items-center justify-between mb-6">
                    <TextInput
                        className="flex-1 p-3 mr-2 bg-white border rounded-lg border-neutral-300"
                        placeholder="Buscar treino, exercício ou dia..."
                        value={busca}
                        onChangeText={setBusca}
                    />
                    <TouchableOpacity
                        className="px-5 py-3 rounded-lg shadow bg-cyan-600"
                        activeOpacity={0.85}
                        onPress={() => {
                            // ação para adicionar novo treino
                        }}
                    >
                        <Text className="text-base font-bold text-white">+ Novo</Text>
                    </TouchableOpacity>
                </View>
                {treinosFiltrados.length === 0 ? (
                    <Text className="mt-8 text-center text-neutral-500">
                        Nenhum treino encontrado.
                    </Text>
                ) : (
                    treinosFiltrados.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={{
                                width: '100%',
                                maxWidth: 420,
                                marginBottom: 18,
                                backgroundColor: '#fff',
                                borderRadius: 18,
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 18,
                                shadowColor: '#06b6d4',
                                shadowOpacity: 0.08,
                                shadowRadius: 8,
                                elevation: 3,
                                alignSelf: 'center',
                            }}
                            activeOpacity={0.85}
                        >
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: '#06b6d4', fontWeight: 'bold', fontSize: 13, marginBottom: 2 }}>{item.dia}</Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0f172a' }}>{item.nome}</Text>
                                <Text style={{ color: '#64748b', marginTop: 2 }}>{item.descricao}</Text>
                            </View>
                            <View style={{
                                paddingVertical: 8,
                                paddingHorizontal: 18,
                                marginLeft: 12,
                                borderRadius: 999,
                                backgroundColor: '#0f172a',
                            }}>
                                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13 }}>Ver</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </View>
        </ScrollView>
    );
}

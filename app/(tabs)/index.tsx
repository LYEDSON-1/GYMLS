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

export default function HomeScreen() {
	

	return (
		<View className="items-center justify-center flex-1 gap-1 p-6 bg-neutral-100">
			<Text className="mb-2 text-4xl font-semibold text-cyan-600">Bem-vindo 👋</Text>
			<Text className="mb-8 text-lg font-medium text-center text-neutral-500">
				Organize e acompanhe seus treinos de forma simples e prática.
			</Text>
			<TouchableOpacity
				className="px-8 py-4 bg-neutral-900/80 rounded-xl"
				activeOpacity={0.8}
				onPress={() => {
					// Navegação ou ação para adicionar novo treino
				}}
			>
				<Text className="text-lg font-extrabold text-white">Adicionar novo treino</Text>
			</TouchableOpacity>
			
			<TouchableOpacity
				className="px-8 py-4 bg-cyan-600 rounded-xl"
				activeOpacity={0.8}
				onPress={() => {
					// Navegação ou ação para adicionar novo treino
				}}
			>
				<Text className="text-lg font-bold text-white">Iniciar treino</Text>
			</TouchableOpacity>
			<Text className="mb-6 text-lg font-medium text-neutral-500">
				Seus treinos organizados por dia
			</Text>
			
		
				
		</View>
	);
}

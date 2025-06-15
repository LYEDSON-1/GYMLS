import { router } from 'expo-router';
import { Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<View className="items-center flex-1 px-4 pt-10 pb-8 bg-neutral-100">
				<View className="items-center mb-6 pt-7">
					<Text className="mb-2 text-4xl font-extrabold text-indigo-900">Bem-vindo 👋</Text>
					<Text className="mb-2 text-lg text-center text-neutral-500">
						Organize e acompanhe seus treinos de forma simples e prática.
					</Text>
				</View>

				<View className="w-full p-4 mb-8 bg-white shadow rounded-2xl">
					<Text className="mb-2 font-extrabold text-center text-indigo-900">Progresso Semanal</Text>
					<LineChart
						data={{
							labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
							datasets: [
								{
									data: [30, 45, 28, 80, 99, 43, 50],
									color: (opacity = 1) => `rgba(6, 182, 212, ${opacity})`,
									strokeWidth: 3,
								},
							],
							legend: ['Minutos de treino por dia'],
						}}
						width={screenWidth - 64} // diminui a largura
						height={160} // diminui a altura
						yAxisSuffix=" min"
						yAxisInterval={1}
						chartConfig={{
							backgroundColor: '#f0f9ff',
							backgroundGradientFrom: '#f0f9ff',
							backgroundGradientTo: '#e0f2fe',
							decimalPlaces: 0,
							color: (opacity = 1) => `rgba(6, 182, 212, ${opacity})`,
							labelColor: (opacity = 1) => `rgba(51, 65, 85, ${opacity})`,
							propsForDots: {
								r: '6',
								strokeWidth: '3',
								stroke: '#06b6d4',
								fill: '#fff',
							},
							propsForBackgroundLines: {
								stroke: '#bae6fd',
								strokeDasharray: '4',
							},
							propsForLabels: {
								fontWeight: 'bold',
							},
							style: {
								borderRadius: 20,
							},
						}}
						bezier
						style={{
							marginVertical: 8,
							borderRadius: 20,
							alignSelf: 'center',
							elevation: 2,
							shadowColor: '#06b6d4',
							shadowOpacity: 0.1,
							shadowRadius: 8,
						}}
					/>
				</View>

				<TouchableOpacity
					className="w-full max-w-md px-8 py-4 mb-4 shadow bg-neutral-900 rounded-xl active:opacity-80"
					activeOpacity={0.85}
					onPress={() => {
						router.push('/workouts/create')
					}}
				>
					<Text className="text-lg font-extrabold text-center text-white">Adicionar novo treino</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className="w-full max-w-md px-8 py-4 mb-8 bg-indigo-900 shadow rounded-xl active:opacity-80"
					activeOpacity={0.85}
					onPress={() => {
						
					}}
				>
					<Text className="text-lg font-bold text-center text-white">Iniciar treino</Text>
				</TouchableOpacity>

				<Text className="text-lg font-medium text-center text-neutral-500">
					Seus treinos organizados por dia
				</Text>
			</View>
		</ScrollView>
	);
}

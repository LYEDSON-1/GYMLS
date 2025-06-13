// components/WorkoutCard.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface Workout {
  id: string | number;
  name: string;
  date?: string | Date;
  exercises?: any[]; // Substitua 'any' por um tipo mais específico se possível
}

interface WorkoutCardProps {
  workout: Workout;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const router = useRouter();

  // Função para formatar a data de forma segura
  function formatDate(date?: string | Date) {
    if (!date) return 'Sem data';
    const d = typeof date === 'string' ? new Date(date) : date;
    return isNaN(d.getTime()) ? 'Sem data' : d.toLocaleDateString();
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
      }}
      onPress={() => {
        if (
          workout.id &&
          typeof workout.id === "string" &&
          workout.id !== "index"
        ) {
          router.push({ pathname: '/workouts/[id]', params: { id: String(workout.id) } });
        } else {
          console.warn("ID inválido:", workout.id);
        }
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{workout.name}</Text>
      <Text style={{ color: '#777' }}>
        {formatDate(workout.date)}
      </Text>
      <Text style={{ marginTop: 6 }}>
        {workout.exercises ? workout.exercises.length : 0} exercício(s)
      </Text>
    </TouchableOpacity>
  );
}

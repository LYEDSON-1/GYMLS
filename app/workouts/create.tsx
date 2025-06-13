import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { supabase } from "~/utils/supabase"; // ajuste o caminho conforme sua estrutura de pastas

// Tradução simples de termos comuns
const traducao: Record<string, string> = {
  peito: "chest",
  costas: "back",
  bíceps: "biceps",
  triceps: "triceps",
  pernas: "legs",
  ombro: "shoulders",
  abdominal: "abs",
  glúteo: "glutes",
  panturrilha: "calves",
  antebraço: "forearms",
  trapézio: "traps",
  // Adicione mais conforme necessário
};

function traduzirParaIngles(termo: any) {
  if (typeof termo !== "string" || !termo.trim()) return "";
  return traducao[termo.toLowerCase()] || termo;
}

export default function CreateWorkoutScreen() {
  const [workoutName, setWorkoutName] = useState("");
  const [search, setSearch] = useState("");
  const [exercises, setExercises] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const termoEmIngles = traduzirParaIngles(search); // search é o termo digitado pelo usuário
    try {
      const options = {
        method: 'GET',
        url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${termoEmIngles}`,
        headers: {
          'X-RapidAPI-Key': '6fc7af7e59msh2b05a6d504becc1p169f29jsna8508e565a12',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };
      const response = await axios.request(options);
      setExercises(response.data);
    } catch (e) {
      setExercises([]);
    }
    setLoading(false);
  };

  const handleSelect = (exercise: any) => {
    if (!selected.find(e => e.id === exercise.id)) {
      setSelected([...selected, exercise]);
    }
  };

  const handleCreateWorkout = async () => {
    const selectedExercises = selected.map(exercise => ({ id: exercise.id, name: exercise.name })); // ajuste conforme necessário
    const { data, error } = await supabase
      .from('workouts')
      .insert([
        {
          title: workoutName, // ou name, conforme seu schema
          date: new Date().toISOString(),
          exercises: selectedExercises, // <-- aqui deve ser um array ou objeto, conforme seu schema
        }
      ]);

    if (error) {
      console.error('Erro ao salvar treino:', error.message);
      // Mostre um alerta ou mensagem de erro
    } else {
      // Sucesso! Redirecione ou mostre mensagem
      console.log('Treino salvo:', data);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f1f5f9", padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#0e7490", marginBottom: 16 }}>
        Criar novo treino
      </Text>
      <TextInput
        placeholder="Nome do treino"
        value={workoutName}
        onChangeText={setWorkoutName}
        style={{ backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 16 }}
      />
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <TextInput
          placeholder="Buscar exercício (em inglês)"
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1, backgroundColor: "#fff", borderRadius: 8, padding: 12 }}
        />
        <TouchableOpacity onPress={handleSearch} style={{ marginLeft: 8, backgroundColor: "#06b6d4", borderRadius: 8, padding: 12 }}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Buscar</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator color="#06b6d4" />
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 8 }}
              onPress={() => handleSelect(item)}
            >
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text style={{ color: "#64748b" }}>{item.bodyPart}</Text>
            </TouchableOpacity>
          )}
          style={{ maxHeight: 200 }}
        />
      )}
      <Text style={{ marginTop: 16, fontWeight: "bold", color: "#0e7490" }}>Selecionados:</Text>
      <FlatList
        data={selected}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: "#e0f2fe", padding: 10, borderRadius: 8, marginTop: 6 }}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={handleCreateWorkout}>
        <Text>Salvar treino</Text>
      </TouchableOpacity>
    </View>
  );
}
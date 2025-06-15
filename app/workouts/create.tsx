import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Image } from "react-native";
import axios from "axios";
import { supabase } from "~/utils/supabase"; 
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';


const traducao: Record<string, string> = {
  peito: "chest",
  costas: "back",
  biceps: "upper arms",
  triceps: "upper arms",
  pernas: "upper legs",        // API separa pernas em upper/lower
  coxa: "upper legs",
  panturrilha: "lower legs",
  ombro: "shoulders",
  abdominal: "waist",
  abs: "waist",
  gluteo: "upper legs",        // glúteo normalmente está na parte superior das pernas
  antebraco: "lower arms",
  braco: "upper arms",
  trapezio: "back",
  pescoco: "neck",
  cardio: "cardio",
};

function traduzirGrupo(grupo: string): string {
  const normalizado = grupo
    .normalize("NFD") // remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

    console.log("Normalizado:", normalizado); // debug
  // Tenta buscar direto
  if (traducao[normalizado]) return traducao[normalizado];

  // Tenta buscar sem plural (ex: "ombros" → "ombro")
  const semS = normalizado.endsWith("s") ? normalizado.slice(0, -1) : normalizado;
  if (traducao[semS]) return traducao[semS];

  // Retorna original se não encontrar
  return grupo;
}




export default function CreateWorkoutScreen() {
  const [workoutName, setWorkoutName] = useState("");
  const [search, setSearch] = useState("");
  const [exercises, setExercises] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const termoEmIngles = traduzirGrupo(search); // search é o termo digitado pelo usuário
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
      alert('Treino Salvo com sucesso!')     
      setSelected([]);
      setExercises([]);
    }
    
      
  };
const navigation = useNavigation();
  return (
    <View style={{ flex: 1,  padding: 16, marginTop:10 }}>
      
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop:10, paddingTop:1 }}>
      <Ionicons name="arrow-back" size={24} color="#312e81" />
    </TouchableOpacity>
    
      <Text 
      className="font-extrabold text-center text-indigo-900"
      style={{ fontSize: 24, marginBottom: 16 }}>
        Criar novo treino
      </Text>
      <TextInput
        placeholder="Nome do treino"
        value={workoutName}
        onChangeText={setWorkoutName}
        style={{ backgroundColor: "#f1f5f9", borderRadius: 8, padding: 12, marginBottom: 16 }}
      />
      <View style={{ flexDirection: "row", marginBottom: 12,  }}>
        <TextInput
          placeholder="Buscar exercício (em Português ou inglês)"
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1, backgroundColor: "#f1f5f9", borderRadius: 8, padding: 12 }}
        />
        <TouchableOpacity onPress={handleSearch} 
        className="font-bold bg-indigo-900 "
        style={{ marginLeft: 8, borderRadius: 8, padding: 12 }}>
          <Text style={{ color: "#fff" }}>Buscar</Text>
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
              style={{
                backgroundColor: "#fff",
                padding: 12,
                borderRadius: 8,
                marginBottom: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => handleSelect(item)}
            >
              <Image
                source={{ uri: item.gifUrl }}
                style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12, backgroundColor: "#e0e7ef" }}
                resizeMode="cover"
              />
              <View>
                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                <Text style={{ color: "#64748b" }}>{item.bodyPart}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={{ maxHeight: 200 }}
        />
      )}
      <Text 
      className="text-indigo-900"
      style={{ marginTop: 16, fontWeight: "bold" }}>Selecionados:</Text>
      <FlatList
        data={selected}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#e0f2fe",
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderRadius: 8,
              marginTop: 6,
            }}
          >
            <Image
              source={{ uri: item.gifUrl }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 6,
                marginRight: 8,
                backgroundColor: "#e0e7ef",
              }}
              resizeMode="cover"
            />
            <Text style={{ fontSize: 15 }}>{item.name}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        className="items-center px-6 py-2 mt-6 bg-indigo-900 rounded-md active:opacity-80"
        onPress={handleCreateWorkout}
         disabled={workoutName.trim() === ""}
      >
        <Text className="text-base font-semibold text-white">Salvar treino</Text>
      </TouchableOpacity>
    </View>
  );
}
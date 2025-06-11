import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Esconde os nomes das abas
        tabBarActiveTintColor: '#06b6d4',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          height: 70,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: '#fff',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          borderTopWidth: 0.5,
          borderColor: '#e5e7eb',
          elevation: 10,
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={30} name="dumbbell" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={30} name="clipboard-list-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={30} name="history" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={30} name="account-circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

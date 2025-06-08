import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'TrainingScreen',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={25} name="heartbeat" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={25} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={25} name="user-circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

import { router, Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Esconde os nomes das abas
        tabBarActiveTintColor: '#3E18A8',
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
      <Tabs.Screen name="plus" 
         options={{ title:'Plus', tabBarIcon:({size, color}) => (
        <View 
         style={{
         width: 35,
         height: 35,
         backgroundColor: "#3E18A8", // indigo-700
         borderRadius: 12,
         justifyContent: "center",
         alignItems: "center",
         shadowColor: "#000",
         shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.25,
         shadowRadius: 4,
         elevation: 5, // Android shadow
         marginTop: 8,
  }}
        >
           <Feather name="plus" size={size} color={color} className='bg-white rounded-lg' />
        </View>
         
          ),       
        }}
        listeners={({
            tabPress: (e) => {
                e.preventDefault();
                router.push('/workouts/create');
            }
        })}
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

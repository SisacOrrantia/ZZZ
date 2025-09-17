import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../Screens/HomeScreen';


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator 
        screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor: '#2196f3',
            tabBarInactiveTintColor: '#888',
            tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
            tabBarStyle: { backgroundColor: '#fff' },
        }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
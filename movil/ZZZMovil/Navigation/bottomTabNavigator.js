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
            tabBarActiveTintColor: '#F9F6F3',
            tabBarInactiveTintColor: '#888',
            tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
            tabBarStyle: { backgroundColor: '#415E72', borderTopWidth: 0 },//menu inferior
            tabBarTintColor: '#fff',
        }}>
      <Tab.Screen 
        name="Home" component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color="#F9F6F3" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
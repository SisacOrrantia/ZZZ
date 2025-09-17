import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import BottomTabNavigator from './bottomTabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
        screenOptions={{
            drawerActiveTintColor: '#2196f3', 
            drawerInactiveTintColor: '#888',
            drawerLabelStyle: { fontSize: 15, fontWeight: 'bold' },
            drawerStyle: { backgroundColor: '#2C3E50' },
        }}
    >
      <Drawer.Screen 
        name="Home" 
        component={BottomTabNavigator} 
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
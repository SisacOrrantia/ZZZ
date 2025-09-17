import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import BottomTabNavigator from './bottomTabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
        initialRouteName='Home'
        screenOptions={{
            drawerType: 'back', //front o back
            drawerActiveTintColor: '#1f2c38ff', 
            drawerInactiveTintColor: '#888',
            drawerLabelStyle: { fontSize: 15, fontWeight: 'bold' },
            drawerStyle: { backgroundColor: '#415E72' },//menu lateral
            headerStyle: { backgroundColor: '#415E72', borderBottomWidth: 0, elevation: 0 ,shadowOpacity: 0 },//menu superior
            headerTintColor: '#F9F6F3',
        }}
    >
      <Drawer.Screen 
        name="Home" component={BottomTabNavigator} 
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import DrawerNavigator from './Navigation/drawerNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Exo2-Regular': require('./assets/fonts/Exo_2/static/Exo2-Regular.ttf'),
    'Exo2-Bold': require('./assets/fonts/Exo_2/static/Exo2-Bold.ttf'),
    'Overpass-Regular': require('./assets/fonts/Overpass/static/Overpass-Regular.ttf'),
    'Overpass-Bold': require('./assets/fonts/Overpass/static/Overpass-Bold.ttf'),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { SplashScreen } from './engine/SplashScreen';
import Home from './engine/Home';
import SignUp from './engine/SignUp';
import BuyFuel from './engine/BuyFuel';
import CheckCommission from './engine/CheckCommission';
import Petrol from './engine/Petrol';
import Diesel from './engine/Diesel';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash'>
          <Stack.Screen
            name="Splash"
            options={{ headerShown: false }}
            component={SplashScreen}
          />
          <Stack.Screen
            name="SignUp"
            options={{ headerShown: false }}
            component={SignUp}
          />
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Home}
          />
          <Stack.Screen
            name="BuyFuel"
            options={{ headerShown: false }}
            component={BuyFuel}
          />
          <Stack.Screen
            name="CheckCommission"
            options={{ headerShown: false }}
            component={CheckCommission}
          />
          <Stack.Screen
            name="Petrol"
            options={{ headerShown: false }}
            component={Petrol}
          />
          <Stack.Screen
            name="Diesel"
            options={{ headerShown: false }}
            component={Diesel}
          />
        </Stack.Navigator>
      </NavigationContainer>  
  );
}
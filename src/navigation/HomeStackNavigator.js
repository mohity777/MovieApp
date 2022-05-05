import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import MovieDetails from '../screens/MovieDetails';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = props => {
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
      </Stack.Navigator>
    )
}

export default HomeStackNavigator;
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';
import MovieDetails from '../screens/MovieDetails';

const Stack = createNativeStackNavigator();

const SearchStackNavigator = props => {
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
      </Stack.Navigator>
    )
}

export default SearchStackNavigator;
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favourites from '../screens/Favourites';

const Stack = createNativeStackNavigator();

const FavouriteStackNavigator = props => {
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Favourite" component={Favourites} />
      </Stack.Navigator>
    )
}

export default FavouriteStackNavigator;
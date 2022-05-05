import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Watchlist from '../screens/Watchlist';

const Stack = createNativeStackNavigator();

const WatchlistStackNavigator = props => {
    return(
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Watchlist" component={Watchlist} />
      </Stack.Navigator>
    )
}

export default WatchlistStackNavigator;
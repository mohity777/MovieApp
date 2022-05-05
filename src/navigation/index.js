import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import WatchlistStackNavigator from './WatchlistNavigator';
import FavouriteStackNavigator from './FavouriteNavigator';
import TabIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { getTrendingMovies, getUpcomingMovies } from '../store/actions/moviesActions';

const Tab = createBottomTabNavigator();

const AppNavigationContainer = props => {
    
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(getUpcomingMovies());
       dispatch(getTrendingMovies());
    }, []);

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: 'red',
                    tabBarInactiveTintColor: '#999',
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 15,
                        right: 15,
                        left: 15,
                        borderRadius: 30,
                        borderTopWidth: 0,
                        elevation: 80,
                        shadowOffset: {
                            width: 0,
                            height: 10,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 3.5,
                        shadowColor: 'white',
                        overflow: 'hidden',
                    }
                }}
            >
                <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{
                    tabBarIcon: ({ color, focused }) => {
                        let iconName = focused ? 'home' : 'home-outline';
                        return <TabIcon name={iconName} color={color} size={20} />;
                    },
                }} />
                <Tab.Screen name="SearchStack" component={SearchStackNavigator} options={{
                    tabBarIcon: ({ color, focused }) => {
                        let iconName = focused ? 'search' : 'search-outline';
                        return <TabIcon name={iconName} color={color} size={23} />;
                    },
                }} />
                <Tab.Screen name="WatchlistStack" component={WatchlistStackNavigator} options={{
                    tabBarIcon: ({ color, focused }) => {
                        let iconName = focused ? 'bookmarks' : 'bookmarks-outline';
                        return <TabIcon name={iconName} color={color} size={20} />;
                    },
                }} />
                <Tab.Screen name="FavouriteStack" component={FavouriteStackNavigator} options={{
                    tabBarIcon: ({ color, focused }) => {
                        let iconName = focused ? 'heart' : 'heart-outline';
                        return <TabIcon name={iconName} color={color} size={23} />;
                    },
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigationContainer;
import React from 'react';
import { View, ScrollView } from 'react-native';
import { MovieCarousel, TrendingMovies, UpcomingMovies } from '../components';

const Home = props => {

    return(
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, backgroundColor: 'black', paddingTop: 30, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          <MovieCarousel />
          <UpcomingMovies />
          <TrendingMovies />
      </ScrollView>
    )
}

export default Home;
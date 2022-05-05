import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MovieCard from './MovieCard';

const UpcomingMovies = props => {

    const { upComingMovies, upcomingLoading } = useSelector(state => state.movies);

    return(
       <View>
           <Text style={styles.headline}>Upcoming Movies</Text>
           <FlatList 
             data={upcomingLoading ? [1,2,3,4] : upComingMovies}
             keyExtractor={(_,i) => i.toString()}
             renderItem={({item, index}) => <MovieCard loading={upcomingLoading} index={index} item={item}/>}
             horizontal={true}
             showsHorizontalScrollIndicator={false}
           />
       </View>
    )
}

export default UpcomingMovies;

const styles = StyleSheet.create({
  headline: {
      fontFamily: 'Montserrat-Bold',
      color: 'white',
      fontSize: 15,
      marginBottom: 30,
  }
})
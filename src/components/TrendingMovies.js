import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MovieCard from './MovieCard';

const TrendingMovies = props => {

    const { trendingMovies, trendingLoading } = useSelector(state => state.movies);

    return (
        <View>
            <Text style={styles.headline}>Trending Movies</Text>
            <FlatList
                data={trendingLoading ? [1, 2, 3, 4] : trendingMovies}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item, index }) => <MovieCard loading={trendingLoading} index={index} item={item} />}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default TrendingMovies;

const styles = StyleSheet.create({
    headline: {
        fontFamily: 'Montserrat-Bold',
        color: 'white',
        fontSize: 15,
        marginVertical: 30,
    }
})
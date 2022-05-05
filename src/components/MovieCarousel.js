import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';

const MovieCarousel = props => {

    const { trendingMovies } = useSelector(state => state.movies);
    const [activeDotIndex, setActiveDotIndex] = useState(0)

    return (
        <View>
            <Carousel
                windowSize={Dimensions.get('window').width}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
                data={trendingMovies.slice(0, 5)}
                renderItem={({ item, index }) => <View>
                    <FastImage style={{ height: 200 }} source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} />
                </View>}
                onSnapToItem={(index) => setActiveDotIndex(index)}
            />
            <Pagination
                dotsLength={trendingMovies.slice(0, 5).length}
                activeDotIndex={activeDotIndex}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: 'white'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                    width: 6,
                    height: 6,
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    )
}

export default MovieCarousel;

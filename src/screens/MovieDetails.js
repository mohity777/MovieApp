import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getMovieReleaseDate, getMovieRuntime } from '../utils/functions';

const MovieDetails = (props) => {
  const [movieDetails, setMovieDetails] = React.useState(null);
  const [trailerId, setTrailer] = React.useState(null);

  const { params: { id } } = useRoute();

  React.useEffect(() => {
    fetchMovie(id);
    fetchTrailer(id);
  }, []);

  const fetchMovie = async (id) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${'bafa0c8abd49e75b0b2537636c684e98'}&language=en-US`;
      await axios.get(url)
        .then((res) => {
          setMovieDetails(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
    }
  };

  const fetchTrailer = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${'bafa0c8abd49e75b0b2537636c684e98'}&language=en-US`;
      await axios.get(url)
        .then((res) => {
          res.data?.results?.map((item) => {
            if (item.type === 'Trailer') {
              setTrailer(item.key);
            }
          });
        });
    } catch (error) { }
  };

  return (
    <View style={styles.container}>
      {movieDetails ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 90 }}>
          <StatusBar translucent backgroundColor='transparent' />
          <View style={styles.header}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w200/${movieDetails.poster_path}` }} style={styles.posterImage} />
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}` }}
              style={{
                position: 'absolute',
                right: 0, left: 0,
                height: '100%',
              }}
            />
            <LinearGradient
              style={{ position: 'absolute', top: 0, height: 20, width: '100%' }}
              colors={['#EEEEEE00', 'black']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 8 }}
            />
            <LinearGradient
              style={styles.linearGrad}
              colors={['#E0EEEE00', 'black']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 260
            }}>
            <Text style={{ color: 'red', fontFamily: 'Montserrat-Bold', fontSize: 18, textAlign: 'center' }}>
              {movieDetails.title}
              <Text style={{ fontSize: 16 }}>
                {movieDetails.release_date
                  ? ` (${movieDetails.release_date.slice(0, 4)})`
                  : ''}
              </Text>
            </Text>
          </View>
          <View style={styles.ratingTrailerContainer}>
            <View style={styles.ratingContainer}>
              <View
                style={styles.rating}>
                {movieDetails.vote_average !== 0 ? (
                  <Text style={styles.ratingTxt}>
                    {movieDetails.vote_average * 10}
                    <Text style={{ fontSize: 10 }}>%</Text>
                  </Text>
                ) : (
                  <Text style={styles.ratingTxt}>
                    NR
                  </Text>
                )}
              </View>
              <Text style={styles.ratingTxt}>
                User Score
              </Text>
            </View>
            {trailerId ? <View style={styles.verticalBorder}></View> : null}
            {trailerId ? (
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ paddingVertical: 5 }}
                onPress={async () => {
                  await Linking.openURL(
                    `https://www.youtube.com/watch?v=${trailerId}`,
                  );
                }}>
                <View style={styles.trailerContainer}>
                  <Ionicons name="play" color={'white'} size={20} />
                  <Text style={styles.ratingTxt}>
                    {' '}
                    Play Trailer
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={styles.greyContainer}>
            <View style={styles.releaseAndRuntime}>
              <Text style={styles.text}>
                {getMovieReleaseDate(movieDetails.release_date)}{' '}
                <Text style={{ fontSize: 16 }}> | </Text>{' '}
                {getMovieRuntime(movieDetails.runtime)}
              </Text>
            </View>
            <Text style={styles.text}>
              {movieDetails.genres.map((item, index) => `${index ? ', ' : ''}` + item.name)}
            </Text>
          </View>
          {movieDetails.tagline ? (
            <View
              style={{ width: '90%', alignSelf: 'center', paddingTop: 12 }}>
              <Text
                numberOfLines={2}
                style={{
                  color: '#777',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 13,
                }}>
                {movieDetails.tagline}
              </Text>
            </View>
          ) : null}
          <View style={{ width: '90%', alignSelf: 'center', marginTop: 8 }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 16,
                marginVertical: 10,
              }}>
              Overview
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
              }}>
              {movieDetails.overview}
            </Text>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <ActivityIndicator
            size={'large'}
            color={'white'}
            style={{
              borderRadius: 8,
              width: '100%',
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 260,
    position: 'absolute'
  },
  posterImage: {
    zIndex: 1,
    position: 'absolute',
    width: '26%',
    height: '80%',
    borderRadius: 8,
    top: '10%',
    left: 10,
  },
  linearGrad: {
    position: 'absolute',
    width: '100%',
    height: 200,
    bottom: 0,
  },
  ratingTrailerContainer: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 100,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {
    justifyContent: 'center',
    borderColor: '#03fc3d',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 3,
    marginRight: 10,
  },
  ratingTxt: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  trailerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalBorder: {
    width: 1,
    height: '30%',
    backgroundColor: '#888',
  },
  greyContainer: {
    width: '100%',
    backgroundColor: 'rgba(100,100,100,0.8)',
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: 'white'
  },
});

export default MovieDetails;
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const MovieCard = ({ item, index, loading, style }) => {
  const { id, title, vote_average, poster_path } = item;

  const { navigate } = useNavigation();

  if (loading) return (
    <ShimmerPlaceHolder
      style={[styles.card, { marginLeft: index ? 10 : 0, marginRight: 10 , backgroundColor: 'rgb(220,220,220)'}]}
    />
  )

  return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.card, { marginLeft: index ? 10 : 0, marginRight: 10 } , style]}
        onPress={() => {
          navigate('MovieDetails', { id });
        }}>
        <FastImage
          source={{ uri: `https://image.tmdb.org/t/p/w300/${poster_path}` }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
        <View
          style={styles.footer}>
          <Text style={styles.text} numberOfLines={2}>
            {title}
          </Text>
          {vote_average ? (
            <View
              style={styles.rating}>
              <Text style={[styles.text, { fontFamily: 'Montserrat-Medium' }]}>
                {Math.floor(vote_average * 10)}
                <Text style={{ fontSize: 8 }}>%</Text>
              </Text>
            </View>
          ) : <></>}
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 0,
    width: 125,
    overflow: 'hidden',
    height: 180
  },
  card: {
    borderRadius: 0,
    width: 125,
    overflow: 'hidden',
    height: 180,
    borderWidth: 0.2,
    borderColor: 'white'
  },
  footer: {
    padding: 10,
    position: 'absolute',
    backgroundColor: 'rgba(10, 10, 10,0.6)',
    justifyContent: 'center',
    width: '100%',
    bottom: 0,
  },
  rating: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 6,
    top: -25,
    height: 34,
    width: 34,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#03fc3d',
    backgroundColor: 'rgba(10, 10, 10,0.6)',
  },
  text: {
    fontSize: 9,
    color: 'white',
    fontFamily: 'Montserrat-SemiBold'
  },
});

export default MovieCard;
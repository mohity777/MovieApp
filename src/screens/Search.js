import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import { View, ActivityIndicator, TextInput, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MovieCard from '../components/MovieCard';

const Search = (props) => {

  const [searchResult, setSearchResult] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchTxt = useRef('');

  const fetchMovies = async (pgNo = 1) => {
    if (!searchTxt.current) return setSearchResult([])
    const url = `https://api.themoviedb.org/3/search/movie`
    try {
      await axios.get(url, {
        params: {
          api_key: 'bafa0c8abd49e75b0b2537636c684e98',
          language: 'en-US',
          query: searchTxt.current,
          page: pgNo,
          include_adult: false
        }
      })
        .then((res) => {
          let data;
          if(pgNo == 1) data = res.data;
          else data = { page: res.data?.page, results: [...searchResult.results, ...res.data.results] }
          setSearchResult(data || [])
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoader(false);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const renderMovieItem = useCallback(({ item }) => {
    return (
      <MovieCard
        item={item}
        style={styles.movieCard}
      />
    );
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.textInpView}>
        <Icon name={'search-outline'} color={'#888'} size={20} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={'grey'}
          selectionColor={'#888'}
          returnKeyType={'search'}
          onChangeText={(value) => {
            setLoading(true);
            searchTxt.current = value;
            fetchMovies()
          }}
          style={styles.textInput}
        />
      </View>
      {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color='white' size='large'/>
        </View> : <FlatList
        data={searchResult.results}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderMovieItem}
        contentContainerStyle={styles.flatlistContainer}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setLoader(true);
          fetchMovies(searchResult.page + 1);
        }}
        ListFooterComponent={loader ? <View>
          <ActivityIndicator color='white' size='large' />
        </View> : <></>}
      />}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  movieCard: {
    marginVertical: 15,
    width: 170
  },
  textInpView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    height: 40,
    position: 'absolute',
    paddingHorizontal: 5,
    borderRadius: 25,
    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    width: '90%',
    backgroundColor: 'white',
    top: 30,
  },
  textInput: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    marginHorizontal: '3%',
    width: '80%',
    color: 'black'
  },
  flatlistContainer: {
    flexGrow: 1,
    paddingTop: 90,
    paddingBottom: 200,
    alignItems: 'center'
  },
});
export default Search;
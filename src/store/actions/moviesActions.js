import axios from "axios";

export const setMovies = payload => ({ type: "SET_MOVIES", payload });

export const getUpcomingMovies = (page = 1) => async dispatch => {
    try{
        const res = await axios.get('https://api.themoviedb.org/3/movie/upcoming',{
            params: {
                api_key: 'bafa0c8abd49e75b0b2537636c684e98',
                page: page
            }
        })
        dispatch(setMovies({
            upComingMovies: res.data?.results || [],
            upcomingLoading: false
        }))
    }catch(err){

    }
}

export const getTrendingMovies = (page = 1) => async dispatch => {
    try{
        const res = await axios.get('https://api.themoviedb.org/3/trending/movie/day',{
            params: {
                api_key: 'bafa0c8abd49e75b0b2537636c684e98',
                page: page
            }
        })
        dispatch(setMovies({
            trendingMovies: res.data?.results || [],
            trendingLoading: false
        }))
    }catch(err){

    }
}
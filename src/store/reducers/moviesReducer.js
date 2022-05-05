const initialState = {
    upComingMovies: [],
    upcomingLoading: true,
    trendingMovies: [],
    trendingLoading: []
}

const moviesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_MOVIES': return { ...state, ...action.payload }
        default: return state;
    }
}

export default moviesReducer;
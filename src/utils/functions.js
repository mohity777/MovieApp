export const getMovieReleaseDate = (releaseDate) => releaseDate.slice(8) + '/' + releaseDate.slice(5, 7) + '/' + releaseDate.slice(0, 4);

export const getMovieRuntime = (runtime) => Math.floor(runtime / 60) + 'h' + (runtime % 60) + 'm';
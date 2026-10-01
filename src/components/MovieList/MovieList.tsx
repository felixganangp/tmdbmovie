import { Link } from 'react-router-dom';
import type { Movie } from '../../types/movie';
import { StringToSlug } from '../../utils/formatter';
import MovieCard from '../MovieCard/MovieCard';

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-6">
      {movies.map((movie, index) => (
        <Link
          to={`/movies/${StringToSlug(movie.title)}`}
          state={{ id: movie.id }}
          key={movie.id}
          className="grid grid-rows-subgrid">
          <MovieCard movie={movie} index={index} />
        </Link>
      ))}
    </div>
  );
};

export default MovieList;

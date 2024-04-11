import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { actions as favoritesActions } from '@/redux/slices/favoritesSlice';
import { actions as moviesListActions } from '@/redux/slices/listSlice';
import { actions as watchedListActions } from '@/redux/slices/watchedSlice';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Movie } from "@/types/Movie";
import HeartIcon from '../icons/HeartIcon';
import StarIcon from '../icons/StarIcon';

interface Props {
  movie: Movie
}

function MovieCard({ movie }: Props) {
  const { title, release_date, rating, image, id } = movie;
  const dispatch = useAppDispatch();
  const { favoritesList } = useAppSelector((state) => state.favorites);
  const { moviesList } = useAppSelector((state) => state.list);
  const { watchedList } = useAppSelector((state) => state.watched);

  const handleFavorites = () => {
    if (favoritesList.some((favorite) => favorite.id === id)) {
      dispatch(favoritesActions.remove(id));
    } else {
      dispatch(favoritesActions.add(movie));
    }
  }

  const handleMoviesList = () => {
    if (moviesList.some((movie) => movie.id === id)) {
      dispatch(moviesListActions.remove(id));
    } else {
      dispatch(moviesListActions.add(movie));
    }
  }

  const handlWatched = () => {
    if (watchedList.some((movie) => movie.id === id)) {
      dispatch(watchedListActions.remove(id));
    } else {
      dispatch(watchedListActions.add(movie));
    }
  }

  return (
    <Card className="w-full flex flex-col">
      <CardHeader className="flex-grow ">
        <img className="object-cover h-[300px]" src={image} alt={title} />
      </CardHeader>
      <CardContent>
        <Link to={`/movies/${movie.id}`}>
          <CardTitle className="mb-2">{title}</CardTitle>
        </Link>
        <CardDescription className="mb-2 flex items-center gap-1 text-md">{rating} <StarIcon size="16" /></CardDescription>
        <CardDescription>{release_date}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-start gap-2">

        <Button
          variant={moviesList.includes(movie) ? ("default") : ("outline")}
          size="sm" className="p-2"
          onClick={handleMoviesList}
        >
          {moviesList.includes(movie) ? ("In my list") : ("Add to list")}
        </Button>

        <Button
          variant={watchedList.includes(movie) ? ("default") : ("outline")}
          size="sm" className="p-2"
          onClick={handlWatched}
        >
          {watchedList.includes(movie) ? ("Watched") : ("Not Watched")}
        </Button>

        <Button
          variant="ghost"
          size="sm" className="p-2"
          onClick={handleFavorites}
        >
          {favoritesList.includes(movie) ? (
            <HeartIcon size="18" color="#FF474D" />
          ) : (
            <HeartIcon size="18" />
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default MovieCard;
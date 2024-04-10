import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { actions as favoritesActions } from '@/redux/slices/favoritesSlice';
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

interface Props {
  movie: Movie
}

function MovieCard({ movie }: Props) {
  const { title, release_date, rating, image, id } = movie;
  const dispatch = useAppDispatch();
  const { favoritesList } = useAppSelector((state) => state.favorites);

  const handleFavorites = () => {
    if (favoritesList.some((favorite) => favorite.id === id)) {
      dispatch(favoritesActions.remove(id));
    } else {
      dispatch(favoritesActions.add(movie));
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
        <CardDescription className="mb-2">{rating}</CardDescription>
        <CardDescription>{release_date}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Add to list</Button>
        <Button onClick={handleFavorites}>Add to favoite</Button>
      </CardFooter>
    </Card>
  )
}

export default MovieCard;
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from "lucide-react"
import NoResult from '@/components/NoResult';
import StarIcon from '@/components/Icons/StarIcon';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import ConfirmDialog from '@/components/ConfirmDialog';
import { useToast } from "@/components/ui/use-toast"
import { deleteMovie } from "@/api/movieApi"
import { Dialog } from "@/components/ui/dialog"
import MovieDialog from '@/components/MovieDialog';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchSingleMovie } from '@/redux/slices/singleMovieSlice'

function MoviePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { singleMovie, loading, error } = useAppSelector(state => state.singleMovie)
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleMovie(id));
    }
  }, [])

  const handeToggleDialog = () => {
    setIsDialogOpen((prev) => !prev)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    )
  }

  if (error || !singleMovie || !id) {
    return (
      <section className='py-10'>
        <div className='container'>
          <NoResult text="Something went wrong." />
        </div>
      </section>
    )
  }

  const handleRemove = async () => {
    try {
      await deleteMovie(id);
      navigate('/');
    } catch {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to delete movie.",
      });
    }
  }

  const { title, image, rating, description, release_date, genre, director, actors } = singleMovie;

  return (
    <section className='py-10'>
      <div className='container'>
        <div className='flex gap-10'>
          <img className="min-w-[200px] max-w-[30%]" src={image} alt={title} />
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
              {title}
            </h1>
            <p className='flex items-center gap-2 mb-4'>
              <StarIcon />
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold mt-[1px]">
                {rating}
              </code></p>
            <p className="leading-7 mb-1">
              {description}
            </p>
            <p className="text-sm text-muted-foreground mb-4">{release_date}</p>

            <p className="leading-7 mb-4">Genre: <span className='font-semibold'>{genre.join(', ')}</span></p>

            <p className="leading-7">Director: <span className='font-semibold'>{director}</span></p>
            <p className="leading-7 mb-4">Actors: <span className='font-semibold'>{actors.join(', ')}</span></p>
            <div className="flex gap-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Button variant="outline" onClick={handeToggleDialog}>Edit Movie</Button>
                <MovieDialog onToggleDialog={handeToggleDialog} isEdit={true} defaultValues={singleMovie} />
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Delete movie</Button>
                </AlertDialogTrigger>
                <ConfirmDialog onDelete={handleRemove} />
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MoviePage;

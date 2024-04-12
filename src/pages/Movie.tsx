import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from "lucide-react"
import useFetch from "@/hooks/useFetch";
import { Movie } from "@/types/Movie";
import NoResult from '@/components/noResult';
import StarIcon from '@/components/icons/StarIcon';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import ConfirmDialog from '@/components/confirmDialog';
import { deleteMovie } from "@/api/movieApi"

const API_URL = 'http://localhost:3000/movies';

function MoviePage() {
  const { id } = useParams();
  const { data, loading, error } = useFetch<Movie>(`${API_URL}/${id}`);
  const navigate = useNavigate();

  if (error || !data || !id) {
    return (
      <section className='py-10'>
        <div className='container'>
          <NoResult text="Something went wrong." />
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    )
  }

  const handleRemove = async () => {
    try {
      await deleteMovie(id);
      navigate('/');
    } catch (error) {
      console.error("Failed to delete movie:", error);
    }
  }

  return (
    <section className='py-10'>
      <div className='container'>
        <div className='flex gap-10'>
          <img className="max-w-[30%]" src={data.image} alt={data.title} />
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
              {data.title}
            </h1>
            <p className='flex items-center gap-2 mb-4'>
              <StarIcon />
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold mt-[1px]">
                {data.rating}
              </code></p>
            <p className="leading-7 mb-1">
              {data.description}
            </p>
            <p className="text-sm text-muted-foreground mb-4">{data.release_date}</p>

            <p className="leading-7 mb-4">Genre: <span className='font-semibold'>{data.genre.join(', ')}</span></p>

            <p className="leading-7">Director: <span className='font-semibold'>{data.director}</span></p>
            <p className="leading-7 mb-4">Actors: <span className='font-semibold'>{data.actors.join(', ')}</span></p>
            <div className="flex gap-4">
              <Button variant="outline">Edit movie</Button>
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
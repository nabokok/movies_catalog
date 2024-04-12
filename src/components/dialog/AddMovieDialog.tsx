import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Movie } from '@/types/Movie';
import CloseIcon from '../icons/CloseIcon';
import { addMovie } from '@/api/movieApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { actions as moviesActions } from '@/redux/slices/moviesSlice';

interface Props {
  onToggleDialog: () => void;
}

function AddMovieDialog({ onToggleDialog }: Props) {
  const { register, handleSubmit, formState: { errors }, control } = useForm<Omit<Movie, 'id'>>();
  const { movies } = useAppSelector(state => state.movies);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: Omit<Movie, 'id'>) => {

    const id = (movies.length + 1).toString();
    const movie = await addMovie({ ...data, id });

    dispatch(moviesActions.setMovie(movie))
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'actors',
  });

  const { fields: genreFields, append: appendGenre, remove: removeGenre } = useFieldArray({
    control,
    name: 'genre',
  });

  if (fields.length === 0) {
    append('');
  }

  if (genreFields.length === 0) {
    appendGenre('');
  }

  return (
    <DialogContent className="sm:max-w-[525px] max-h-[700px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add Movie</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            className="col-span-3"
            {...register('title', { required: true })}
          />
          {errors.title && <span className="text-red-500">Title is required</span>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="genres" className="text-right">
            Genre
          </Label>
          <div className="col-span-3 flex flex-col gap-2">
            {genreFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  className="flex-grow"
                  {...register(`genre.${index}` as const, { required: true })}
                />
                <Button variant="ghost" onClick={() => removeGenre(index)}>
                  <CloseIcon size="16" />
                </Button>
              </div>
            ))}
            <Button type="button" size="sm" className="w-10" onClick={() => appendGenre('')}>
              +
            </Button>
          </div>
          {errors.genre && <span className="text-red-500">Genre is required</span>}
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="rating" className="text-right">
            Rating
          </Label>
          <Input
            id="rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            className="col-span-3"
            {...register('rating', { required: true, min: 0, max: 10 })}
          />
          {errors.rating && (
            <span className="text-red-500">
              {errors.rating.type === 'required' && 'Rating is required'}
              {errors.rating.type === 'min' && 'Rating cannot be less than 0'}
              {errors.rating.type === 'max' && 'Rating cannot be more than 10'}
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="director" className="text-right">
            Director
          </Label>
          <Input
            id="director"
            className="col-span-3"
            {...register('director', { required: true })}
          />
          {errors.director && <span className="text-red-500">Director is required</span>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="actors" className="text-right">
            Actors
          </Label>
          <div className="col-span-3 flex flex-col gap-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  className="flex-grow"
                  {...register(`actors.${index}` as const, { required: true })}
                />
                <Button variant="ghost" onClick={() => remove(index)}>
                  <CloseIcon size="16" />
                </Button>
              </div>
            ))}
            <Button type="button" size="sm" className="w-10" onClick={() => append('')}>
              +
            </Button>
          </div>
          {errors.actors && <span className="text-red-500">Actors are required</span>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="release_date" className="text-right">
            Release date
          </Label>
          <Input
            id="release_date"
            type='date'
            className="col-span-3"
            {...register('release_date', { required: true })}
          />
          {errors.release_date && <span className="text-red-500">Release date is required</span>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Image
          </Label>
          <Input
            id="image"
            className="col-span-3"
            {...register('image', { required: true })}
          />
          {errors.image && <span className="text-red-500">Image is required</span>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Type your description here"
            className="resize-none col-span-3"
            {...register('description', { required: true })}
          />
          {errors.description && <span className="text-red-500">Description is required</span>}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onToggleDialog}>Add</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default AddMovieDialog;

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CloseIcon from "../Icons/CloseIcon";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMovie, updateMovie } from "@/api/movieApi";
import { actions as moviesActions } from '@/redux/slices/moviesSlice';
import { formSchema } from "./schema";
import { initialValues } from './MovieForm.constants';
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";
import { Movie } from "@/types/Movie";
import { actions as singleMovieActions } from '@/redux/slices/singleMovieSlice'

interface Props {
  isEdit: boolean,
  cb: () => void,
  defaultValues?: Movie,
}

function MovieForm({ isEdit, cb, defaultValues }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || initialValues,
  })
  const { movies } = useAppSelector(state => state.movies);
  const { register, handleSubmit, control } = form;
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { fields: actorsFields, append: appendActors, remove: removeActors } = useFieldArray({
    control,
    name: 'actors',
  });

  const { fields: genreFields, append: appendGenre, remove: removeGenre } = useFieldArray({
    control,
    name: 'genre',
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isEdit && defaultValues) {
      handleEditSubmit(values, defaultValues)
    } else {
      handeAddSubmit(values)
    }

    cb();
  }

  const handleEditSubmit = async (values: z.infer<typeof formSchema>, defaultValues: Movie) => {
    const movie = { ...values, id: defaultValues.id };

    try {
      await updateMovie(movie);
      dispatch(singleMovieActions.setMovie(movie))
      toast({ description: "Movie successfully updated" });
    } catch {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to update movie.",
      });
    }
  }

  const handeAddSubmit = async (values: z.infer<typeof formSchema>) => {
    const id = (movies.length + 1).toString();

    try {
      const movie = await addMovie({ ...values, id });
      dispatch(moviesActions.setMovie(movie));
      toast({ description: "Movie successfully added" })
    } catch {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to add movie.",
      });
    }
  }

  const handleRemoveGenre = (index: number) => {
    removeGenre(index)

    if (genreFields.length === 1) {
      appendGenre(' ')
    }
  }

  const handleRemoveActor = (index: number) => {
    removeActors(index)

    if (genreFields.length === 1) {
      appendActors(' ')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 [&>*:not([hidden])~:not([hidden])]:mt-4">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3">
          <FormLabel>Genre</FormLabel>
          {genreFields.map((field, index) => {
            return (
              <FormField
                key={field.id}
                control={control}
                name={`genre.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl >
                      <div className="relative">
                        <Input placeholder="Genre" {...field} className="pr-10" />
                        <Button variant="ghost" onClick={() => handleRemoveGenre(index)} className="absolute right-0 top-0">
                          <CloseIcon size="16" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          })}
          <Button type="button" size="sm" className="w-10" onClick={() => appendGenre('')}>
            +
          </Button>
        </div>

        <FormField
          control={control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Rating" {...field} {...register('rating', {
                  valueAsNumber: true
                })} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="director"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Director</FormLabel>
              <FormControl>
                <Input placeholder="Director" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3">
          <FormLabel>Actors</FormLabel>
          {actorsFields.map((field, index) => {
            return (
              <FormField
                key={field.id}
                control={control}
                name={`actors.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl >
                      <div className="relative">
                        <Input placeholder="Actors" {...field} className="pr-10" />
                        <Button variant="ghost" onClick={() => handleRemoveActor(index)} className="absolute right-0 top-0">
                          <CloseIcon size="16" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          })}
          <Button type="button" size="sm" className="w-10" onClick={() => appendActors('')}>
            +
          </Button>
        </div>

        <FormField
          control={control}
          name="release_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release Date</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Release Date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder="Image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} className="resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{isEdit ? 'Edit Movie' : 'Add Movie'}</Button>
      </form>
    </Form>
  )
}

export default MovieForm;

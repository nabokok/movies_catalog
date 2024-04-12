import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import MovieForm from '../MovieForm';
import { Movie } from '@/types/Movie';

interface Props {
  onToggleDialog: () => void,
  isEdit: boolean,
  defaultValues?: Movie,
}

function MovieDialog({ onToggleDialog, isEdit, defaultValues }: Props) {
  return (
    <DialogContent className="sm:max-w-[525px] max-h-[700px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{isEdit ? 'Edit Movie' : 'Add Movie'}</DialogTitle>
      </DialogHeader>
      <MovieForm isEdit={isEdit} cb={onToggleDialog} defaultValues={defaultValues} />
    </DialogContent>
  );
}

export default MovieDialog;

import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { actions as searchActions } from "@/redux/slices/searchSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import Nav from "../nav";
import BurgerIcon from "../icons/BurgerIcon";
import AddMovieDialog from "../dialog/AddMovieDialog";


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { query } = useAppSelector(state => state.search)
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const handleToggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchActions.setSearchQuery(e.target.value))
  }

  return (
    <header className="py-2 border-b border-slate-300">
      <div className="container pl-4 pr-0 md:pr-4">
        <div className="flex items-center justify-between gap-6">
          <Nav isMenuOpen={isMenuOpen} onToggleMenu={handleToggleMenu} />
          <div className="flex w-full max-w-sm items-center space-x-2 justify-end">
            {!id && <Input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={handleInputChange}
            />}
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Movie</Button>
              </DialogTrigger>
              <AddMovieDialog />
            </Dialog>
          </div>
          <Button onClick={handleToggleMenu} variant="ghost" className="md:hidden block"><BurgerIcon /></Button>
        </div>
      </div>
    </header>
  )
}

export default Header;
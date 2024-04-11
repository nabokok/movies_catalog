import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Nav from "../nav";
import BurgerIcon from "../icons/BurgerIcon";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('')

  const handleToggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  return (
    <header className="py-2 border-b border-slate-300">
      <div className="container pl-4 pr-0 ">
        <div className="flex items-center justify-between gap-6">
          <Nav isMenuOpen={isMenuOpen} onToggleMenu={handleToggleMenu} />
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleToggleMenu} variant="ghost" className="md:hidden block"><BurgerIcon /></Button>
        </div>
      </div>
    </header>
  )
}

export default Header;
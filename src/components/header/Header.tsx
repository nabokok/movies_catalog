import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Nav from "./nav";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  return (
    <header className="py-2 border-b border-slate-300">
      <div className="container">
        <div className="flex items-center justify-between">
          <Nav isMenuOpen={isMenuOpen} onToggleMenu={handleToggleMenu} />
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search movies..." />
            <Button type="submit">Search</Button>
          </div>
          <Button onClick={handleToggleMenu} variant="outline" className="md:hidden block">Burger</Button>
        </div>
      </div>
    </header>
  )
}

export default Header;
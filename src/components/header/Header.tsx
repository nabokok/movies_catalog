import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="py-2 border-b border-slate-300">
      <div className="container">
        <div className="flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/watched">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Watched
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/my-list">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    My List
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/favorites">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Favorites
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search movies..." />
            <Button type="submit">Search</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
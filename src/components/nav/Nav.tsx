import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CloseIcon from "@/components/Icons/CloseIcon";

interface Props {
  isMenuOpen: boolean,
  onToggleMenu: () => void,
}

function Nav({ isMenuOpen, onToggleMenu }: Props) {
  return (
    <NavigationMenu className={cn("fixed md:static bg-white inset-0 max-w-full md:max-w-max items-start md:items-center pt-24 md:pt-0 translate-x-full md:translate-x-0 transition-transform", {
      'translate-x-0': isMenuOpen
    })}>
      <Button className="block fixed right-6 top-6 md:hidden" onClick={onToggleMenu} variant="ghost"><CloseIcon /></Button>
      <NavigationMenuList className="flex-col md:flex-row gap-6 md:gap-1">
        <NavigationMenuItem onClick={onToggleMenu}>
          <Link to="/" >
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-3xl md:text-sm")}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem onClick={onToggleMenu}>
          <Link to="/watched">
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-3xl md:text-sm")}>
              Watched
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem onClick={onToggleMenu}>
          <Link to="/my-list">
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-3xl md:text-sm")}>
              My List
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem onClick={onToggleMenu}>
          <Link to="/favorites">
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-3xl md:text-sm")}>
              Favorites
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Nav;

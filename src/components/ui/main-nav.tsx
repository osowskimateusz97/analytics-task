import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? "" : "text-muted-foreground"
    }`;
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <NavLink to="/" className={getNavLinkClass}>
        Dashboard
      </NavLink>
      <NavLink to="/sales" className={getNavLinkClass}>
        Sales
      </NavLink>
      <NavLink to="/orders" className={getNavLinkClass}>
        Orders
      </NavLink>
    </nav>
  );
}

import type { User } from "@supabase/supabase-js";
import { Link, useRouteContext } from "@tanstack/react-router";
import { BookOpen, MonitorIcon, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui";
import { useTheme, type UserTheme } from "./theme";
import { useLogout } from "@/hooks";

const AnimateLink = motion.create(Link);
// type Props = {
//   user: User | null;
// };
const Navbar = () => {
  const { setTheme, userTheme } = useTheme();
  const logout = useLogout();
  const { user } = useRouteContext({ from: "__root__" });

  return (
    <nav
      className="w-full
      bg-background py-3 px-4"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <AnimateLink
          whileHover={{ scale: 1.05 }}
          to="/"
          className="text-lg font-bold text-primary dark:text-primary-foreground flex gap-1 items-center"
        >
          <BookOpen className="size-6" />
          ClarioLane
        </AnimateLink>
        <div className="flex gap-4 items-center">
          {!user ? (
            <Button asChild>
              <AnimateLink to="/auth">Sign in</AnimateLink>
            </Button>
          ) : (
            <Button variant="destructive" onClick={logout}>
              Sign out
            </Button>
          )}
          <Select
            onValueChange={(value: UserTheme) => setTheme(value)}
            defaultValue={userTheme}
          >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Theme</SelectLabel>
                <SelectItem value="light">
                  <Sun /> Light
                </SelectItem>
                <SelectItem value="dark">
                  <Moon />
                  Dark
                </SelectItem>
                <SelectItem value="system">
                  <MonitorIcon />
                  System
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

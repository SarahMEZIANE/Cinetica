import { Home, Film, TrendingUp, Star, Tv, Eye } from "lucide-react";

export const navItems = [
  { name: "discover", icon: <Home className="w-5 h-5" />, section: "main" },
  { name: "now-playing", icon: <Film className="w-5 h-5" />, section: "movies" },
  { name: "popular", icon: <TrendingUp className="w-5 h-5" />, section: "movies" },
  { name: "top-rated", icon: <Star className="w-5 h-5" />, section: "movies" },
  { name: "on-the-air", icon: <Tv className="w-5 h-5" />, section: "shows" },
  { name: "popular", icon: <Eye className="w-5 h-5" />, section: "shows" },
  { name: "top-rated", icon: <Star className="w-5 h-5" />, section: "shows" },
];

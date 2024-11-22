import { Home, Film, TrendingUp, Star, Tv, Eye } from "lucide-react";

export const navItems = [
  { name: "Discover", icon: <Home className="w-5 h-5" />, section: "main" },
  { name: "Now playing", icon: <Film className="w-5 h-5" />, section: "movies" },
  { name: "Popular", icon: <TrendingUp className="w-5 h-5" />, section: "movies" },
  { name: "Top rated", icon: <Star className="w-5 h-5" />, section: "movies" },
  { name: "On the air", icon: <Tv className="w-5 h-5" />, section: "tv" },
  { name: "Popular", icon: <Eye className="w-5 h-5" />, section: "tv" },
  { name: "Top rated", icon: <Star className="w-5 h-5" />, section: "tv" },
];

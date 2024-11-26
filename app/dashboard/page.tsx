'use client'

import DashboardLayout from "@/app/dashboard/DashboardLayout";
import NowPlayingMovies from './movies/now-playing/NowPlayingMovies';

const DashboardPage = () => {
  // Initialisation de l'état pour gérer la section active (par défaut "Popular")

  return (
    <DashboardLayout>
     <NowPlayingMovies />
    </DashboardLayout>
  );
};

export default DashboardPage;

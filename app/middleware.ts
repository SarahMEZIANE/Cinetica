import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirection vers la page de connexion si l'utilisateur n'est pas authentifié
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*", // Toutes les pages sous /dashboard
    "/",                 // La page d'accueil
  ],
};

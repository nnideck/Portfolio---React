import { AdminProjProvider } from "./adminProjContext";
import { AuthProvider } from "./authContext";
import { FirebaseProvider } from "./firebaseContext";
import { PortfolioProvider } from "./portfolioContext";

const ExportsContexts = ({ children }: any) => {
  return (
    <AuthProvider>
      <FirebaseProvider>
        <PortfolioProvider>
          <AdminProjProvider>{children}</AdminProjProvider>
        </PortfolioProvider>
      </FirebaseProvider>
    </AuthProvider>
  );
};

export { ExportsContexts };

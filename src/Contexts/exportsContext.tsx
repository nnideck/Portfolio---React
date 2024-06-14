import { AuthProvider } from "./authContext";
import { FirebaseProvider } from "./firebaseContext";
import { PortfolioProvider } from "./portfolioContext";

const ExportsContexts = ({ children }: any) => {
  return (
    <AuthProvider>
      <FirebaseProvider>
        <PortfolioProvider>{children}</PortfolioProvider>
      </FirebaseProvider>
    </AuthProvider>
  );
};

export { ExportsContexts };

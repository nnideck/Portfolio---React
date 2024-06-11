
import { FirebaseProvider } from "./firebaseContext";
import {PortfolioProvider} from "./portfolioContext"

const ExportsContexts = ({ children }: any) => {
    return (
      <FirebaseProvider>
        <PortfolioProvider>{children}</PortfolioProvider>
      </FirebaseProvider>
    );
  };
  
  export { ExportsContexts };
  
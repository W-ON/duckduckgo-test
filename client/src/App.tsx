import React from "react";
import SearchPage from "./components/SearchPage";
import { AppContainer } from "./styles/SharedStyles";

const App: React.FC = () => {
  return (
    <AppContainer>
      <SearchPage />
    </AppContainer>
  );
};

export default App; 
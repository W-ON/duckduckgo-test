import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Failed to find the root element. Make sure there is a <div id='root'></div> in your HTML."
  );
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>
); 
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";
import { MantineProvider } from "@mantine/core";
import { createTheme } from "./theme.js";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <MantineProvider theme={createTheme} withNormalizeCSS withGlobalStyles>
      <App />
    </MantineProvider>
  </Provider>
);
reportWebVitals();

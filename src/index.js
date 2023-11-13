import React from "react";
import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";
import "../src/GlobalStyles/globalStyles.scss";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { instanceKream } from "./services";

const fetcher = (url, init) => instanceKream.get(url, init);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SWRConfig value={{
    fetcher,
    revalidateOnMount: false,
    revalidateOnFocus: false,
    dedupingInterval: 60*5*1000
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SWRConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./Styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Preloader from "./components/PreLoader";

const queryClient = new QueryClient();

const RootComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      handleLoad(); 
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <React.StrictMode>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            padding: "8px",
            fontWeight: "bold",
          },
          duration: 2000,
        }}
      />
      <QueryClientProvider client={queryClient}>
        {loading ? <Preloader /> : <App />}
      </QueryClientProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);

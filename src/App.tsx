import React from "react";
import { PackagesGraphProvider } from "./context/packagesGraphContext";
import { AppRouter } from "./AppRouter";
import { DatabaseProvider } from "./context/databaseContext";

export default function App() {
  return (
    <DatabaseProvider>
      <PackagesGraphProvider>
        <AppRouter />
      </PackagesGraphProvider>
    </DatabaseProvider>
  );
}

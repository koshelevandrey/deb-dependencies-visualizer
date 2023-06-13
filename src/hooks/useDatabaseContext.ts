import React from "react";
import { DatabaseContext } from "../context/databaseContext";
import { DatabaseContextType } from "../types/packagesGraph.types";

export const useDatabaseContext = () => {
  return React.useContext(DatabaseContext) as DatabaseContextType;
};

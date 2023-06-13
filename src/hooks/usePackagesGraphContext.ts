import React from "react";
import { PackagesGraphContext } from "../context/packagesGraphContext";
import { PackagesGraphContextType } from "../types/packagesGraph.types";

export const usePackagesGraphContext = () => {
  return React.useContext(PackagesGraphContext) as PackagesGraphContextType;
};

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  PackagesGraph,
  PackagesGraphContextType,
} from "../types/packagesGraph.types";
import { useDatabaseContext } from "../hooks/useDatabaseContext";
import { getPackagesDependencies } from "../utils/database/getPackagesDependencies";

export const PackagesGraphContext =
  React.createContext<PackagesGraphContextType | null>(null);

interface PackagesGraphProviderProps {
  children: React.ReactNode;
}

const DEFAULT_GRAPH: PackagesGraph = { nodes: [], edges: [] };

export const PackagesGraphProvider = ({
  children,
}: PackagesGraphProviderProps) => {
  const [graph, setGraph] = useState<PackagesGraph>(DEFAULT_GRAPH);
  const [graphKey, setGraphKey] = useState<string>(uuidv4());
  const { database } = useDatabaseContext();

  const setPackageForGraph = async (packageName: string): Promise<boolean> => {
    return new Promise(async (resolve) => {
      const packagesGraph = await getPackagesDependencies(
        packageName,
        database
      );
      setGraph(packagesGraph);
      setGraphKey(uuidv4());
      resolve(true);
    });
  };

  return (
    <PackagesGraphContext.Provider
      value={{ graph, graphKey, setPackageForGraph }}
    >
      {children}
    </PackagesGraphContext.Provider>
  );
};

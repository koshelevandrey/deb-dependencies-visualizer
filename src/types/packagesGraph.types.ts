import { Database } from "sql.js";

export type PackageNode = {
  id: number;
  label: string;
  title: string;
};

export type PackageEdge = {
  from: number;
  to: number;
  type?: "depends" | "breaks";
};

export type PackagesGraph = {
  nodes: PackageNode[];
  edges: PackageEdge[];
};

export type PackagesGraphContextType = {
  graph: PackagesGraph;
  setPackageForGraph: (packageName: string) => Promise<boolean>;
  // Graph key is needed for proper unmounting of previous graph
  graphKey: string;
};

export type DatabaseContextType = {
  database: Database;
};

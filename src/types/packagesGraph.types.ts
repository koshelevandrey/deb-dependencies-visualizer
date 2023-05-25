export type PackageNode = {
  id: number;
  label: string;
  title: string;
};

export type PackageEdge = {
  from: number;
  to: number;
};

export type PackagesGraph = {
  nodes: PackageNode[];
  edges: PackageEdge[];
};

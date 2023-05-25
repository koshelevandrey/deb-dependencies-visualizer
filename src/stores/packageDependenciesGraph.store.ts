import { createStore, createEvent, Store } from "effector";
import { v4 as uuidv4 } from "uuid";
import { PackagesGraph } from "../types/packagesGraph.types";

export type PackageDependenciesGraphStoreState = {
  graph: PackagesGraph;
  // Graph key is needed for proper unmounting of previous graph
  graphKey: string;
};

const defaultState: PackageDependenciesGraphStoreState = {
  graph: { nodes: [], edges: [] },
  graphKey: uuidv4(),
};

export const graphUpdated = createEvent<PackagesGraph>();

export const packageDependenciesGraphStore: Store<PackageDependenciesGraphStoreState> =
  createStore(defaultState).on(
    graphUpdated,
    (state, newGraph: PackagesGraph) => {
      return { ...state, graph: newGraph, graphKey: uuidv4() };
    }
  );

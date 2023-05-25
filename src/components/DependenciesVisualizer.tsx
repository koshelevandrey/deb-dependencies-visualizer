import React from "react";
// @ts-ignore
import Graph from "react-graph-vis";
import { PackageEdge, PackageNode } from "../types/packagesGraph.types";
import { useStore } from "effector-react";
import { packageDependenciesGraphStore } from "../stores/packageDependenciesGraph.store";

interface DependenciesVisualizerProps {
  className?: string;
}

const GRAPH_OPTIONS = {
  layout: {
    hierarchical: true,
  },
  edges: {
    color: "#000000",
  },
  height: "600px",
  width: "100%",
  autoResize: true,
  clickToUse: true,
};

const GRAPH_EVENTS = {
  select: function (event: { nodes: PackageNode[]; edges: PackageEdge[] }) {
    // TODO: do something on select
    // var { nodes, edges } = event;
  },
};

export const DependenciesVisualizer = ({
  className = "",
}: DependenciesVisualizerProps) => {
  const { graph, graphKey } = useStore(packageDependenciesGraphStore);

  return (
    <div className={`${className}`}>
      <Graph
        graph={graph}
        key={graphKey}
        options={GRAPH_OPTIONS}
        events={GRAPH_EVENTS}
        /*getNetwork={(network) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}*/
      />
    </div>
  );
};

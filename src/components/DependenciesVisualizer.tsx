import React from "react";
// @ts-ignore
import Graph from "react-graph-vis";
import { usePackagesGraphContext } from "../hooks/usePackagesGraphContext";

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

const GRAPH_EVENTS = {};

export const DependenciesVisualizer = ({
  className = "",
}: DependenciesVisualizerProps) => {
  const { graph, graphKey } = usePackagesGraphContext();

  return (
    <div className={`${className}`}>
      <Graph
        graph={graph}
        key={graphKey}
        options={GRAPH_OPTIONS}
        events={GRAPH_EVENTS}
      />
    </div>
  );
};

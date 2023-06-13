import React from "react";
import { PackagesSearch } from "../components/PackagesSearch";
import { DependenciesVisualizer } from "../components/DependenciesVisualizer";

export const VisualizeDependencies = () => {
  return (
    <>
      <PackagesSearch className="mx-auto mt-[20px] w-[400px]" />
      <DependenciesVisualizer className="mx-[40px] mt-[30px] min-h-[100px] rounded-[5px] bg-gray-100 p-4 text-xl text-black" />
    </>
  );
};

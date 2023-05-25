import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faBoxes,
  faPeopleCarryBox,
  faMouse,
  faMaximize,
} from "@fortawesome/free-solid-svg-icons";
import { PackagesSearch } from "../components/PackagesSearch";
import { DependenciesVisualizer } from "../components/DependenciesVisualizer";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-700 to-gray-800 p-3 text-sm text-white">
      <header className="mx-auto w-fit text-3xl font-bold">
        <FontAwesomeIcon icon={faBox} color="#fff" /> Deb Packages{" "}
        <FontAwesomeIcon icon={faPeopleCarryBox} color="#fff" /> Dependencies
        Visualizer <FontAwesomeIcon icon={faBoxes} color="#fff" />
      </header>
      <PackagesSearch className="mx-auto mt-[20px] w-[400px]" />
      <DependenciesVisualizer className="mx-[40px] mt-[30px] min-h-[100px] rounded-[5px] bg-gray-100 p-4 text-xl text-black" />
      <div className="ml-auto mr-[50px] mt-[10px] flex gap-[20px]">
        <div className="flex items-center gap-[5px]">
          Move with your mouse <FontAwesomeIcon icon={faMouse} color="#fff" />
        </div>
        <div className="flex items-center gap-[5px]">
          Zoom in/out <FontAwesomeIcon icon={faMaximize} color="#fff" />
        </div>
      </div>
    </div>
  );
}

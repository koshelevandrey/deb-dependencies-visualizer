import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faBoxes,
  faPeopleCarryBox,
} from "@fortawesome/free-solid-svg-icons";
import { PackagesSearch } from "../components/PackagesSearch";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-700 to-gray-800 p-3 text-sm text-white">
      <header className="mx-auto w-fit text-3xl font-bold">
        <FontAwesomeIcon icon={faBox} color="#fff" /> Deb Packages{" "}
        <FontAwesomeIcon icon={faPeopleCarryBox} color="#fff" /> Dependencies
        Visualizer <FontAwesomeIcon icon={faBoxes} color="#fff" />
      </header>
      <PackagesSearch className="mx-auto mt-[20px] w-[400px]" />
    </div>
  );
}

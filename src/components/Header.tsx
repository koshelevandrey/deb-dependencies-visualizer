import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faBoxes,
  faPeopleCarryBox,
} from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  return (
    <header className="mx-auto w-fit text-3xl font-bold">
      <FontAwesomeIcon icon={faBox} color="#fff" /> Deb Packages{" "}
      <FontAwesomeIcon icon={faPeopleCarryBox} color="#fff" /> Dependencies
      Visualizer <FontAwesomeIcon icon={faBoxes} color="#fff" />
    </header>
  );
};

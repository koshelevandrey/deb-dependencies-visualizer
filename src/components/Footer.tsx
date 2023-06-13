import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize, faMouse } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  return (
    <div className="ml-auto mr-[50px] mt-[10px] flex gap-[20px]">
      <div className="flex items-center gap-[5px]">
        Move with your mouse <FontAwesomeIcon icon={faMouse} color="#fff" />
      </div>
      <div className="flex items-center gap-[5px]">
        Zoom in/out <FontAwesomeIcon icon={faMaximize} color="#fff" />
      </div>
    </div>
  );
};

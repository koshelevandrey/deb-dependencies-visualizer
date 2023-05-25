import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import { graphUpdated } from "../stores/packageDependenciesGraph.store";
import { PackagesGraph } from "../types/packagesGraph.types";

interface PackagesSearchProps {
  className?: string;
}

const MAX_SEARCH_SUGGESTIONS = 5;

// TODO: remove this mock
const PACKAGES = [
  "adduser",
  "apt",
  "apt-listchanges",
  "apt-utils",
  "autoconf",
  "automake",
  "base-files",
  "bash",
];

// TODO: get suggested packages names from database
const checkSuggestions = (inputValue: string): string[] | null => {
  if (!inputValue) return null;

  const suggestions: string[] = [];

  for (
    let i = 0;
    i < PACKAGES.length && suggestions.length < MAX_SEARCH_SUGGESTIONS;
    i++
  ) {
    const packageName = PACKAGES[i];
    if (packageName.startsWith(inputValue)) {
      suggestions.push(packageName);
    }
  }

  return suggestions?.length ? suggestions : null;
};

export const PackagesSearch = ({ className = "" }: PackagesSearchProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [packageWasFound, setPackageWasFound] = useState<
    boolean | null | undefined
  >(undefined);
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // TODO: add input debounce before checking for dependencies
    // TODO: check if package exists in database
    const suggestions = checkSuggestions(value);
    const packageExists =
      !!value && (suggestions?.includes(value) || PACKAGES.includes(value));

    if (packageExists) {
      setPackageWasFound(true);
    } else {
      setPackageWasFound(false);
    }

    setSuggestions(checkSuggestions(value));
  };

  const handleVisualize = () => {
    // TODO: make graph of dependencies
    if (isVisualizing) return;
    setIsVisualizing(true);

    setTimeout(() => {
      // TODO: replace mock graph with data from database
      const mockGraph: PackagesGraph = {
        nodes: [
          // @ts-ignore
          { id: 1, label: "bash", title: "node 1 tootip text" },
          { id: 2, label: "bash parent 1", title: "node 2 tootip text" },
          { id: 3, label: "bash parent 2", title: "node 3 tootip text" },
          { id: 4, label: "bash parent 3", title: "node 4 tootip text" },
          { id: 5, label: "bash parent 4", title: "node 5 tootip text" },
          { id: 6, label: "node 6", title: "node 6 tootip text" },
          { id: 7, label: "node 7", title: "node 7 tootip text" },
          { id: 8, label: "node 8", title: "node 8 tootip text" },
          { id: 9, label: "node 9", title: "node 9 tootip text" },
          { id: 10, label: "node 10", title: "node 10 tootip text" },
          { id: 11, label: "node 11", title: "node 11 tootip text" },
          { id: 12, label: "node 12", title: "node 12 tootip text" },
          { id: 13, label: "node 13", title: "node 13 tootip text" },
        ],
        edges: [
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 1, to: 6 },
          { from: 1, to: 12 },
          { from: 2, to: 4 },
          { from: 2, to: 7 },
          { from: 3, to: 5 },
          { from: 3, to: 8 },
          { from: 4, to: 9 },
          { from: 4, to: 10 },
          { from: 10, to: 11 },
          { from: 12, to: 13 },
        ],
      };
      graphUpdated(mockGraph);
      setIsVisualizing(false);
    }, 2000);
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && packageWasFound) {
      setSuggestions(null);
      handleVisualize();
    }
  };

  return (
    <>
      <div
        className={`relative rounded-[8px] border-2 bg-gray-200 px-3 py-2 text-xl text-black
        transition-colors duration-200
        ${
          packageWasFound
            ? "border-green-500"
            : inputValue
            ? "border-red-500"
            : "border-transparent"
        }
        ${isVisualizing ? "bg-gray-400" : "bg-gray-200"}
        ${className}`}
      >
        <FontAwesomeIcon
          icon={faSearch}
          color="#000"
          className="absolute bottom-0 left-[10px] top-0 my-auto"
        />
        <input
          type="text"
          className={`w-full pl-[30px] outline-none transition-colors duration-200 ${
            isVisualizing ? "bg-gray-400" : "bg-gray-200"
          }`}
          placeholder="Enter deb package..."
          value={inputValue}
          onChange={onChange}
          onKeyDown={onInputKeyDown}
          disabled={isVisualizing}
        />
        {suggestions?.length ? (
          <ul className="absolute left-[410px] right-0 top-[0px] mx-auto max-h-[300px] w-[300px] rounded-[5px] bg-white py-2">
            {suggestions.map((suggestedPackage) => (
              <li
                className={`cursor-pointer px-2 py-1 hover:bg-gray-300 ${
                  inputValue === suggestedPackage ? "bg-green-200" : "bg-white"
                }`}
                onClick={() => {
                  setInputValue(suggestedPackage);
                  setPackageWasFound(true);
                  setSuggestions(null);
                }}
              >
                {suggestedPackage}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <button
        className="fo mx-auto mt-[20px] min-w-[170px] rounded-[8px] bg-green-700 px-4 py-2 font-spaceGrotesk text-4xl
      transition-colors duration-200 enabled:hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-gray-500"
        disabled={!packageWasFound || isVisualizing}
        onClick={handleVisualize}
      >
        {isVisualizing ? <ClipLoader color="#fff" size={32} /> : "Visualize"}
      </button>
    </>
  );
};

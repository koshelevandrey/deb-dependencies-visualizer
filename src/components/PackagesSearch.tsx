import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface PackagesSearchProps {
  className?: string;
}

const MAX_SUGGESTIONS = 5;

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
    i < PACKAGES.length && suggestions.length < MAX_SUGGESTIONS;
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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    setSuggestions(checkSuggestions(value));
  };

  return (
    <div
      className={`relative rounded-[8px] bg-gray-200 px-3 py-2 text-xl text-black ${className}`}
    >
      <FontAwesomeIcon
        icon={faSearch}
        color="#000"
        className="absolute bottom-0 left-[10px] top-0 my-auto"
      />
      <input
        type="text"
        className="w-full bg-gray-200 pl-[30px] outline-none"
        placeholder="Enter deb package..."
        value={inputValue}
        onChange={onChange}
      />
      {suggestions?.length ? (
        <ul className="absolute left-0 right-0 top-[50px] mx-auto max-h-[300px] w-[300px] rounded-[5px] bg-white py-2">
          {suggestions.map((suggestedPackage) => (
            <li
              className="cursor-pointer px-2 py-1 hover:bg-gray-300"
              onClick={() => {
                setInputValue(suggestedPackage);
                setSuggestions(null);
              }}
            >
              {suggestedPackage}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

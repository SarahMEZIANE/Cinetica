"use client";

import { useState, useCallback } from "react";
import debounce from "lodash/debounce";

interface SearchBarProps {
  search: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { search } = props;
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        console.log("Searching for:", query);
        handleSearch(query);
      }
    }, 300),
    [search]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
    }
  };

  return (
    <div className="relative mb-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search movies or TV shows..."
          className="w-44 sm:w-full p-2 max-w-xs bg-white dark:bg-[#444444] rounded-lg focus:outline-none text-black dark:text-white"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#fec04b] text-white px-4 py-1 rounded-lg hover:bg-[#fba806]"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
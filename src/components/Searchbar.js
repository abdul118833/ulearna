import React from "react";

const Searchbar = ({
  searchQuery,
  setSearchQuery,
  handleReset,
  handleSearch,
  loading,
}) => {
  return (
    <div className="text-center my-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-center mx-4 md:mx-0">
        <input
          type="text"
          placeholder="Search city"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none md:w-96 transition duration-200 ease-in-out"
        />
        <div className="w-full md:w-auto flex">
          <button
            onClick={handleSearch}
            className="w-full md:w-auto mr-2 md:mr-0 mt-2 md:mt-0 md:ml-2 p-3 px-5 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition duration-200 ease-in-out"
            disabled={loading}
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="w-full md:w-auto mt-2 md:mt-0 md:ml-2 p-3 px-5 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition duration-200 ease-in-out"
            disabled={loading}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;

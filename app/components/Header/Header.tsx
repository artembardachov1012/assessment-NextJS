'use client'
import React, { useRef, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

interface HeaderProps {
  filterdata: any;
  recentSearches: string[];
  data: any;
  clearSearch: () => void;
  setIsSearchActive: (isActive: boolean) => void;
}

export default function Header({
  filterdata,
  recentSearches,
  clearSearch,
  setIsSearchActive,
  data,
}: HeaderProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const recentSearchRef = useRef<HTMLUListElement>(null);
  const availableSearchRef = useRef<HTMLUListElement>(null)
  const [isRecentSearchesOpen, setRecentSearchesOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [availableSearch, setAvailableSearch] = useState([]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        !recentSearchRef.current?.contains(event.target as Node) &&
        !availableSearchRef.current?.contains(event.target as Node)
      ) {
        setRecentSearchesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleClearSearch = () => {
    setSearch("");
    setRecentSearchesOpen(false);
    clearSearch();
    localStorage.removeItem("recentSearches");
  };
  


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const result = data.filter((ele: any) => {
      return ele.title.toLowerCase().includes(value.toLowerCase()) || ele.description.toLowerCase().includes(value.toLowerCase())
    });
    setAvailableSearch(result)
    setSearch(value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      filterdata(search);
      setIsSearchActive(true);
    }

  };

  const handleRecentSearchClick = (search: string) => {
    setSearch(search);
    setRecentSearchesOpen(false);
    filterdata(search);
    setIsSearchActive(true);
  }

  const handleSearchFieldClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setRecentSearchesOpen(true);
  };

  return (
    <header className="bg-white nav-shadow fixed w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8" aria-label="Global">
        <div className="max-sm:w-full md:w-full lg:flex lg:flex-1 lg:justify-center">
          <div className="py-6 relative w-full">
            <div className="relative">
              <input
                value={search}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                type="text"
                className="block w-full rounded-3xl h-10 border-0 py-1.5 pl-7 pr-14 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-sky-200 sm:text-sm sm:leading-6"
                placeholder="Search by title or description"
                onClick={handleSearchFieldClick}
                ref={searchInputRef}
              />
              {isRecentSearchesOpen && (
                <div className="absolute right-0 top-11 z-50 w-full bg-white shadow-md rounded-md py-2 px-4">

                  {search.length > 0 && <><ul className="mt-1" ref={availableSearchRef}>
                    {availableSearch.map(({ title }: any, index: number) => (

                      <li
                        key={index}
                        className="text-sm text-gray-900 py-1 cursor-pointer hover:underline"
                        onClick={() => handleRecentSearchClick(title)}
                      >
                        {title}
                      </li>
                    ))}
                  </ul></>}

                  {search.length === 0 && <> <p className="text-xs text-gray-900">Recent Searches:</p>
                    <ul className="mt-1" ref={recentSearchRef}>
                      {recentSearches.map((search: string, index: number) => (
                        <li
                          key={index}
                          className="text-sm text-gray-900 py-1 cursor-pointer hover:underline"
                          onClick={() => handleRecentSearchClick(search)}

                        >
                          {search}
                        </li>
                      ))}
                      <button
                      onClick={handleClearSearch}
                      className="text-xs text-gray-500 hover:text-gray-700 mt-2 underline"
                    >
                      Clear Search
                    </button>
                    </ul>
                  </>}

                </div>
              )}
            </div>
            <div className="absolute z-50 inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
              <button onClick={() => {
                filterdata(search);
                setIsSearchActive(true);
                setRecentSearchesOpen(false);
              }}>
                <AiOutlineSearch style={{ pointerEvents: 'none' }} />
              </button>
            </div>
            <div className="absolute inset-y-0 right-10 flex items-center pr-3 cursor-pointer">
              <button onClick={() => {
                setSearch("");
                filterdata('');
                setRecentSearchesOpen(false);
                setIsSearchActive(false);
              }}>
                <RxCross2 />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}




'use client'

// import React, { useState } from "react";
// import Header from "./components/Header/Header";
// import Product from "./components/Product/Product";
// import { data } from "../target.data";

// export default function Home() {
//   const [filteredData, setFilteredData] = useState<any>(data);
//   const [recentSearches, setRecentSearches] = useState<string[]>([]);
//   const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false);
//   const [isSearchActive, setIsSearchActive] = useState(false);

//   const filterdata = async(search: string) => {
//     const result = data.filter((ele) => {
//       return ele.title.toLowerCase().includes(search.toLowerCase()) || ele.description.toLowerCase().includes(search.toLowerCase())
//     });
//     setFilteredData(result);
//     if (search && !recentSearches.includes(search)) {
//       const updatedRecentSearches = [search, ...recentSearches];
//       setRecentSearches(updatedRecentSearches.slice(0, 5));
//     }
//     setShowRecentSearches(true);
//   };

//   const clearSearch = () => {    
//     setRecentSearches([]);
//   };
  

//   const handleSearchClick = () => {
//     setIsSearchActive(true)
//   };

//   return (
//     <main>
//       <Header
//         filterdata={filterdata}
//         data={filteredData}
//         recentSearches={recentSearches}
//         clearSearch={clearSearch}
//         setIsSearchActive={setIsSearchActive}
//       />
//       <Product data={filteredData} />
//     </main>
//   );
// }

import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Product from "./components/Product/Product";
import { data } from "../target.data";

export default function Home() {
  const [filteredData, setFilteredData] = useState<any>(data);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    // Retrieve recent searches from localStorage
    const storedRecentSearches = localStorage.getItem("recentSearches");
    if (storedRecentSearches) {
      setRecentSearches(JSON.parse(storedRecentSearches));
    }
  }, []);

  useEffect(() => {
    // Update localStorage when recent searches change
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  const filterData = (search: string) => {
    const result = data.filter((ele) => {
      return (
        ele.title.toLowerCase().includes(search.toLowerCase()) ||
        ele.description.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredData(result);
    if (search && !recentSearches.includes(search)) {
      const updatedRecentSearches = [search, ...recentSearches];
      setRecentSearches(updatedRecentSearches.slice(0, 5));
    }
    setShowRecentSearches(true);
  };

  const clearSearch = () => {
    console.log('2')
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  return (
    <main>
      <Header
        filterdata={filterData}
        data={filteredData}
        recentSearches={recentSearches}
        clearSearch={clearSearch}
        setIsSearchActive={setIsSearchActive}
      />
      <Product data={filteredData} />
    </main>
  );
}

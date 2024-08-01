"use client"

import { useState } from 'react';
import { useAppContext } from '@mycontext/AppContext';

const FilterSortBar = () => {
  const { AllProperties, setAllProperties } = useAppContext();
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);

    let sortedProperties = [...AllProperties];
    if (value === 'price-asc') {
      sortedProperties.sort((a, b) => a.price - b.price);
    } else if (value === 'price-desc') {
      sortedProperties.sort((a, b) => b.price - a.price);
    } else if (value === 'size-asc') {
      sortedProperties.sort((a, b) => a.size - b.size);
    } else if (value === 'size-desc') {
      sortedProperties.sort((a, b) => b.size - a.size);
    }
    setAllProperties(sortedProperties);
  };

  return (
    <div className="flex flex-col gap-4 mb-8 rounded-xl">
      <div className="flex items-center gap-4">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded-xl"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="size-asc">Size: Small to Large</option>
          <option value="size-desc">Size: Large to Small</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortBar;

import { useState } from 'react';
import { useAppContext } from '@mycontext/AppContext';
import Image from 'next/image';

const SearchBar = ({UpdateAllProperty}) => {
  //const { UpdateAllProperty } = useAppContext();
  const [filters, setFilters] = useState({
    text: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateAllProperty(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
      <div className="flex items-center gap-4">
        <input
          type="text"
          name="text"
          value={filters.text}
          onChange={handleChange}
          placeholder="Search by text"
          className="flex-1 p-2 border border-gray-300 rounded-3xl"
        />
        <button type="submit" className="p-2 bg-orange-300 text-white rounded-full">
        <Image src="/assets/icons/search.svg" alt="search" width={30} height={30} />
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4">
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="Min Price"
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-full"
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Max Price"
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-full"
        />
        </div>
        <div className="flex items-center gap-4">
        <input
          type="number"
          name="minSize"
          value={filters.minSize}
          onChange={handleChange}
          placeholder="Min Size"
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-full"
        />
        <input
          type="number"
          name="maxSize"
          value={filters.maxSize}
          onChange={handleChange}
          placeholder="Max Size"
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-full"
        />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;

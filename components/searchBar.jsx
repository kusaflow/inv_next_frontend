import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useAppContext } from "@mycontext/AppContext";
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import ReactSlider from 'react-slider';
import FilterSortBar from "@components/FilterSortBar";

const SearchBar = ({UpdateAllProperty}) => {
  const { fetchPropertyLimits } = useAppContext();
  const [filters, setFilters] = useState({
    text: '',
    minPrice: 0,
    maxPrice: 250000000,
    minSize: 0,
    maxSize: 1000000
  });

  const [priceRange, setPriceRange] = useState([0, 250000000]);
  const [sizeRange, setSizeRange] = useState([0, 10000]);

  const formatIndianCurrency = (amount) => {
    return amount.toLocaleString('en-IN');
  };

  useEffect(() => {
    const fetchLimits = async () => {
      const limits = await fetchPropertyLimits();
      
      //console.log(limits)
      setPriceRange([limits.minPrice, limits.maxPrice]);
      setSizeRange([limits.minSize, limits.maxSize]);
      setFilters({
        ...filters,
        minPrice: limits.minPrice,
        maxPrice: limits.maxPrice,
        minSize: limits.minSize,
        maxSize: limits.maxSize
      });
    };
    fetchLimits();
  }, []);


  const debouncedFilters = useMemo(() => {
    const handler = setTimeout(() => {
      UpdateAllProperty(filters);
    }, 300); 
    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  useEffect(() => {
    debouncedFilters();
    
    //console.log(filters)
  }, [filters]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSliderChange = (name, values) => {
    setFilters({
      ...filters,
      [`min${name.charAt(0).toUpperCase() + name.slice(1)}`]: values[0],
      [`max${name.charAt(0).toUpperCase() + name.slice(1)}`]: values[1]
    });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateAllProperty(filters);
  };

  const handleReset = () => {
    setFilters({
      text: '',
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minSize: sizeRange[0],
      maxSize: sizeRange[1]
    });
  };

  const handleReset_text = () => {
    setFilters({
      ...filters,
      text: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="min-w-full flex flex-col gap-4 mb-8 bg-slate-200 p-6 rounded-3xl shadow-lg">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 flex items-center gap-4">
          <input
            type="text"
            name="text"
            value={filters.text}
            onChange={handleChange}
            placeholder="Search by text"
            className="flex-1 p-2 border border-gray-300 rounded-3xl"
          />
          <button onClick={handleReset_text} type="button" className="p-2 bg-red-300 text-white rounded-full shadow-sm">
            <Image src="/assets/icons/delete.svg" alt="reset" width={20} height={20} />
          </button>
        </div>
        <div className="w-full md:w-auto mt-8">
          <FilterSortBar />
        </div>
      </div>
      <div className="flex flex-wrap gap-6 justify-between">
        <div className="flex flex-col w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range(₹)</label>
          <Slider
            values={[filters.minPrice, filters.maxPrice]}
            max={priceRange[1]}
            min={priceRange[0]}
            step={100}
            onValueChange={(values) => handleSliderChange('price', values)}
            className="w-full h-2 bg-gray-200 rounded-lg"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>₹{formatIndianCurrency(filters.minPrice)}</span>
          <span>₹{formatIndianCurrency(filters.maxPrice)}</span>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-2/5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Size Range (sqft)</label>
          <Slider
            values={[filters.minSize, filters.maxSize]}
            max={sizeRange[1]}
            min={sizeRange[0]}
            step={100}
            onValueChange={(values) => handleSliderChange('size', values)}
            className="w-full h-2 bg-gray-200 rounded-lg"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>{filters.minSize} sqft</span>
            <span>{filters.maxSize} sqft</span>
          </div>
        </div>
      </div>
      
    </form>
  );
};

export default SearchBar;

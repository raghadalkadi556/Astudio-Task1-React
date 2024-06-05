import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

const ProductFilter = () => {
  const { productPageSize, setProductPageSize, updateProductFilter, productSearchTerm, setProductSearchTerm, productCategory, setProductCategory } = useContext(DataContext);
  const [localFilter, setLocalFilter] = useState({ title: '', brand: '', category: '' });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false); // State for search input visibility

  useEffect(() => {
    fetchCategories();
    fetchBrandOptions();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products/categories');
      setCategoryOptions(['All', ...response.data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrandOptions = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      const brands = new Set(response.data.products.map(product => product.brand));
      setBrandOptions([...brands]);
    } catch (error) {
      console.error('Error fetching brand options:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setLocalFilter({ ...localFilter, [key]: value });

    // Reset other fields when one is applied
    const newFilter = { ...localFilter, [key]: value };
    Object.keys(newFilter).forEach(field => {
      if (field !== key) newFilter[field] = '';
    });

    setLocalFilter(newFilter);
    updateProductFilter(key, value);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <div className="filters">
      <select value={productPageSize} onChange={(e) => setProductPageSize(parseInt(e.target.value))}>
        {[5, 10, 20, 50].map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select><span className='product-select prl-1rem'>Entries</span>

      <div className="search-container search-icon-container">
        <FaSearch onClick={toggleSearch} className='search-icon' />
        {searchVisible && (
          <input
            type="text"
            placeholder="Search"
            value={productSearchTerm}
            onChange={(e) => setProductSearchTerm(e.target.value)}
          />
        )}
      </div>

      <input
        type="text"
        placeholder="Title"
        value={localFilter.title}
        onChange={(e) => handleFilterChange('title', e.target.value)}
        className='ml-15'
      />
      <select
        value={localFilter.brand}
        onChange={(e) => handleFilterChange('brand', e.target.value)}
      >
        <option value="">Select Brand</option>
        {brandOptions.map((option, index) => (
          <option key={`brand-${index}-${option}`} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categoryOptions.map((option, index) => (
          <option key={`category-${index}-${option}`} value={option.slug}>
            {option.slug}
          </option>
        ))}
      </select>
      <div>
        <button onClick={() => setProductCategory('ALL')} className={productCategory === 'ALL' ? 'active' : ''}>ALL</button>
        <button onClick={() => setProductCategory('laptops')} className={productCategory === 'laptops' ? 'active' : ''}>Laptops</button>
      </div>
    </div>
  );
};

export default ProductFilter;

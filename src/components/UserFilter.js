import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { FaSearch } from 'react-icons/fa';

const UserFilter = () => {
  const { userPageSize, setUserPageSize, updateUserFilter, userSearchTerm, setUserSearchTerm } = useContext(DataContext);
  const [localFilter, setLocalFilter] = useState({ firstName: '', birthDate: '', gender: '', email: '' });
  const [searchVisible, setSearchVisible] = useState(false);

  const handleFilterChange = (key, value) => {
    setLocalFilter({ ...localFilter, [key]: value });

    // Reset other fields when one is applied
    const newFilter = { ...localFilter, [key]: value };
    Object.keys(newFilter).forEach(field => {
      if (field !== key) newFilter[field] = '';
    });

    setLocalFilter(newFilter);
    updateUserFilter(key, value);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <div className="filters">
      <select value={userPageSize} onChange={(e) => setUserPageSize(parseInt(e.target.value))}>
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
            value={userSearchTerm}
            onChange={(e) => setUserSearchTerm(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        )}
      </div>

      <input
        type="text"
        placeholder="Name"
        value={localFilter.firstName}
        onChange={(e) => handleFilterChange('firstName', e.target.value)}
        className='ml-15'
      />
      <input
        type="email"
        placeholder="Email"
        value={localFilter.email}
        onChange={(e) => handleFilterChange('email', e.target.value)}
      />
      <input
        type="text"
        placeholder="Birth Date"
        value={localFilter.birthDate}
        onChange={(e) => handleFilterChange('birthDate', e.target.value)}
      />
      <input
        type="text"
        placeholder="Gender"
        value={localFilter.gender}
        onChange={(e) => handleFilterChange('gender', e.target.value)}
      />
    </div>
  );
};

export default UserFilter;

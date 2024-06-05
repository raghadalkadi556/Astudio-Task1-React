import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPageSize, setUserPageSize] = useState(5);
  const [productPageSize, setProductPageSize] = useState(5);
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const [productCurrentPage, setProductCurrentPage] = useState(1);
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState({ key: '', value: '' });
  const [productFilter, setProductFilter] = useState({ key: '', value: '' });
  const [productCategory, setProductCategory] = useState('ALL');
  const [totalUsers, setTotalUsers] = useState(0); // Total count for users
  const [totalProducts, setTotalProducts] = useState(0); // Total count for products

  useEffect(() => {
    fetchUsers();
  }, [userPageSize, userCurrentPage, userFilter]);

  useEffect(() => {
    fetchProducts();
  }, [productPageSize, productCurrentPage, productFilter, productCategory]);

  const fetchUsers = async () => {
    setLoading(true);
    const skip = (userCurrentPage - 1) * userPageSize;
    let query = `https://dummyjson.com/users?limit=${userPageSize}&skip=${skip}`;
    if (userFilter.key && userFilter.value) {
      query = `https://dummyjson.com/users/filter?key=${userFilter.key}&value=${userFilter.value}`;
    }
    
    try {
      const response = await axios.get(query);
      
      setUsers(response.data.users || []);
      setTotalUsers(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setTotalUsers(0);
    }
    setLoading(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const skip = (productCurrentPage - 1) * productPageSize;
   
    let query = `https://dummyjson.com/products?limit=${productPageSize}&skip=${skip}`;
    if (productCategory !== 'ALL') {
        query = `https://dummyjson.com/products/category/${productCategory}`;
      }
    if (productFilter.key && productFilter.value) {
        query = `https://dummyjson.com/products/search?q=${productFilter.value}`;
    }
    
    try {
      const response = await axios.get(query);
      setProducts(response.data.products || []);
      setTotalProducts(response.data.total || 0);
    } catch (error) {
      setProducts([]);
      setTotalProducts(0);
    }
    setLoading(false);
  };

  const updateUserFilter = (key, value) => {
    setUserFilter({ key, value });
    setUserCurrentPage(1); // Reset to first page when filter changes
  };

  const updateProductFilter = (key, value) => {
    setProductFilter({ key, value });
    setProductCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <DataContext.Provider value={{
      users, products, loading, 
      userPageSize, setUserPageSize, userCurrentPage, setUserCurrentPage, userSearchTerm, setUserSearchTerm, userFilter, updateUserFilter,
      productPageSize, setProductPageSize, productCurrentPage, setProductCurrentPage, productSearchTerm, setProductSearchTerm, productFilter, updateProductFilter, productCategory, setProductCategory,
      totalUsers, totalProducts
    }}>
      {children}
    </DataContext.Provider>
  );
};

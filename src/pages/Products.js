import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import Table from '../components/Table';
import ProductFilter from '../components/ProductFilter';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

const Products = () => {
  const { products, loading, productSearchTerm } = useContext(DataContext);

  // Apply client-side filtering based on searchTerm
  const filteredProducts = products.filter(product =>
    Object.values(product).some(value =>
      String(value).toLowerCase().includes(productSearchTerm.toLowerCase())
    )
  );

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Brand', accessor: 'brand' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', accessor: 'price' },
    { header: 'Rating', accessor: 'rating' },
  ];

  return (
    <div className="products-page">
      <h1>Home / <span className="yellow-underline2">Products</span></h1>
      <Link to="/users" className='float-right'>Go to Users</Link>
      <ProductFilter />
      {loading ? <p>Loading...</p> : <Table data={filteredProducts} columns={columns} />}
      <Pagination />
    </div>
  );
};

export default Products;

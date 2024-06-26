import React, { useContext } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { DataContext } from '../context/DataContext';

const Pagination = ({ isUsersData }) => {
  const {
    userPageSize,
    userCurrentPage,
    setUserCurrentPage,
    productPageSize,
    productCurrentPage,
    setProductCurrentPage,
    totalUsers,
    totalProducts
  } = useContext(DataContext);

  const totalPages = isUsersData
    ? Math.ceil(totalUsers / userPageSize)
    : Math.ceil(totalProducts / productPageSize);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent out-of-bound page changes
    if (isUsersData) {
      setUserCurrentPage(page);
    } else {
      setProductCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const currentPage = isUsersData ? userCurrentPage : productCurrentPage;

    const firstPage = 1;
    const lastPage = totalPages;
    const visiblePages = 5;
    const pagesToShow = [];

    if (totalPages <= visiblePages) {
      for (let i = firstPage; i <= lastPage; i++) {
        pagesToShow.push(i);
      }
    } else {
      const halfVisiblePages = Math.floor(visiblePages / 2);

      if (currentPage <= halfVisiblePages + 1) {
        for (let i = firstPage; i <= visiblePages - 1; i++) {
          pagesToShow.push(i);
        }
        pagesToShow.push('...');
        pagesToShow.push(lastPage);
      } else if (currentPage >= lastPage - halfVisiblePages) {
        pagesToShow.push(firstPage);
        pagesToShow.push('...');
        for (let i = lastPage - visiblePages + 2; i <= lastPage; i++) {
          pagesToShow.push(i);
        }
      } else {
        pagesToShow.push(firstPage);
        pagesToShow.push('...');
        for (let i = currentPage - halfVisiblePages; i <= currentPage + halfVisiblePages; i++) {
          pagesToShow.push(i);
        }
        pagesToShow.push('...');
        pagesToShow.push(lastPage);
      }
    }

    return pagesToShow.map((page, index) => {
      if (page === '...') {
        return <span key={index}>{page}</span>;
      }
      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? 'active' : ''}
          style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button
          onClick={() => handlePageChange(isUsersData ? userCurrentPage - 1 : productCurrentPage - 1)}
          disabled={isUsersData ? userCurrentPage === 1 : productCurrentPage === 1}
          style={{ cursor: (isUsersData && userCurrentPage === 1) || (!isUsersData && productCurrentPage === 1) ? 'not-allowed' : 'pointer' }}
        >
          <FaArrowLeft />
        </button>
        {renderPagination()}
        <button
          onClick={() => handlePageChange(isUsersData ? userCurrentPage + 1 : productCurrentPage + 1)}
          disabled={isUsersData ? userCurrentPage === totalPages : productCurrentPage === totalPages}
          style={{ cursor: (isUsersData && userCurrentPage === totalPages) || (!isUsersData && productCurrentPage === totalPages) ? 'not-allowed' : 'pointer' }}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

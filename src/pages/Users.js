import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import Table from '../components/Table';
import UserFilter from '../components/UserFilter';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

const Users = () => {
  const { users, loading, userSearchTerm } = useContext(DataContext);

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      String(value).toLowerCase().includes(userSearchTerm.toLowerCase())
    )
  );

  const columns = [
    { header: 'First Name', accessor: 'firstName' },
    { header: 'Last Name', accessor: 'lastName' },
    { header: 'Maiden Name', accessor: 'maidenName' },
    { header: 'Age', accessor: 'age' },
    { header: 'Gender', accessor: 'gender' },
    { header: 'Email', accessor: 'email' },
    { header: 'Username', accessor: 'username' },
    { header: 'Blood Group', accessor: 'bloodGroup' },
    { header: 'Eye Color', accessor: 'eyeColor' },
    { header: 'Birth Date', accessor: 'birthDate' },
    { header: 'Height', accessor: 'height' },
    { header: 'Weight', accessor: 'weight' },
  ];

  return (
    <div className="users-page">
      <h1>Home / <span className="yellow-underline">Users</span></h1>
      <Link to="/products" className='float-right'>Go to Products</Link>
      <UserFilter />
      {loading ? <p>Loading...</p> : <Table data={filteredUsers} columns={columns} />}
      <Pagination isUsersData={true} />  {/* Ensure isUsersData is true for Users */}
    </div>
  );
};

export default Users;

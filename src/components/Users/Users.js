import React from 'react'
import { Link } from 'react-router-dom';
import UsersTable from './UsersTable'

const Users = ({ companyChecker = 'all', showUsers = true }) => {
  return (
    <>
      {
        showUsers && <section className="users-company-wrapper">
          <div className="title-wrapper">
            <h1>Users:</h1>
            <Link className="btn" to={companyChecker === 'all' ? `/users/add-user` : `/users/add-user/${companyChecker}`}>Add a User</Link>
          </div>

          <UsersTable companyChecker={companyChecker} />
        </section>
      }
    </>
  )
}

export default Users

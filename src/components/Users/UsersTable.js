import React from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';

export const UsersTable = ({ companyChecker }) => {
  const { companies, users, deleteUser } = useGlobalContext();

  if (companies) {
    if (companyChecker === 'all') {
      return (
        <div className="users">
          <article className="user heading">
            <h3>Name</h3>
            <h3>Date of Birth</h3>
            <h3>Company</h3>
            <h3>Position</h3>
          </article>
          {
            users.map(user => {
              const { id, firstName, lastName, companyName, dob, position } = user;
              return (
                <article key={id} className="user">
                  <h3>{`${firstName} ${lastName}`}</h3>
                  <h3>{dob}</h3>
                  <h3>{companyName}</h3>
                  <h3>{position}</h3>
                  <div className="btn-wrapper">
                    <Link className="btn" to={`/users/user/${id}`}>Edit</Link>
                  </div>
                  <div className="btn-wrapper">
                    <button className="btn" onClick={() => { deleteUser(id) }}>Delete</button>
                  </div>
                </article>
              )
            })
          }
        </div>
      )
    }

    if (companyChecker !== undefined && companyChecker !== 'all') {
      const [currentCompany] = companies.filter(company => {
        return company.id === companyChecker
      })
      if (!currentCompany) {
        return <div className="users"></div>
      } else {
        return (
          <div className="users">
            {
              currentCompany.users.map(user => {
                const { id, firstName, lastName, companyName, dob, position } = user;
                return (
                  <article key={id} className="user">
                    <h3>{`${firstName} ${lastName}`}</h3>
                    <h3>{dob}</h3>
                    <h3>{companyName}</h3>
                    <h3>{position}</h3>
                    <div className="btn-wrapper">
                      <Link className="btn" to={`/users/user/${id}`}>Edit</Link>
                    </div>
                    <div className="btn-wrapper">
                      <button className="btn" onClick={() => { deleteUser(id) }}>Delete</button>
                    </div>
                  </article>
                )
              })
            }
          </div>
        )
      }
    }
  }
  return (
    <div className="users"></div>
  )
}

export default UsersTable;

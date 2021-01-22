import React from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';

const Companies = () => {
  const { companies, users, deleteCompany } = useGlobalContext();

  if (companies) {
    return (
      <section className="users-company-wrapper">
        <div className="title-wrapper">
          <h1>Companies:</h1>
          <Link className="btn" to={`/companies/add-company`}>Add a Company</Link>
        </div>
        <div className="users">
          <article className="user heading">
            <h3>Name</h3>
            <h3>City</h3>
            <h3>Country</h3>
            <h3>No. of Users</h3>
          </article>
          {
            companies.map(company => {
              const { id, name, users, city, country } = company;
              return (
                <article key={id} className="user">
                  <h3>{name}</h3>
                  <h3>{city}</h3>
                  <h3>{country}</h3>
                  <h3>{users.length}</h3>
                  <div className="btn-wrapper">
                    <Link className="btn" to={`/companies/company/${id}`}>Edit</Link>
                  </div>
                  <div className="btn-wrapper">
                    <button className="btn" onClick={() => { deleteCompany(id) }}>Delete</button>
                  </div>
                </article>
              )
            })
          }
        </div>
      </section>
    )
  }
  return 'Loading...'


}

export default Companies

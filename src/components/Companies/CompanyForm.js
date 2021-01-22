import React, { useState, useEffect } from 'react'
import Users from '../Users/Users'
import { useParams, useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../context';

const CompanyForm = () => {
  const { companies, randomId, addCompany, editCompany } = useGlobalContext();
  let { id } = useParams();
  const history = useHistory();

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  // For checking whether users arr is empty to show or not users table (title actually).
  const [checkUsers, setCheckUsers] = useState([]);

  useEffect(() => {
    if (id !== 'add-company' && companies) {
      const selectedCompany = companies.filter(company => company.id === id);
      if (selectedCompany.length > 0) {
        setCheckUsers(selectedCompany[0].users)
      }
    }
  }, [checkUsers, companies])


  const handleSubmit = (e) => {
    e.preventDefault();

    let users;
    const selectedCompany = companies.filter(company => company.id === id);
    if (selectedCompany.length > 0) {
      users = selectedCompany[0].users.map(user => {
        return { ...user, companyId: id, companyName: name }
      });
    }

    const newCompanyInfo = {
      id: randomId(),
      name,
      users: [],
      city,
      country,
    }
    const editedCompanyInfo = {
      id,
      name,
      users,
      city,
      country,
    }
    if (id === 'add-company') {
      addCompany(newCompanyInfo);
    } else {
      editCompany(id, editedCompanyInfo);
    }
    history.push('/companies')
  }

  return (
    <section className="users-company-wrapper">
      <div className="title-wrapper">
        <h1>{id === 'add-company' ? 'Add New Company:' : 'Edit Company Info:'}</h1>
        <button className="btn" type="submit" form="addOrEditCompanyForm">Save</button>
      </div>

      <div className="form-wrapper">
        <form id="addOrEditCompanyForm" onSubmit={handleSubmit}>
          <label htmlFor="">Name:</label>
          <input type="text" value={name} required onChange={(e) => setName(e.target.value)} />
          <label htmlFor="">City:</label>
          <input type="text" value={city} required onChange={(e) => setCity(e.target.value)} />
          <label htmlFor="">Country:</label>
          <input type="text" value={country} required onChange={(e) => setCountry(e.target.value)} />
        </form>
      </div>
      <Users companyChecker={id} showUsers={id !== 'add-company'} />

    </section>
  )
}

export default CompanyForm

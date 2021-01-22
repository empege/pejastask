import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserForm = () => {
  const { companies, randomId, addUser, editUser } = useGlobalContext();
  let { id, companyIdParam } = useParams();
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [dob, setDob] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (companyIdParam) {
      setCompanyId(companyIdParam)
    }
  }, [])

  const handlePhone = (e) => {
    const input = e.target.value;
    const regex = /^[0-9]+$/g;
    const found = input.match(regex);
    if (!isNaN(input) && found)
      setPhone(input);
  }
  const handleCompany = (e) => {
    setCompanyId(e.target.value);
  }

  const handleDob = (date) => {
    setStartDate(date)
  }

  useEffect(() => {
    setDob(`${startDate.getUTCDate() < 10 ? '0' + startDate.getUTCDate() : startDate.getUTCDate()}/${startDate.getMonth() + 1 < 10 ? '0' + (startDate.getMonth() + 1) : startDate.getMonth() + 1}/${startDate.getFullYear()}`)
  }, [startDate])

  const handleSubmit = (e) => {
    e.preventDefault();

    const companyName = companies.find(company => company.id === companyId).name;

    const newUserInfo = {
      id: randomId(),
      firstName,
      lastName,
      companyId,
      companyName,
      dob,
      position,
      phone,
    }
    const editedUserInfo = {
      id,
      firstName,
      lastName,
      companyId,
      companyName,
      dob,
      position,
      phone,
    }
    if (id === 'add-user') {
      addUser(companyId, newUserInfo)
    } else {
      editUser(id, companyId, editedUserInfo);
      //PITAJ PEJICA! DA LI JE useState async i ako jeste, a jeste, sta raditi. Jer ako se stavi ovo ispod sto sam stavio, ovaj add user ne vidi novi state companies-a, nego stari, i onda samo doda novi, bez brisanja starog, a onda kad izbrisem taj jedan, obrisu se oba jer naravno imaju isti id. Koje je resenjeeee Pejicuuuuu xD
      // deleteUser(id, companyId, editedUserInfo);
      // addUser(companyId, editedUserInfo)
    }
    history.push('/')
  }

  if (companies !== null) {
    return (
      <section className="users-company-wrapper">
        <div className="title-wrapper">
          <h1>{id === 'add-user' ? 'Add New User:' : 'Edit User Info:'}</h1>
          <button className="btn" type="submit" form="addOrEditUserForm">Save</button>
        </div>
        <div className="form-wrapper">
          <form id="addOrEditUserForm" onSubmit={handleSubmit}>
            <label htmlFor="">First Name:</label>
            <input type="text" value={firstName} required onChange={(e) => setFirstName(e.target.value)} />
            <label htmlFor="">Last Name:</label>
            <input type="text" value={lastName} required onChange={(e) => setLastName(e.target.value)} />
            <label htmlFor="">Company:</label>
            <select value={companyId} required onChange={(e) => handleCompany(e)} >
              <option value="">--Please choose a company--</option>
              {
                companies.map(company => {
                  const { id, name } = company;
                  return (
                    <option key={id} value={id}>{name}</option>
                  )
                })
              }
            </select>
            <label htmlFor="">Date of Birth:</label>
            <DatePicker
              selected={startDate}
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
              showYearDropdown
              scrollableMonthYearDropdown
              onChange={date => handleDob(date)}
            />
            {/* <input type="text" value={dob} required onChange={(e) => setDob(e.target.value)} /> */}
            <label htmlFor="">Position:</label>
            <select value={position} required onChange={(e) => setPosition(e.target.value)} >
              <option value="">--Please choose a position--</option>
              <option value="Manager">Manager</option>
              <option value="QA Engineer">QA Engineer</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Stuff">Stuff</option>
            </select>
            <label htmlFor="">Phone Number: <br /><span>(Exactly 9 digits required)</span></label>
            <input type="text" maxLength="9" pattern="[0-9]{9}" value={phone} required onChange={(e) => handlePhone(e)} />
          </form>
        </div>
      </section>

    )
  }
  return 'Loading...'
}

export default UserForm

import React, { useState, useContext, useEffect } from 'react';
import { data } from './data'

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [companies, setCompanies] = useState(null);
  const [users, setUsers] = useState([])

  const getUsers = () => {
    const newUsers = [];
    if (companies) {
      companies.forEach(company => {
        if (company.users) {
          newUsers.push(...company.users);
        }
      })
    }
    setUsers(newUsers);
  }

  //Random Id function for creating guids
  function randomId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  //set companies - get users - put in localStorage
  const setGetLocal = (newCompanies) => {
    setCompanies(newCompanies);
    getUsers();
    localStorage.setItem('companies', JSON.stringify(newCompanies))
  }

  /* USERS */
  //delete user
  const deleteUser = (id) => {
    const newCompanies = companies.map(company => {
      const passedUsers = company.users.filter(user => {
        return user.id !== id;
      })
      return { ...company, users: passedUsers };
    })
    setGetLocal(newCompanies);
  }
  //add user
  const addUser = (companyId, newUserInfo) => {
    const newCompanies = companies.map(company => {
      if (company.id === companyId) {
        const newUsers = [...company.users, newUserInfo];
        return { ...company, users: newUsers }
      }
      return company;
    })
    setGetLocal(newCompanies);
  }
  //edit user
  const editUser = (id, companyId, editedUserInfo) => {
    const deletedUserCompanies = companies.map(company => {
      const passedUsers = company.users.filter(user => {
        return user.id !== id;
      })
      return { ...company, users: passedUsers };
    })
    const newCompanies = deletedUserCompanies.map(company => {
      if (company.id === companyId) {
        const newUsers = [...company.users, editedUserInfo];
        return { ...company, users: newUsers }
      }
      return company;
    })
    setGetLocal(newCompanies);
  }

  /* COMPANIES */
  //delete company
  const deleteCompany = (id) => {
    const newCompanies = companies.filter(company => company.id !== id)
    setGetLocal(newCompanies);
  }
  //add company
  const addCompany = (newCompanyInfo) => {
    const newCompanies = [...companies, newCompanyInfo];
    setGetLocal(newCompanies);
  }
  //edit company
  const editCompany = (id, editedCompanyInfo) => {
    const newCompanies = companies.map(company => {
      console.log(editedCompanyInfo)
      if (company.id === id) {
        return editedCompanyInfo
      }
      return company
    })
    setGetLocal(newCompanies);
  }

  //Location and Fetch Weather Data
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(false);
  const [weatherError, setWeatherError] = useState(false);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setWeatherLoading(false);
    }
  }
  async function showPosition(position) {
    setWeatherLoading(true);
    //CORS proxy! :D
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //first get location and with it nearest cities
    const [lat, long] = [position.coords.latitude, position.coords.longitude];
    const locationResp = await fetch(`${proxyurl}https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`)
    if (locationResp.ok === false) {
      setWeatherError(true);
      setWeatherLoading(false);
    } else {
      //get weather info from the nearest city
      const weatherLocation = await locationResp.json();
      const closestCity = weatherLocation[0].woeid;
      const weatherDataResp = await fetch(`${proxyurl}https://www.metaweather.com/api/location/${closestCity}`)
      const weather = await weatherDataResp.json();
      if (!weatherDataResp.ok) {
        setWeatherLoading(false);
        setWeatherError(true);
      }
      setWeatherLoading(false);
      setWeatherData(weather);
      // console.log(weather)
    }
  }
  useEffect(() => {
    getLocation();
    // Get Companies Data from Local Storage or if none there, from data.js
    if (localStorage.getItem('companies') !== null) {
      const companiesData = JSON.parse(localStorage.getItem('companies'));
      setCompanies(companiesData);
    } else {
      localStorage.setItem('companies', JSON.stringify(data))
      setCompanies(data);
    }
  }, [])

  useEffect(() => {
    getUsers();
  }, [companies])

  return (
    <AppContext.Provider value={{
      weatherLoading,
      setWeatherLoading,
      getLocation,
      weatherData,
      weatherError,
      randomId,
      // isLoadingData,
      companies,
      setCompanies,
      users,
      deleteUser,
      addUser,
      editUser,
      deleteCompany,
      addCompany,
      editCompany,
    }}>
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
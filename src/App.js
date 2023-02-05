import { useEffect, useState } from "react";
import Spinner from 'reactjs-simple-spinner'
import styled from "styled-components";
import './App.css';

const Wrapper = styled.div`
  max-width: 600px;
  background: #dfdfdf;
  border-radius: 15px;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  margin-bottom: 20px;

   > div {
    color: #4b4b4e;
    font-weight: 600;
   }
`;


function App() {
  const [countryList, setCountryList] = useState([]);
  const [countryListError, setCountryListError] = useState(null);
  const url = 'https://restcountries.com/v2/all?fields=name%2Ccapital%2Cflag%2Cpopulation%2Cregion&fbclid=IwAR2CGHvW8wP6vklGyfBYjlPuwF9WQUfirEpt-GmI9RvaVbLZa14HJynlJjU';

  const renderCountryList = () => {
    if (countryListError) {
      return <div>{countryListError}</div>
    }

    if (countryList.length) {
      return (
        countryList.map((country, index) => {
          return (
            <Wrapper key={index}>
              <div>Name: {country.name}</div>
              <div>Capital: {country.capital}</div>
              <div>Region: {country.region}</div>
              <div>Population: {country.population}</div>
              <div><img src={country.flag} height="150" width="150" alt="img"></img></div>
            </Wrapper>
          );
        })
      )
    }

    return <Spinner size="large" message="Loading..." />;
  }
  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Http error: ${res.status}`);
        }
      })
      .then((res) => {
        setCountryList(res);
      })
      .catch((error) => {
        console.error(error);
        setCountryListError('Error occurred while downloading')
      });
  }, []);

  return (
    <div className="App">
      <h1>Country List</h1>
      {renderCountryList()}
    </div>
  );
}

export default App;
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import './App.scss';
import logo from './images/logo.png';
import Country from './components/Country';
import Countries from './components/Countries';
import ReactGa from 'react-ga';



const App = () => {

  const [countryNames, setCountryNames] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    redirect: false,
    country: ""
  });

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  const tempDate = new Date();
  const currentDate = `${monthNames[tempDate.getMonth()]} ${tempDate.getDate()}, ${tempDate.getFullYear()} ${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;

  const notCountries = ["World", "Europe", "Asia", "North America", "South America", "Oceania", "Africa" ,"Total:"]

  useEffect( () => {
    ReactGa.initialize('UA-162133610-1');
    ReactGa.pageview(window.location.pathname);
    getCountryNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCountryNames = () => {
    axios.get('https://coronavirus-19-api.herokuapp.com/countries')
    .then (response => {

      // const topCases = response.data.slice(0, 10);
      const topData = response.data
      .filter(item => notCountries.indexOf(item.country) === -1)
      .map(item => ({
        country: item.country,
        cases: item.cases,
        deaths: item.deaths,
        recovered: item.recovered
      }));

      setCountryData(topData)

      // sort country descending order
      const sortProperty = 'country';
      const sorted = response.data
        .sort((a, b) => {
          if (b[sortProperty] > a[sortProperty]) return -1;
          else return 0;
        }).map(item => ({
          name: item.country,
        }));
      setCountryNames(sorted);
    })
    .catch(error => {
        console.log(error)
    })
  }

  const handleSelection = (e) => {
    if(e.target.value !== "no"){
      setSelectedCountry({
        redirect: true,
        country: e.target.value.toLowerCase()
      });
    }
  }
 
  return (
    <Router>
      {selectedCountry.redirect ? <Redirect push to={{pathname: `/country/${selectedCountry.country}`, country: selectedCountry.country}} /> : null}
      <div className="App">
        <p>{selectedCountry.redirect}</p>
        <header className="index-header">
            <Link to="/">
                <img alt="" src={logo} className="index-header__logo"></img>
            </Link>
            <select className="index-header__select" onChange={handleSelection}>
              <option value="no">SELECT COUNTRY</option>
              {countryNames.map((country, i) => (
                  <React.Fragment key={i}>
                    <option value={country.name}>{country.name}</option>
                  </React.Fragment>
              ))}
            </select>
        </header>
        <Switch>
            <Route exact path="/" render={(props) => <Countries {...props} countryData={countryData} currentDate={currentDate} />}/>
            <Route path="/country/:name" render={(props) => <Country {...props} currentDate={currentDate} />}/>
        </Switch>
        <footer>
              <p>stevenwilsabana@gmail.com</p>
              <a href="https://www.privacypolicygenerator.info/live.php?token=APgrzH3qFYnjsylVvBLoFR3sUACNrrL3" alt="">Privacy Policy</a>
        </footer>
      </div>
    </Router>
  );
}

export default App;

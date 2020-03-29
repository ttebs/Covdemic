import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import './App.scss';
import Country from './components/Country';
import Countries from './components/Countries';
import ReactGa from 'react-ga';



const App = () => {

  const [countryNames, setCountryNames] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    redirect: false,
    country: ""
  });

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  const tempDate = new Date();
  const date = `${monthNames[tempDate.getMonth()]} ${tempDate.getDate()}, ${tempDate.getFullYear()} ${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
  
  useEffect( () => {
    ReactGa.initialize('UA-162133610-1');
    ReactGa.pageview(window.location.pathname);
    getCountryNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCountryNames = () => {
    axios.get('https://coronavirus-19-api.herokuapp.com/countries')
    .then (response => {
      // sort country descending order
      const sortProperty = 'country';
      const sorted = response.data.sort ( function( a , b ){
        if (b[sortProperty] > a[sortProperty]) return -1;
        else return 0;
      });
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
            <div className="index-header__logo">
              <span className="index-header__co">CO</span>
              <span className="index-header__vid">VID</span>
              <span className="index-header__dash">-</span>
              <span className="index-header__one-nine">19</span>
            </div>
          </Link>
          <select className="index-header__select" onChange={handleSelection}>
            <option value="no">Select Country</option>
            {countryNames.map((country, i) => (
                <React.Fragment key={i}>
                  <option value={country.country}>{country.country}</option>
                </React.Fragment>
            ))}
          </select>
        </header>
        <span className="current-time">{date}</span>
        <Switch>
            <Route exact path="/" component={Countries} />
            <Route path="/country/:name" component={Country} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;

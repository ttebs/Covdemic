import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams} from "react-router";
import { useLocation } from 'react-router-dom';
import CountUp from 'react-countup';


const Country = (props) => {
    let countryUrl = useParams();
    
    let location = useLocation();
    let country = props.location.country;

    if(!country){
        country = countryUrl.name;
    }

    const [countryData, setCountryData] = useState({});

    useEffect( () => {
        getAllData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country]);

    const getAllData = () => {
        axios.get(`https://coronavirus-19-api.herokuapp.com/countries/${country}`)
        .then (response => {
            setCountryData(response.data);
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <section className="country-data">
                <header>
                    <h1>{country}</h1>
                </header>
                <section className="country-data__con">
                    <article className="country-data__cases">
                        <h3>CASES</h3>
                        <CountUp separator="," start={0} end={countryData.cases ? countryData.cases : 0} />
                    </article>
                    <article className="country-data__today-cases">
                        <h3>TODAY'S CASES</h3>
                        <CountUp separator="," start={0} end={countryData.todayCases ? countryData.todayCases : 0} />
                    </article>
                    <article className="country-data__deaths">
                        <h3>DEATHS</h3>
                        <CountUp separator="," start={0} end={countryData.deaths ? countryData.deaths : 0} />
                    </article>
                    <article className="country-data__today-deaths">
                        <h3>TODAY'S DEATH</h3>
                        <CountUp separator="," start={0} end={countryData.todayDeaths ? countryData.todayDeaths : 0} />
                    </article>
                    <article className="country-data__critical">
                        <h3>CRITICAL</h3>
                        <CountUp separator="," start={0} end={countryData.critical ? countryData.critical : 0} />
                    </article>
                    <article className="country-data__recovered">
                        <h3>RECOVERED</h3>
                        <CountUp separator="," start={0} end={countryData.recovered ? countryData.recovered : 0} />
                    </article>
                    <article className="country-data__active">
                        <h3>ACTIVE</h3>
                        <CountUp separator="," start={0} end={countryData.active ? countryData.active : 0} />
                    </article>
                    
                </section>
            </section>
        </div>
    );
}

export default Country;

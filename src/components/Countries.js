import React, {useEffect, useState} from 'react';
import axios from 'axios';

import CountUp from 'react-countup';



const Countries = (props) => {
  const [data, setData] = useState({});
  useEffect( () => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllData = () => {
    axios.get('https://coronavirus-19-api.herokuapp.com/all')
    .then (response => {
      setData(response.data);
    })
    .catch(error => {
        console.log(error)
    })
  }

  
  return (
    <div>
      <section className="all-data">
        <h1>GLOBAL</h1>
        <p className="current-time">{props.currentDate}</p>
        <div className="all-data__con">
          <article className="all-data__cases">
            <h3>CASES</h3>
            <CountUp separator="," start={0} end={data.cases ? data.cases : 0} />
          </article>

          <article className="all-data__deaths">
            <h3>DEATHS</h3>
            <CountUp separator="," start={0} end={data.deaths ? data.deaths : 0} />
          </article>

          <article className="all-data__recovered">
            <h3>RECOVERED</h3>
            <CountUp separator="," start={0} end={data.recovered ? data.recovered : 0} />
          </article>
        </div>
      </section>
    </div>
  );
}

export default Countries;

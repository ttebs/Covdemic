import React from 'react';
import NumberFormat from 'react-number-format';


const topCountries = (props) => {
   
    let sortProperty = 'cases';
    const topCases = props.countryData
        .sort((a, b) => b[sortProperty] - a[sortProperty])
        .slice(0, 10)
        .map(item => ({
            name: item.country,
            cases: item.cases,
        }));

    sortProperty = 'deaths';
    const topDeaths = props.countryData
        .sort((a, b) => b[sortProperty] - a[sortProperty])
        .slice(0, 10)
        .map(item => ({
            name: item.country,
            deaths: item.deaths,
        }));

    sortProperty = 'recovered';
    const topRecovered = props.countryData
        .sort((a, b) => b[sortProperty] - a[sortProperty])
        .slice(0, 10)
        .map(item => ({
            name: item.country,
            recovered: item.recovered,
        }));

  return (
    <div>
        <section className="top-countries">
            <h2>TOP 10</h2>
            <div className="top-countries__con">
                <article className="top-countries__item top-countries__item--case">
                    <table>
                        <tbody>
                            <tr>
                                <th colspan="4">
                                    <span>CASES</span>
                                </th>
                            </tr>
                            {topCases.map((country, i) => (
                                <React.Fragment key={i}>
                                    <tr>
                                        <td>
                                            <span>{i + 1}</span>
                                        </td>
                                        <td className="country-name">
                                            <span>{country.name}</span>
                                        </td>
                                        <td>
                                            <NumberFormat
                                                value={country.cases} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                renderText={value => <span className="number-color">{value}</span>} 
                                            />
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </article>
                <article className="top-countries__item top-countries__item--deaths">
                    <table>
                        <tbody>
                            <tr>
                                <th colspan="3">
                                    <span>DEATHS</span>
                                </th>
                            </tr>
                            {topDeaths.map((country, i) => (
                                <React.Fragment key={i}>
                                    <tr>
                                        <td>
                                            <span>{i + 1}</span>
                                        </td>
                                        <td className="country-name">
                                            <span>{country.name}</span>
                                        </td>
                                        <td>
                                            <NumberFormat
                                                className="number-color"
                                                value={country.deaths}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                renderText={value => <span className="number-color">{value}</span>} 
                                            />
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </article>
                <article className="top-countries__item top-countries__item--recovered">
                    <table>
                        <tbody>
                            <tr>
                                <th colspan="3">
                                    <span>RECOVERED</span>
                                </th>
                            </tr>
                            {topRecovered.map((country, i) => (
                                <React.Fragment key={i}>
                                    <tr>
                                        <td>
                                            <span>{i + 1}</span>
                                        </td>
                                        <td className="country-name">
                                            <span>{country.name}</span>
                                        </td>
                                        <td>
                                            <NumberFormat
                                            className="number-color"
                                            value={country.recovered}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            renderText={value => <span className="number-color">{value}</span>} 
                                        />
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </article>
            </div>
        </section>
    </div>
  );
}

export default topCountries;

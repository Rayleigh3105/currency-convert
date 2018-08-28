// http://data.fixer.io/api/latest?access_key=3e6cda999e4c0b20785bf449e38ca2da
const axios = require('axios');

// const getExchangeRate = ( from, to ) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=3e6cda999e4c0b20785bf449e38ca2da')
//         .then( ( response) => {
//         const euro = 1 / response.data.rates[from];
//         const rate = euro * response.data.rates[to];
//
//         return rate
//     })
// };

const getExchangeRate = async ( from, to ) => {
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=3e6cda999e4c0b20785bf449e38ca2da');

        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];

        if ( isNaN( rate ) ) {
            throw new Error();
        }

        return rate
    }catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`)
    }

};

// const getCountries = ( currencyCode ) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
//         .then( ( response ) => {
//             return response.data.map( ( country) => country.name )
//         })
// };

const getCountries = async ( currencyCode ) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map( ( country) => country.name )
    } catch (e) {
        throw new Error(`Unable to get Countries that use ${currencyCode}.`)
    }

};

// const convertCurrency = ( from, to, amount ) => {
//     let convertedAmount;
//     return getExchangeRate( from , to )
//         .then( ( rate ) => {
//             convertedAmount = (amount * rate).toFixed( 2 );
//             return getCountries( to )
//                 .then( ( countries ) => {
//                     return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`
//                 })
//         });
// };

const convertCurrency = async ( from, to, amount ) => {

    const rate = await getExchangeRate( from, to );

    let convertedAmount = (amount * rate).toFixed( 2 );

    const countries = await  getCountries( to );

    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`
}

convertCurrency('EUR', 'EUR', 100)
    .then( ( message ) => {
        console.log(message)
    })
    .catch( ( e ) => {
        console.log( e.message );
    });


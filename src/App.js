import { Grid, Typography } from '@mui/material';

import Header from './components/Header';
import Home from './components/Home';
import { useEffect, useState } from 'react';

const URL = 'https://api.apilayer.com/fixer/latest';

function App() {
  const [currencyOption, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('apikey', 'Xuf2ROCS7EmeS3en9t3hdiuIzZzxQ73M');
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };
    fetch(URL, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('apikey', 'Xuf2ROCS7EmeS3en9t3hdiuIzZzxQ73M');
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };
    if (fromCurrency !== undefined && toCurrency !== undefined) {
      fetch(`${URL}?base=${fromCurrency}&symbols=${toCurrency}`, requestOptions)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  return (
    <>
      <Header />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        sx={{ pt: 6 }}
      >
        <Typography variant="h4" gutterBottom component="div">
          Convert currency
        </Typography>
        <Home
          currencyOption={currencyOption}
          selectCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
          defaultCurrency="EUR"
          currencyLabel="From"
        />

        <Home
          currencyOption={currencyOption}
          selectCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
          defaultCurrency="AED"
          currencyLabel="To"
        />
      </Grid>
    </>
  );
}

export default App;

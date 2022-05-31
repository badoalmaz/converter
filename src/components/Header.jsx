import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from '@mui/material';

import React, { useEffect, useState } from 'react';

const Header = () => {
  const [usd, setUsd] = useState(0);
  const [eur, setEur] = useState(0);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('apikey', 'Xuf2ROCS7EmeS3en9t3hdiuIzZzxQ73M');
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    // USD
    fetch(
      'https://api.apilayer.com/fixer/latest?symbols=UAH&base=USD',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setUsd(result.rates.UAH))
      .catch((error) => console.log('error', error));

    // EUR
    fetch(
      'https://api.apilayer.com/fixer/latest?symbols=UAH&base=EUR',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setEur(result.rates.UAH))
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Converter
          </Typography>
          <Tooltip title="USD-UAH exchange rate">
            <Typography sx={{ mr: 2 }}>
              <b>USD:</b> {usd}
            </Typography>
          </Tooltip>

          <Tooltip title="EUR-UAH exchange rate">
            <Typography>
              <b>EUR:</b> {eur}
            </Typography>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

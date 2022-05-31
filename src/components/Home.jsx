import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import React from 'react';

const Home = ({
  currencyOption,
  selectCurrency,
  onChangeCurrency,
  onChangeAmount,
  amount,
  defaultCurrency,
  currencyLabel,
}) => {
  return (
    <Box sx={{ display: 'flex', m: 1 }}>
      <TextField
        type="number"
        variant="outlined"
        value={amount || ''}
        onChange={onChangeAmount}
        label="Amount"
        sx={{
          width: {
            sx: '250px',
            md: '300px',
          },
        }}
      />
      <FormControl sx={{ minWidth: '120px', ml: 1 }}>
        <InputLabel id="demo-simple-select-label">{currencyLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectCurrency || defaultCurrency}
          onChange={onChangeCurrency}
        >
          {currencyOption?.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Home;

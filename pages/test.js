import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { convertToWords } from './api/convert';

export default function Test() {
  const MAX_ALLOWED_NUMBER = 9999999999;
  const [inputValue, setInputValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [numberWords, setNumberWords] = useState('');

  const onChangeHandler = (event) => {
    const num = +event.target.value;
    setInputValue(event.target.value);
    setNumberWords('');

    if (isNaN(num) || !Number.isInteger(num) || num < 0) {
      setErrorMsg('Number must be a positive integer');
      return;
    }

    if (num > MAX_ALLOWED_NUMBER) {
      setErrorMsg(`Maximum allowed number is ${MAX_ALLOWED_NUMBER}`);
      return;
    }

    setErrorMsg('');
  };

  const onClickHandler = () => {
    const result = convertToWords(inputValue);
    if (!result.isSuccess) {
      //TODO: improve this
      alert(result.data);
      setInputValue('');
      return;
    }

    setNumberWords(result.data);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Convert number to words:
          </Typography>
          <TextField
            id="number-input"
            value={inputValue}
            label="Number"
            variant="outlined"
            onChange={onChangeHandler}
            error={errorMsg !== ''}
            helperText={errorMsg}
          />
          <Box
            sx={{
              my: 4,
            }}
          >
            <Button
              variant="contained"
              disabled={errorMsg !== ''}
              onClick={onClickHandler}
            >
              Convert!
            </Button>
          </Box>
          <Box
            sx={{
              my: 4,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              {numberWords}
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

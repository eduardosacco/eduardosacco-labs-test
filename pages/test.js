import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default function Test() {
  const MAX_ALLOWED_NUMBER = 9999999999;
  const [value, setValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onChange = (event) => {
    const num = +event.target.value;
    setValue(event.target.value);

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

  const onClick = () => {
    
  }

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
            value={value}
            label="Number"
            variant="outlined"
            onChange={onChange}
            error={errorMsg !== ''}
            helperText={errorMsg}
          />
          <Box
            sx={{
              my: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button variant="contained" disabled={errorMsg !== ''}>
              Convert!
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { numberToWords } from '../api/number-to-words';

const MAX_ALLOWED_NUMBER = 9999999999;

export default function Test({ input, result, errorMessage }) {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [errorMessageValue, setErrorMessageValue] = useState('');

  const router = useRouter();

  useEffect(() => {
    input && setInputValue(input);
    result && setResultValue(result);
    errorMessage && setErrorMessageValue(errorMessage);
  }, [input, result, errorMessage]);

  const onChangeHandler = (event) => {
    setResultValue('');
    setInputValue(event.target.value);
    setErrorMessageValue(validateInput(event.target.value));
  };

  const onClickHandler = () => {
    router.push(`/test/${inputValue}`);
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
          <Box
            sx={{
              my: 10,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h5"
              color="primary"
              component="h2"
              gutterBottom
            >
              {resultValue}
            </Typography>
          </Box>
          <TextField
            id="number-input"
            value={inputValue}
            label="Number"
            variant="outlined"
            onChange={onChangeHandler}
            error={errorMessageValue !== ''}
            helperText={errorMessageValue}
            type="number"
          />
          <Box
            sx={{
              my: 4,
            }}
          >
            <Button
              variant="contained"
              disabled={errorMessageValue !== ''}
              onClick={onClickHandler}
            >
              Convert!
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

function validateInput(input) {
  const num = +input;
  if (isNaN(num) || !Number.isInteger(num) || num < 0) {
    return 'Number must be a positive integer';
  }

  if (num > MAX_ALLOWED_NUMBER) {
    return `Maximum allowed number is ${MAX_ALLOWED_NUMBER}`;
  }

  return '';
}

export const getServerSideProps = async (context) => {
  const input = context.query.number && context.query.number[0];

  if (!input) {
    return {
      props: {},
    };
  }

  const errorMessage = validateInput(input);
  if (errorMessage !== '') {
    return {
      props: { input: input, errorMessage: errorMessage },
    };
  }

  const result = numberToWords(input);

  //Kind of an edge case since we have validations
  if (!result.isSuccess) {
    //TODO: make this better
    alert(result.data);
    return;
  }

  return {
    props: { input: input, result: result.data },
  };
};

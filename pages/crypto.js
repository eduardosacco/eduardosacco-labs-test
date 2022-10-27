import { Button, MenuItem, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useMetamask } from 'use-metamask';
import * as W3 from 'Web3';
import DisableInServerSide from '../components/DisableInServerSide';

function Web3Connect({ input, result, errorMessage }) {
  const { connect, metaState } = useMetamask();
  const [networkToAdd, setNetworkToAdd] = useState('rinkeby');

  const NETWORKS = ['mainnet', 'ropsten', 'kovan', 'rinkeby', 'goerli'];

  useEffect(() => {
    if (!metaState.isConnected) {
      (async () => {
        try {
          await connect(W3);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  console.log(metaState);

  const onClickHandler = () => {};

  const handleNetworkSelectChange = (event) => {
    setNetworkToAdd(event.target.value);
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
          <Box
            sx={{
              my: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Web3 Connect Test
            </Typography>
          </Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {metaState.isAvailable
              ? `You are connected with account:`
              : `Connect with Metamask!`}
          </Typography>
          <Box
            sx={{
              my: 2,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h5"
              color="primary"
              component="h2"
              gutterBottom
            >
              {metaState.account[0]}
            </Typography>
          </Box>
          <Box
            sx={{
              my: 4,
            }}
          >
            <Button
              variant="contained"
              disabled={false}
              onClick={onClickHandler}
              color={metaState.isConnected ? 'secondary' : 'primary'}
            >
              {metaState.isConnected ? `Disonnect` : `Connect`}
            </Button>
          </Box>
          <Box
            sx={{
              my: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                my: 2,
              }}
            >
              <Typography component="h5" gutterBottom>
                Add network
              </Typography>
            </Box>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={networkToAdd}
              onChange={handleNetworkSelectChange}
              helperText="Please select your currency"
            >
              {NETWORKS.map((network) => (
                <MenuItem key={network} value={network}>
                  {network}
                </MenuItem>
              ))}
            </TextField>
            <Box
              sx={{
                my: 4,
              }}
            >
              <Button
                variant="contained"
                disabled={false}
                onClick={onClickHandler}
              >
                {'Add Network'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

// The use-metamask lib does not currently support SSR since it uses global window
// There is currently an open pr (https://github.com/mdtanrikulu/use-metamask/issues/18)
// with a fix for this issue (https://github.com/mdtanrikulu/use-metamask/pull/19)
// More info about the issue: https://dev.to/apkoponen/how-to-disable-server-side-rendering-ssr-in-next-js-1563
export default function Crypto() {
  return (
    <DisableInServerSide>
      <Web3Connect />
    </DisableInServerSide>
  );
}

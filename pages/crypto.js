import { Button, MenuItem, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Blockie from 'react-blockies';
import { useMetamask } from 'use-metamask';
import * as Web3 from 'Web3';
import DisableInServerSide from '../components/DisableInServerSide';
import metamaskLogo from '../images/metamask.png';
import { addEthereumChain } from '../utils/metamask';
import { NETWORKS } from '../utils/networks';

function Web3Connect({ input, result, errorMessage }) {
  const [isConnected, setIsConnected] = useState(false);
  const { connect, metaState } = useMetamask();
  const [networkToAdd, setNetworkToAdd] = useState('rinkeby');

  const networkOptions = Object.keys(NETWORKS);

  const connectToMetamask = () => {
    if (metaState.isAvailable && !metaState.isConnected && !isConnected) {
      (async () => {
        try {
          await connect(Web3);
          setIsConnected(true);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };

  const onClickConnectionHandler = (event) => {
    if (!isConnected) {
      return connectToMetamask();
    }
    setIsConnected(false);
  };

  const onChangeNetworkSelectHandler = (event) => {
    setNetworkToAdd(event.target.value);
  };

  const onClickAddNetworkHandler = async (event) => {
    await addEthereumChain(NETWORKS[networkToAdd]);
  };

  useEffect(() => {
    connectToMetamask();
  }, [isConnected, metaState.isConnected]);

  const metaMaskAvailableContent = (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        {metaState.isConnected
          ? `You are connected with account:`
          : `Connect with Metamask!`}
      </Typography>
      <Box
        sx={{
          my: 2,
          textAlign: 'center',
        }}
      >
        <Blockie seed={metaState.account[0]} scale={8} />
        <Typography variant="h5" color="primary" component="h2" gutterBottom>
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
          onClick={onClickConnectionHandler}
          color={metaState.isConnected ? 'secondary' : 'primary'}
        >
          {metaState.isConnected ? `Disconnect` : `Connect`}
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
          onChange={onChangeNetworkSelectHandler}
          helperText="Please select your currency"
        >
          {networkOptions.map((network) => (
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
            disabled={!isConnected}
            onClick={onClickAddNetworkHandler}
          >
            Add Network
          </Button>
        </Box>
      </Box>
    </>
  );

  const metaMaskNotAvailableContent = (
    <Box
      sx={{
        my: 2,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Metamask is not available &#128546;
        <Box sx={{ my: 4 }}>
          <Button
            variant="contained"
            color="primary"
            href="https://metamask.io/download/"
          >
            Get Metamask
          </Button>
        </Box>
      </Typography>
    </Box>
  );

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
            Web3 Metamask Connect Test
          </Typography>
          <Box sx={{ my: 4, height: 50 }}>
            <Image src={metamaskLogo} alt="Metamask Logo" width='50' height='50' />
          </Box>
          {metaState.isAvailable
            ? metaMaskAvailableContent
            : metaMaskNotAvailableContent}
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

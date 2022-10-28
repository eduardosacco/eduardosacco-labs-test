import { Button, MenuItem, Modal, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Blockie from 'react-blockies';
import { useMetamask } from 'use-metamask';
import * as Web3 from 'Web3';
import DisableInServerSide from '../components/DisableInServerSide';
import metamaskDisconnectImage from '../images/metamask-disconnect.png';
import metamaskLogo from '../images/metamask.png';
import Link from '../src/Link';
import { NETWORKS } from '../utils/networks';
import { addEthereumChain } from '../utils/wallet';

function Web3Connect({ input, result, errorMessage }) {
  const { connect, metaState } = useMetamask();
  const [networkToAdd, setNetworkToAdd] = useState('rinkeby');
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const networkOptions = Object.keys(NETWORKS);

  // TODO: use callback
  const connectToMetamask = useCallback(async () => {
    if (metaState.isAvailable && !metaState.isConnected) {
      try {
        await connect(Web3);
      } catch (error) {
        console.log(error);
      }
    }
  }, [metaState.isAvailable, metaState.isConnected, connect]);

  const onClickConnectionHandler = async () => {
    if (metaState.isAvailable && !metaState.isConnected) {
      return router.reload();
    }
    await handleOpen();
  };

  const onChangeNetworkSelectHandler = (event) => {
    setNetworkToAdd(event.target.value);
  };

  const onClickAddNetworkHandler = async (event) => {
    await addEthereumChain(NETWORKS[networkToAdd]);
  };

  useEffect(() => {
    connectToMetamask();
  }, [connectToMetamask]);

  const metaMaskConnectedContent = (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        You are connected with account:
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
    </Box>
  );

  const metaMaskNotConnectedContent = (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Connect with MetaMask
      </Typography>
    </Box>
  );

  const metaMaskAvailableContent = (
    <>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {metaState.isConnected
          ? metaMaskConnectedContent
          : metaMaskNotConnectedContent}
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
            disabled={!metaState.isConnected}
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

  const disconnectModal = (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          p: 2,
          bgcolor: 'background.default',
          border: '2px solid #000',
          boxShadow: 24,
          alignItems: 'center',
          alignContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Use Metamask to disconnect
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {'More info on: '}
          <Link
            href="https://metamask.zendesk.com/hc/en-us/articles/360059535551-Disconnect-wallet-from-a-dapp"
            target="_blank"
            color="secondary"
          >
            MetaMask support page
          </Link>
        </Typography>
        <Image src={metamaskDisconnectImage} alt="Metamask disconnect" />
      </Box>
    </Modal>
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
            <Image
              src={metamaskLogo}
              alt="Metamask Logo"
              width="50"
              height="50"
            />
          </Box>
          {metaState.isAvailable
            ? metaMaskAvailableContent
            : metaMaskNotAvailableContent}
        </Box>
      </Container>
      {disconnectModal}
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

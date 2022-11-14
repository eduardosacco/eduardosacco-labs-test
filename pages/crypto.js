import { Button, MenuItem, Modal, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Blockie from 'react-blockies';
import { useMetamask } from 'use-metamask';
import * as Web3 from 'web3';
import DisableInServerSide from '../components/DisableInServerSide';
import MetamaskAnimatedLogo from '../components/MetamaskAnimatedLogo';
import Link from '../src/Link';
import { NETWORKS } from '../utils/networks';
import { switchChain } from '../utils/wallet';
import Emoji from '../components/Emoji';
import { getPlaiceholder } from 'plaiceholder';

export async function getStaticProps() {
  const { base64, img } = await getPlaiceholder(
    '/images/metamask-disconnect.png'
  );
  return {
    props: {
      imgProps: {
        ...img,
        blurDataURL: base64,
      },
    },
  };
}

function Web3Connect({imgProps}) {
  const { connect, metaState } = useMetamask();
  const [selectedNetwork, setSelectedNetwork] = useState('goerli');
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
    console.log(metaState);
    if (metaState.isAvailable && !metaState.isConnected) {
      return router.reload();
    }
    await handleOpen();
  };

  const onChangeNetworkSelectHandler = (event) => {
    setSelectedNetwork(event.target.value);
  };

  const onClickAddNetworkHandler = async (event) => {
    await switchChain(NETWORKS[selectedNetwork]);
  };

  useEffect(() => {
    connectToMetamask();
  }, [connectToMetamask]);

  const metaMaskConnectedContent = (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Typography
        sx={{ mx: 1 }}
        align="center"
        variant="h5"
        component="h2"
        gutterBottom
      >
        You are connected with account:
      </Typography>

      <Box sx={{ m: 1 }}>
        <Blockie scale={6} seed={metaState.account[0]} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Typography
          sx={{ overflowWrap: 'anywhere' }}
          align="center"
          variant="h5"
          color="primary"
          gutterBottom
        >
          {metaState.account[0]}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box sx={{ mx: 1, width: '100%' }}>
          <Typography variant="h5" gutterBottom>
            Current network chain id:
          </Typography>
        </Box>
        <Box sx={{ mx: 1 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            {metaState.chain.id}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          my: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          id="outlined-select-currency"
          select
          label="Switch network"
          value={selectedNetwork}
          onChange={onChangeNetworkSelectHandler}
          helperText="Please desired network"
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
            Switch Network
          </Button>
        </Box>
      </Box>
    </Box>
  );

  const metaMaskNotConnectedContent = (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Connect with MetaMask
      </Typography>
    </Box>
  );

  const metaMaskAvailableContent = (
    <Container maxWidth="lg">
      <Box
        sx={{
          mb: 2,
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
    </Container>
  );

  const metaMaskNotAvailableContent = (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Metamask is not available&nbsp;
        <Emoji symbol="😢" />
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
      onClick={handleClose}
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
        <Typography
          id="modal-modal-title"
          align="center"
          variant="h6"
          component="h2"
        >
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
        <Image
          {...imgProps}
          alt="Disconnect from Metamask"
          placeholder="blur"
        />
      </Box>
    </Modal>
  );

  return (
    <>
      <Head>
        <title>Crypto</title>
        <meta name="description" content="Connect with your Metamask Wallet" />
      </Head>
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
          <Typography variant="h4" align="center" component="h1" gutterBottom>
            Web3 Metamask Connect Test
          </Typography>
          <Box
            sx={{
              my: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <MetamaskAnimatedLogo />
          </Box>
          {metaState.isAvailable
            ? metaMaskAvailableContent
            : metaMaskNotAvailableContent}
        </Box>
        {disconnectModal}
      </Container>
    </>
  );
}

// The use-metamask lib does not currently support SSR since it uses global window
// There is currently an open pr (https://github.com/mdtanrikulu/use-metamask/issues/18)
// with a fix for this issue (https://github.com/mdtanrikulu/use-metamask/pull/19)
// More info about the issue: https://dev.to/apkoponen/how-to-disable-server-side-rendering-ssr-in-next-js-1563
export default function Crypto(props) {
  return (
    <DisableInServerSide>
      <Web3Connect {...props} />
    </DisableInServerSide>
  );
}

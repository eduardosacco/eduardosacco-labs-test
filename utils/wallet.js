// Checkout these links to switch to TS:
// https://www.npmjs.com/package/@metamask/providers
// https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods

export async function switchChain(network) {
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.chainId }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [network],

        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
}

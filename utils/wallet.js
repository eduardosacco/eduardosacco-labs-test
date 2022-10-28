// Checkout these links to switch to TS:
// https://www.npmjs.com/package/@metamask/providers
// https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods

export async function addEthereumChain(network) {
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        network
      ],
    });
  } catch (error) {
    // handle "add" error
    console.log(error);
  }
}

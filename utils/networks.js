export const NETWORKS = {
  ethereum: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io/'],
  },
  rinkeby: {
    chainId: '0x4',
    chainName: 'Rinkeby Test Network',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'RinkebyETH',
      decimals: 18,
    },
    rpcUrls: ['https://rinkeby.infura.io/v3/'],
    blockExplorerUrls: ['https://rinkeby.etherscan.io'],
  },
  goerli: {
    chainId: '0x5',
    chainName: 'Goerli Test Network',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'GoerliETH',
      decimals: 18,
    },
    rpcUrls: ['https://goerli.infura.io/v3/'],
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
  polygon: {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  gnosis: {
    chainId: '0x64',
    chainName: 'Gnosis',
    nativeCurrency: {
      name: 'xDAI',
      symbol: 'xDAI',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.gnosischain.com'],
    blockExplorerUrls: ['https://gnosisscan.io'],
  },
  
};

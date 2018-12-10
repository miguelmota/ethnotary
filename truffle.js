const Web3WsProvider = require('web3-providers-ws');
const HDWalletProvider = require('truffle-hdwallet-provider')
require('dotenv').config()

const key = process.env.MNEMONIC

module.exports = {
  networks: {
    development: {
      provider: new Web3WsProvider('ws://localhost:8545'),
      network_id: '*' // Match any network id
    },
    kovan: {
      provider: new HDWalletProvider(key, 'https://kovan.infura.io'),
      network_id: '*',
      gas: 4712383,
      gasPrice: 20000000000
    },
    rinkeby: {
      provider: new HDWalletProvider(key, 'https://rinkeby.infura.io'),
      network_id: '*',
      gas: 4712383,
      gasPrice: 20000000000
    },
    mainnet: {
      provider: new HDWalletProvider(key, 'https://mainnet.infura.io'),
      network_id: 1,
      gas: 4500000,
      gasPrice: 10000000000
    }
  },
  compilers: {
    solc: {
      version: '0.4.23',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
      },
    },
  },
};

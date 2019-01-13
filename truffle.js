require('dotenv').config()

const Web3WsProvider = require('web3-providers-ws');
const HDWalletProvider = require('truffle-hdwallet-provider')
const PrivateKeyProvider = require('truffle-privatekey-provider')


function createProvider(url) {
  var key = null
  var provider = null

  if (url.indexOf('localhost') === -1) {
    if (process.env.MNEMONIC) {
      key = process.env.MNEMONIC
      provider = new HDWalletProvider(key, url)
    } else if (process.env.PRIVATE_KEY) {
      key = process.env.PRIVATE_KEY
      provider = new PrivateKeyProvider(key, url)
    }
  } else {
    provider = new Web3WsProvider(url)
  }

  return provider
}

module.exports = {
  networks: {
    development: {
      provider: createProvider('ws://localhost:8545'),
      network_id: '*' // Match any network id
    },
    kovan: {
      provider: createProvider('https://kovan.infura.io'),
      network_id: 42,
      gas: 4712383,
      gasPrice: 20000000000
    },
    rinkeby: {
      provider: createProvider('https://rinkeby.infura.io'),
      network_id: 4,
      gas: 4712383,
      gasPrice: 20000000000
    },
    ropsten: {
      provider: createProvider('https://ropsten.infura.io'),
      network_id: 3,
      gas: 4712383,
      gasPrice: 20000000000
    },
    mainnet: {
      provider: createProvider('https://mainnet.infura.io'),
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

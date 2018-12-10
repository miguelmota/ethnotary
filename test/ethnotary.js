const moment = require('moment')
const {sha3} = require('ethereumjs-util')

const Notary = artifacts.require('./Notary.sol')

function getLastEvent(instance) {
  return new Promise((resolve, reject) => {
    instance.getPastEvents('LogNotarized', {
      fromBlock: 0,
      toBlock: 'latest'
    }, (error, log) => {
      if (error) return reject(error)
      resolve(log)
    })
  })
}

contract('Notary', function(accounts) {
  it('should create a record', async function() {
    const account = accounts[0]

    try {
      const instance = await Notary.deployed()
      // SHA-256 of file
      const msg = '7e5941f066b2070419995072dac7323c02d5ae107b23d8085772f232487fecae'
      const hash = web3.utils.sha3(msg)

      await instance.notarize(hash)

      //const eventObj = await getLastEvent(instance)
      //assert.equal(eventObj.event, 'LogNotarized')

      const notarizer = await instance.getNotarizer(hash)
      assert.equal(notarizer, account)
    } catch(error) {
      //console.error(error)
      assert.equal(error, undefined)
    }
  })

  it('should fail if record already exists', async function() {
    const account = accounts[0]

    try {
      const instance = await Notary.deployed()
      const msg = '7e5941f066b2070419995072dac7323c02d5ae107b23d8085772f232487fecae'
      const hash = web3.utils.sha3(msg)

      await instance.notarize(hash)
      const notarizer = await instance.getNotarizer(hash)
      assert.notEqual(notarizer, account)
    } catch(error) {
      //console.error(error)
      assert.ok(error)
    }
  })

  it('should recover address from signature', async function() {
    const account = accounts[0]

    try {
      const instance = await Notary.deployed()
      let msg = '7e5941f066b2070419995072dac7323c02d5ae107b23d8085772f232487fecae'
      const hash = web3.utils.sha3(msg)
      msg = new Buffer(hash.slice(2), 'hex')
      const sig = await web3.eth.sign(hash, account)
      const prefix = Buffer.from('\x19Ethereum Signed Message:\n');
      const pmsg = `0x${sha3(Buffer.concat([prefix, Buffer.from(String(msg.length)), msg])).toString('hex')}`

      const recoveredAccount = await instance.ecrecovery.call(pmsg, sig)
      assert.equal(recoveredAccount, account)

      const acct = await instance.getNotarizer(hash)
      const isSigner = await instance.ecverify(pmsg, sig, acct)
      assert.equal(isSigner, true)
    } catch(error) {
      //console.error(error)
      assert.equal(error, undefined)
    }
  })
})

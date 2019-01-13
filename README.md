<h1 align="center">
  <br />
  <img src="https://user-images.githubusercontent.com/168240/49712500-9f217a80-fbf9-11e8-9903-97d57800c2e5.png" alt="ethnotary" width="600" />
  <br />
  <br />
  <br />
</h1>

> Document notarization on the [Ethereum](https://ethereum.org/) blockchain.

<a href="https://lab.miguelmota.com/ethnotary"><img src="https://user-images.githubusercontent.com/168240/49712732-a8f7ad80-fbfa-11e8-858a-238989c485db.png" width="900" /></a>

## Demo

**[https://lab.miguelmota.com/ethnotary](https://lab.miguelmota.com/ethnotary)**

## Architecture

<img src="https://user-images.githubusercontent.com/168240/49712478-8022e880-fbf9-11e8-86d2-f1222e3481ea.png" width="600" />

## Test

```bash
truffle test
```

## Development

1. Clone repository:

  ```bash
  git clone git@github.com:miguelmota/ethnotary.git
  cd ethnotary
  ```

2. Install dependencies:

  ```bash
  npm install
  ```

3. Start [ganache](https://github.com/trufflesuite/ganache) in a seperate terminal:

  ```bash
  ganche-cli
  ```

4. Deploy contract to local testnet:

  ```bash
  truffle deploy
  ```

5. Start frontend watcher in another terminal:

  ```bash
  npm run watch:client
  ```

6. Update the smart contract address in `public/js/main.js`

7. Start frontend server:

  ```bash
  npm run serve
  ```

8. Visit [http://localhost:3000/](http://localhost:3000/)

9. Connect [MetaMask](https://metamask.io/) to network *http://localhost:8545*

10. Notarize a document!

## License

[MIT](LICENSE)

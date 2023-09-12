# Hedera Metamask Snap

## Problem solved

Enable a more native experience of the Hedera network on Metamask.

Hedera is an EVM compatible network, however it has a more complex account system, with additional details that Metamask does not currently display. This snap queries this additional information from the Hedera mirror nodes and displays it within the Metamask UI within the transaction insights tab.

## Future plans

1. Create a “yelp for smart contracts” where may rate smart contracts which they have interacted with from 1 to 5 stars. The transaction insights tab would display the current star rating; plus link to a DApp where they could add their own star rating.
2. Enable the use of non-ECDSA secp256k1 keys. Hedera Supports these keys, and additionally supports EdDSA ED25519 keys. We plan to update the snap to be able to generate accounts using BIP-39/BIP-44 processes that are modified to output EdDSA ED25519 keys as well.
3. Enable the manual import of `KeyList` and `ThresholdKey` accounts. These types of accounts are supported natively by Hedera's accounts system, and they enable m-of-n multisig transaction signatures, among other use cases.

## Tech stack

- typescript
- metamask flask
- hedera mirror nodes
- built on top of existing code base: `@metamask/snap transaction-insights-snaps-workshop`

## Log-in credentials for dummy account

- No need for any log in credentials
- However, you do need to connect to Hedera Testnet, and have some HBAR, here is a shortcut for how to do so:
- Use this seed phrase, the first few accounts are already funded: (REDACTED)
- Initialise a new network config:
  - Network Name: Hedera Testnet
  - New RPC URL: `https://hashgraph.arkhia.io/hedera/testnet/json-rpc/v1/nT1M9788al140405M1A284I1379To1N5`
  - Chain ID: 296
  - Currency Symbol: tHBAR
  - Block Explorer URL: `https://hashscan.io/testnet`

## Created by

- [Brendan Graetz](https://github.com/bguiz)
- [Matt Woodward](https://github.com/woodwardmatt)

## Testing

The snap comes with some basic tests, to demonstrate how to write tests for
snaps. To test the snap, run `yarn test` in this directory. This will use
[`@metamask/snaps-jest`](https://github.com/MetaMask/snaps/tree/main/packages/snaps-jest)
to run the tests in `src/index.test.ts`.

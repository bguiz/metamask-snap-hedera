import { OnTransactionHandler } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';

/**
 * Obtain hedera account info by querying mirror node
 *
 * @param evmAddress - An EVM address for which we want the Hedera account info
 */
async function getHederaAcountInfo(evmAddress: string) {
  const response: Response = await fetch(
    `https://testnet.mirrornode.hedera.com/api/v1/accounts/${evmAddress}?limit=1&order=asc&transactiontype=cryptotransfer&transactions=false`,
    {
      method: 'GET',
      // headers: {
      //   accept: 'content-type: application/json',
      // },
      // mode: 'no-cors',
    },
  );
  const result: any = (await response.json()) as any;
  console.log('mirror node result', result);
  const { account, alias } = result;
  return { account, alias, evmAddress };
}

// Handle outgoing transactions
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  console.log('Transaction insights transaction', transaction);
  const gasPriceHex: string = (await ethereum.request({
    method: 'eth_gasPrice',
  })) as string;
  const gasPrice = parseInt(gasPriceHex || '', 16);
  console.log('Current gas price', gasPriceHex, gasPrice);

  const transactionGas = parseInt(transaction.gas as string, 16);
  // const currentGasPriceInWei = parseInt(gasPrice ?? '', 16);
  const maxFeePerGasInWei = parseInt(transaction.maxFeePerGas as string, 16);
  const maxPriorityFeePerGasInWei = parseInt(
    transaction.maxPriorityFeePerGas as string,
    16,
  );
  const gasFees = Math.min(
    maxFeePerGasInWei * transactionGas,
    (gasPrice + maxPriorityFeePerGasInWei) * transactionGas,
  );
  console.log('Current gas fees', gasFees);

  const transactionValueInWei = parseInt(transaction.value as string, 16);
  const gasFeesPercentage = (gasFees / (gasFees + transactionValueInWei)) * 100;
  console.log(
    'Current gas fees as a percentage of transaction value',
    gasFeesPercentage,
  );

  const fromAcccountInfo = await getHederaAcountInfo(
    transaction.from as string,
  );
  const toAcccountInfo = await getHederaAcountInfo(transaction.to as string);

  return {
    content: panel([
      heading('Sending account'),
      text(`Account ID: ${fromAcccountInfo.account}`),
      text(`Account Alias: ${fromAcccountInfo.alias}`),
      text(`EVM address: ${fromAcccountInfo.evmAddress}`),
      heading('Receiving account'),
      text(`Account ID: ${toAcccountInfo.account}`),
      text(`Account Alias: ${toAcccountInfo.alias}`),
      text(`EVM address: ${toAcccountInfo.evmAddress}`),
      // heading('Gas price'),
      // text(`The gas price for this transaction is ${gasPrice}`),
      // heading('Gas fee'),
      // text(`The gas fees for this transaction is ${gasFees}`),
      // heading('Gas percentage'),
      // text(
      //   `The gas fees as a percentage value of this transaction is ${gasFeesPercentage.toFixed(
      //     2,
      //   )}%`,
      // ),
    ]),
  };
};

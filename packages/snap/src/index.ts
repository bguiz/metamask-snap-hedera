import { OnTransactionHandler } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';

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

  return {
    content: panel([
      heading('Gas price'),
      text(`The gas price for this transaction is ${gasPrice}`),
      heading('Gas fee'),
      text(`The gas fees for this transaction is ${gasFees}`),
    ]),
  };
};

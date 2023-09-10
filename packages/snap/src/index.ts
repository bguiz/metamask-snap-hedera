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

  return {
    content: panel([
      heading('Gas price'),
      text(`The gas fee for this transaction is ${gasPrice}`),
    ]),
  };
};

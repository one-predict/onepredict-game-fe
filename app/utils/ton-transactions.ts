import { SendTransactionRequest } from '@tonconnect/ui-react';

const tonsToNanotons = (amount: number) => {
  return amount * Math.pow(10, 9);
};

export const prepareSendTransaction = (toAddress: string, amount: number) => {
  const request: SendTransactionRequest = {
    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
    messages: [
      {
        address: toAddress,
        amount: `${tonsToNanotons(amount)}`,
      },
    ],
  };

  return request;
};

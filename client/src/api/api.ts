import Web3 from "web3";

export const send = async (web3: Web3, account: string, transaction: any) => {
  const options = {
    from: account,
    to: transaction._parent._address,
    data: transaction.encodeABI(),
    gas: await transaction.estimateGas({ from: account }),
    gasPrice: await web3.eth.getGasPrice(),
  };
  // const signed = await web3.eth.accounts.signTransaction(
  //   options,
  //   account.privateKey
  // );
  // const receipt = await web3.eth.sendSignedTransaction(
  //   signed.rawTransaction
  // );
  // return receipt;

  const sendTransaction = web3.eth.sendTransaction(options, transaction);
  return sendTransaction;
};

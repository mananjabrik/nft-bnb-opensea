import { ethers } from 'ethers';
import { nftaddress, nftmarketaddress } from '../config';

import NFT from '../config/contracts/NFT.sol/NFT.json';
import KBMarket from '../config/contracts/KBMarket.sol/KBMarket.json';

import Web3Modal from 'web3modal';

//this function showing contract for self user
export const showSelfContract = async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  const marketContract = new ethers.Contract(
    nftmarketaddress,
    KBMarket.abi,
    signer
  );
  return { tokenContract, marketContract };
};

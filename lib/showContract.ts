import { ethers } from 'ethers';
import { nftaddress, nftmarketaddress } from '../config';

import NFT from '../config/contracts/NFT.sol/NFT.json';
import KBMarket from '../config/contracts/KBMarket.sol/KBMarket.json';

export const showContract = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://data-seed-prebsc-1-s1.binance.org:8545/'
  );
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  const marketContract = new ethers.Contract(
    nftmarketaddress,
    KBMarket.abi,
    provider
  );
  return { tokenContract, marketContract };
};

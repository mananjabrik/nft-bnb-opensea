import { ethers } from 'ethers';
import { nftaddress, nftmarketaddress } from '../config';

import NFT from '../config/contracts/NFT.sol/NFT.json';
import KBMarket from '../config/contracts/KBMarket.sol/KBMarket.json';

export const showContract = (network: string | 'bsc' | 'ropsten') => {
  const provider = new ethers.providers.JsonRpcProvider(
    network === 'bsc'
      ? 'https://data-seed-prebsc-1-s1.binance.org:8545/'
      : 'https://ropsten.infura.io/v3/c7b7e4315ecc48d5a921d620c38f27d0'
  );
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  const marketContract = new ethers.Contract(
    nftmarketaddress,
    KBMarket.abi,
    provider
  );
  return { tokenContract, marketContract };
};

import { NftsProps } from '../interface/NftsProps';
import { ethers } from 'ethers';
import { nftaddress, nftmarketaddress } from '../config';
import Web3Modal from 'web3modal';
import KBMarket from '../config/contracts/KBMarket.sol/KBMarket.json';
import { loadNFTs, showContract } from '.';

export async function buyNFTs(nft: NftsProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { tokenContract, marketContract } = showContract();

  const web3modal = new Web3Modal();
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(nftmarketaddress, KBMarket.abi, signer);
  const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
  const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
    value: price,
  });
  await transaction.wait();
  loadNFTs(tokenContract, marketContract, 'marketItems');
}

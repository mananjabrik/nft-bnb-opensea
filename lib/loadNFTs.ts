import { ethers } from 'ethers';
import axios from 'axios';
import { NftsProps } from '../interface/NftsProps';
import { showContract } from '.';

export const loadNFTs = async (
  tokenContract: ethers.Contract,
  marketContract: ethers.Contract,
  changeItemFrom: 'marketItems' | 'myItems' | 'createdItems'
) => {
  // const { tokenContract, marketContract } = showContract();
  if (changeItemFrom === 'marketItems') {
    const data = await marketContract.fetchMarketItems();
    const items = await Promise.all(
      data.map(async (i: NftsProps) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    return { items };
  }
  if (changeItemFrom === 'myItems') {
    const data = await marketContract.fetchMyNFTs();
    const items = await Promise.all(
      data.map(async (i: NftsProps) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    return { items };
  }
  if (changeItemFrom === 'createdItems') {
    const data = await marketContract.fetchItemsCreated();
    const items = await Promise.all(
      data.map(async (i: NftsProps) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
          price,
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    return { items };
  }
};

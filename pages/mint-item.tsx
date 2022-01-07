import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { nftaddress, nftmarketaddress } from '../config';

import NFT from '../config/contracts/NFT.sol/NFT.json';
import KBMarket from '../config/contracts/KBMarket.sol/KBMarket.json';
import { useRouter } from 'next/router';
//@ts-ignore
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

export default function MinItem() {
  const [fileUrl, setFileUrl] = useState('');
  const [formInput, setFormInput] = useState({
    price: '',
    name: '',
    description: '',
    kategory: '',
  });
  const router = useRouter();
  async function onChange(e: any) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`receiver: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log('error upload file:', error);
    }
  }

  async function createMarket() {
    const { name, description, price, kategory } = formInput;
    if (!name || !description || !price || !fileUrl || !kategory) return;
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
      kategory,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createSale(url);
    } catch (error) {
      console.log('error upload file:', error);
    }
  }
  async function createSale(url: string) {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner(0);

      let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
      let transaction = await contract.createToken(url);
      let tx = await transaction.wait();
      let event = tx.events[0];
      let value = event?.args[2];
      let tokenId = value?.toNumber();
      const price = ethers.utils.parseUnits(formInput.price, 'ether');

      contract = new ethers.Contract(nftmarketaddress, KBMarket.abi, signer);
      let listingPrice = await contract.getListingPrice();
      listingPrice = listingPrice.toString();

      transaction = await contract.createMarketItem(
        nftaddress,
        tokenId,
        price,
        {
          value: listingPrice,
        }
      );
      await transaction.wait();
      router.push('./');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
        <input
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            setFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="kategory"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            setFormInput({ ...formInput, kategory: e.target.value })
          }
        />
        <input
          placeholder="Asset Price"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            setFormInput({ ...formInput, price: e.target.value })
          }
        />
        <input
          placeholder="Asset Price"
          className="mt-2 border rounded p-4"
          onChange={onChange}
          type="file"
          name="asset"
        />
        {fileUrl && <img src={fileUrl} alt="image" />}
        <button
          className="font-bold mt-4 bg-purple-500 text-white"
          onClick={createMarket}
        >
          Min NFT
        </button>
      </div>
    </div>
  );
}

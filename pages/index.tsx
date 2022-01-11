import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { CardItem, Loading } from '../components';
import { NftsProps } from '../interface/NftsProps';
import { loadNFTs, buyNFTs, showContract } from '../lib';

import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  const [nfts, setNfts] = useState<NftsProps[]>(); //hooks for listing the item
  const [loadingState, setLoadingState] = useState(false);
  const [network, setNetwork] = useState('bsc');
  const { marketContract, tokenContract } = showContract(network);

  useEffect(() => {
    setLoadingState(true);
    loadNFTs(tokenContract, marketContract, 'marketItems').then((nft) => {
      setNfts(nft?.items);
      setLoadingState(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network]);
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <h2 className="bg-red-200 text-xl text-center mt-2">
          Dont forget to change your network metamask to {network} !!!
        </h2>
        <button
          className="bg-purple-900 text-white rounded-full mt-5 p-2"
          onClick={() => setNetwork('bsc')}
        >
          BSC Testnet
        </button>
        <button
          className="bg-purple-900 text-white rounded-full mt-5 ml-5 p-2"
          onClick={() => setNetwork('ropsten')}
        >
          ETH Ropsten
        </button>
        {loadingState === true ? <Loading /> : null}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts?.map((nft, index) => (
            <CardItem
              key={index}
              onBuy={async () => {
                await buyNFTs(nft, network ? 'bsc' : 'ropsten');
                router.push('/my-nfts');
              }}
              {...nft}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

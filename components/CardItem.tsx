import React from 'react';
import { NftsProps } from '../interface/NftsProps';

interface CardItemProps extends NftsProps {
  onBuy?: () => void;
}

export const CardItem: React.FC<CardItemProps> = (nft) => {
  return (
    <div className="border shadow rounded-xl overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={nft.image ?? ''}
        alt={nft.name ?? ''}
        className="object-cover h-72 w-96"
      />
      <div className="p-4">
        <p className="text-3xl font-semibold truncate capitalize">
          {nft.name ?? ''}
        </p>
        <div>
          <p className="text-gray-400 truncate">{nft.description}</p>
          <p className="text-gray-400 truncate">owner : {nft.owner}</p>
          <p className="text-gray-400 truncate">seller : {nft.seller}</p>
          <p className="text-gray-400 truncate">
            id : {nft.tokenId.toString()}
          </p>
        </div>
      </div>
      <div className="p-4 bg-black">
        <p className="text-3xl mb-4 font-bold text-white">{nft.price} ETH</p>
        {nft.onBuy ? (
          <button
            className="w-full bg-purple-500 text-white font-bold rounded-md"
            onClick={nft.onBuy}
          >
            Buy
          </button>
        ) : null}
      </div>
    </div>
  );
};

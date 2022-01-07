import { useEffect, useState } from 'react';
import { NftsProps } from '../interface/NftsProps';
import { loadNFTs, showSelfContract } from '../lib';
import { CardItem, Loading } from '../components';
export default function MyAssets() {
  // array of nfts
  const [nfts, setNFts] = useState<NftsProps[]>();
  const [loadingState, setLoadingState] = useState<boolean>();

  useEffect(() => {
    setLoadingState(true);
    showSelfContract().then((con) =>
      loadNFTs(con.tokenContract, con.marketContract, 'myItems').then((nft) => {
        setNFts(nft?.items);
        setLoadingState(false);
      })
    );
  }, []);

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        {loadingState === true ? <Loading /> : null}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts?.map((nft, i) => (
            <CardItem {...nft} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

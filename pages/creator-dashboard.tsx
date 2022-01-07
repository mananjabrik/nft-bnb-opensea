import { useEffect, useState } from 'react';
import { loadNFTs, showSelfContract } from '../lib';
import { CardItem, Loading } from '../components';
import { NftsProps } from '../interface/NftsProps';

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState<NftsProps[]>();
  const [sold, setSold] = useState<NftsProps[]>();
  const [loadingState, setLoadingState] = useState(false);
  useEffect(() => {
    showSelfContract().then((con) => {
      setLoadingState(true);
      loadNFTs(con.tokenContract, con.marketContract, 'createdItems').then(
        (nft) => {
          const soldItems = nft?.items.filter((i: NftsProps) => {
            const ownerdetect = '0x0000000000000000000000000000000000000000';
            if (i.owner !== ownerdetect) {
              return true;
            }
          });
          setNfts(nft?.items);
          setSold(soldItems);
          setLoadingState(false);
        }
      );
    });
  }, []);
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="p-4">
          {loadingState === true ? (
            <Loading />
          ) : (
            <h2 className="text-2xl py-2">Items Created</h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {nfts?.map((nft, i) => (
              <CardItem {...nft} key={i} />
            ))}
          </div>
        </div>
        <div className="px-4">
          {loadingState === true ? <Loading /> : null}
          {sold?.length ? (
            <div>
              <h2 className="text-2xl py-2">Items soldout</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {sold?.map((nft, i) => (
                  <CardItem {...nft} key={i} />
                ))}
              </div>
            </div>
          ) : (
            <h1 className="py-10 px-20 text-3xl">No assets created</h1>
          )}
        </div>
      </div>
    </div>
  );
}
